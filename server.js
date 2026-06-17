// =============================================================================
// DARPANA — Sumur Akasa Backend
// Express server yang menjembatani frontend dengan Groq (Llama 3.3 70B).
//
// Groq menyediakan API kompatibel OpenAI, gratis, tanpa batasan region.
// Free tier: 30 RPM, 10000 request/hari untuk Llama 3.3 70B.
//
// Pakai native fetch (tidak perlu SDK tambahan).
// Butuh GROQ_API_KEY dari https://console.groq.com/keys
// =============================================================================

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8787

// ---------------------------------------------------------------------------
// Konfigurasi Groq
// ---------------------------------------------------------------------------
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'

// ---------------------------------------------------------------------------
// System Prompt "Penjaga Sumur Akasa"
// ---------------------------------------------------------------------------
const SUMUR_AKASA_SYSTEM_PROMPT = `ANDA ADALAH 'Penjaga Sumur Akasa', pemandu digital yang memadukan kearifan filsafat Hindu-Bali (Tattwa, Sekala-Niskala, Tri Pramana), metafisika Timur, dan sains modern (Mekanika Kuantum, Neurosains, Epigenetika).

ATURAN WAJIB:
1. ANTI-DOPAMIN: Jawaban maksimal 3-4 paragraf. Jangan bertele-tele.
2. VALIDASI & REFRAMING: Validasi emosi tanpa menghakimi. Geser perspektif menggunakan analogi sains (neuroplastisitas, entanglement, vagus nerve) DAN spiritual (Maya, Samskara, Dharma).
3. HACK PRAKTIS: Selalu akhiri dengan 1 tindakan kecil, nyata (latihan napas, mantra, atau perubahan pola pikir).
4. REFLEKSI: Tutup dengan 1 pertanyaan renungan (koan) atau ajakan menarik napas.
5. SAFETY: Jika ada tanda bahaya fisik/mental, arahkan dengan empati ke bantuan profesional.

Gunakan bahasa Indonesia yang puitis namun jelas. Rendah hatilah - Anda adalah jari yang menunjuk bulan, bukan bulannya.`

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// ---------------------------------------------------------------------------
// Health check
// ---------------------------------------------------------------------------
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'DARPANA — Sumur Akasa',
    provider: 'Groq',
    model: GROQ_MODEL,
    hasApiKey: Boolean(process.env.GROQ_API_KEY),
    timestamp: new Date().toISOString(),
  })
})

// ---------------------------------------------------------------------------
// POST /api/chat — Kirim pesan ke Groq, return jawaban
// ---------------------------------------------------------------------------
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body ?? {}

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: 'Pesan tidak boleh kosong.',
      })
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        error:
          'GROQ_API_KEY belum diset. Dapatkan gratis di https://console.groq.com/keys lalu isi di file .env',
      })
    }

    // Susun messages untuk Groq (format OpenAI)
    const messages = [{ role: 'system', content: SUMUR_AKASA_SYSTEM_PROMPT }]

    if (Array.isArray(history)) {
      for (const m of history) {
        if (!m || typeof m.content !== 'string') continue
        if (m.role === 'user' || m.role === 'assistant') {
          messages.push({ role: m.role, content: m.content })
        }
      }
    }

    messages.push({ role: 'user', content: message })

    // Panggil Groq API (OpenAI-compatible)
    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    if (!groqRes.ok) {
      const errBody = await groqRes.json().catch(() => ({}))
      console.error('[/api/chat] Groq error:', errBody)

      // Pesan ramah untuk kasus umum
      let friendly = errBody?.error?.message || 'Sinyal dari Sumur Akasa terputus sejenak.'

      if (groqRes.status === 401) {
        friendly =
          'GROQ_API_KEY tidak valid. Periksa kembali key Anda di https://console.groq.com/keys'
      } else if (groqRes.status === 429) {
        friendly =
          'Batas request gratis tercapai sejenak. Tarik napas, tunggu 30 detik, lalu coba lagi.'
      }

      return res.status(groqRes.status).json({ error: friendly })
    }

    const data = await groqRes.json()
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      'Sumur sedang dalam diam. Coba tarik napas sejenak, lalu tanyakan lagi.'

    return res.json({ reply })
  } catch (err) {
    console.error('[/api/chat] error:', err)
    return res.status(500).json({
      error:
        err?.message ||
        'Sinyal dari Sumur Akasa terputus sejenak. Tarik napas dan coba lagi.',
    })
  }
})

// ---------------------------------------------------------------------------
// 404 + error handler
// ---------------------------------------------------------------------------

// Static file serving untuk /audio (dipakai Ruang Sadhana)
// Saat dev, Vite akan serve ini; saat production, Express akan serve.
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicDir = path.join(__dirname, 'public')
if (fs.existsSync(publicDir)) {
  app.use('/audio', express.static(path.join(publicDir, 'audio')))
}

// ---------------------------------------------------------------------------
// Production: serve built Vite frontend (dist/) sebagai static files
// (SPA fallback akan didaftarkan setelah semua API routes selesai)
// ---------------------------------------------------------------------------
const distDir = path.join(__dirname, 'dist')
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
}

// =============================================================================
// RUANG RESONANSI — Feedback Endpoints
//
// Penyimpanan: JSONL files di ./data/ (auto-create dir)
// Catatan: Pada Render free tier, file ini ephemeral (reset saat redeploy).
// Untuk production sejati, ganti ke PostgreSQL (Render free Postgres available).
// Data ini TIDAK kritikal — feedback voluntary dari user untuk Svadhyaya.
// =============================================================================

const DATA_DIR = path.join(__dirname, 'data')
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

function appendJsonl(filename, obj) {
  try {
    const line = JSON.stringify({ ...obj, _ts: new Date().toISOString() }) + '\n'
    fs.appendFileSync(path.join(DATA_DIR, filename), line)
    return true
  } catch (err) {
    console.error('[resonance] append failed:', err.message)
    return false
  }
}

// --- POST /api/resonance/sadhana ---
// Micro-feedback pasca-Sadhana: state before/after meditasi
app.post('/api/resonance/sadhana', (req, res) => {
  try {
    const { practice_id, state_before, state_after, session_duration_sec, skipped } = req.body ?? {}

    if (!practice_id) {
      return res.status(400).json({ error: 'practice_id wajib diisi.' })
    }

    appendJsonl('resonance_logs.jsonl', {
      practice_id,
      state_before: state_before || null,
      state_after: state_after || null,
      session_duration_sec: session_duration_sec || null,
      skipped: Boolean(skipped),
    })

    return res.json({ received: true, om_shanti: true })
  } catch (err) {
    console.error('[/api/resonance/sadhana] error:', err)
    return res.status(500).json({ error: 'Gagal menerima pantulan.' })
  }
})

// --- POST /api/resonance/ai ---
// Resonance untuk jawaban AI: ripple (tetesan air) atau lontar (koreksi)
app.post('/api/resonance/ai', (req, res) => {
  try {
    const { message_content, type, feedback_text } = req.body ?? {}

    if (!message_content || !type) {
      return res.status(400).json({ error: 'message_content dan type wajib diisi.' })
    }

    if (!['ripple', 'lontar'].includes(type)) {
      return res.status(400).json({ error: 'type harus "ripple" atau "lontar".' })
    }

    appendJsonl('ai_resonance.jsonl', {
      message_content: String(message_content).slice(0, 2000), // batasi panjang
      type,
      feedback_text: type === 'lontar' ? String(feedback_text || '').slice(0, 2000) : null,
    })

    return res.json({ received: true, om_shanti: true })
  } catch (err) {
    console.error('[/api/resonance/ai] error:', err)
    return res.status(500).json({ error: 'Gagal menerima pantulan.' })
  }
})

// --- POST /api/resonance/rta ---
// Bug report / Rta imbalance — bantu developer menyeimbangkan sistem
app.post('/api/resonance/rta', (req, res) => {
  try {
    const { section, description, user_context } = req.body ?? {}

    if (!section || !description) {
      return res.status(400).json({ error: 'section dan description wajib diisi.' })
    }

    if (!['peta_sanskara', 'ruang_sadhana', 'sumur_akasa', 'lainnya'].includes(section)) {
      return res.status(400).json({ error: 'section tidak valid.' })
    }

    appendJsonl('rta_imbalances.jsonl', {
      section,
      description: String(description).slice(0, 5000),
      user_context: user_context ? String(user_context).slice(0, 1000) : null,
    })

    return res.json({
      received: true,
      message: 'Pantulan Anda telah diterima. Kami akan segera menyeimbangkan kembali sistem ini. Om Shanti.',
    })
  } catch (err) {
    console.error('[/api/resonance/rta] error:', err)
    return res.status(500).json({ error: 'Gagal menerima pantulan.' })
  }
})

// --- GET /api/resonance/stats ---
// Statistik agregat (tanpa expose data individual) — untuk dashboard developer
app.get('/api/resonance/stats', (_req, res) => {
  try {
    const stats = { resonance_logs: 0, ai_resonance: 0, rta_imbalances: 0 }
    for (const key of Object.keys(stats)) {
      const filepath = path.join(DATA_DIR, `${key}.jsonl`)
      if (fs.existsSync(filepath)) {
        const content = fs.readFileSync(filepath, 'utf-8')
        stats[key] = content.split('\n').filter((l) => l.trim()).length
      }
    }
    return res.json(stats)
  } catch (err) {
    console.error('[/api/resonance/stats] error:', err)
    return res.status(500).json({ error: 'Gagal mengambil statistik.' })
  }
})

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan.' })
})

// SPA fallback: HARUS didaftarkan setelah semua API routes.
// Route ini hanya catch GET request non-/api/* dan serve index.html (React Router handle sisanya).
if (fs.existsSync(distDir)) {
  app.get('*', (req, res, next) => {
    // Jangan intercept /api/* routes (sudah di-handle di atas)
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'Endpoint tidak ditemukan.' })
    }
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Kesalahan internal pada server.' })
})

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`  DARPANA — Sumur Akasa server`)
  console.log(`  Listening on http://localhost:${PORT}`)
  console.log(`  Provider AI: Groq (FREE)`)
  console.log(`  Model: ${GROQ_MODEL}`)
  console.log(`  Temperature: 0.7`)
  console.log(
    `  GROQ_API_KEY: ${process.env.GROQ_API_KEY ? '✓ terdeteksi' : '✗ BELUM DISET — dapatkan di https://console.groq.com/keys'}`,
  )
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
})
