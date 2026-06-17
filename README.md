# 🪔 DARPANA

> Cermin digital yang menggabungkan kearifan spiritual Bali dengan sains modern.

[![Deploy on Render](https://img.shields.io/badge/Deploy-Render-46E3B7.svg)](https://render.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)
[![Made with React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev)

## ✨ Fitur

- **🪷 Onboarding Napas** — ritual masuk 3 tarikan napas untuk menenangkan sistem saraf
- **📅 Peta Sanskara** — analisis pola energi berdasarkan siklus Pawukon Bali (30 Wuku lengkap dengan algoritma konversi tanggal Masehi yang akurat)
- **💧 Sumur Akasa** — chat AI pemandu reflektif "Penjaga Sumur Akasa" (Groq Llama 3.3 70B, gratis)
- **🧘 Ruang Sadhana** — praktik audio-visual terpadu dengan 3-layer audio: voice-over natural Indonesia (Microsoft Edge TTS) + ambient background + binaural beats spesifik per gelombang otak
- **🌍 Pilih Bahasa** — 4 bahasa: Indonesia, English, 日本語, 中文 (istilah Bali/Sanskerta tetap tidak diterjemahkan)
- **🔥 Dana Punia** — model ekonomi donasi sukarela, tanpa iklan, tanpa paywall, tanpa paksaan

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Obsidian | `#1A1C1E` | Background |
| Slate | `#2A2D31` | Cards |
| Sand | `#E2DFD8` | Text |
| Gold | `#C29B57` | Accent |
| Sage | `#7A8B70` | Secondary |

- **Font Heading**: Playfair Display (serif)
- **Font Body**: Inter (sans-serif)
- **Border Radius**: minimal 20px (rounded-2xl/3xl), tidak ada sudut tajam
- **Animasi**: Framer Motion lambat (0.6s–1.2s) dengan easeInOut

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite 5 + TailwindCSS 3 + Framer Motion + lucide-react
- **Backend**: Express.js (Node.js 20+)
- **AI**: Groq Llama 3.3 70B (free tier, tanpa batasan region)
- **Voice-over**: Microsoft Edge TTS (`id-ID-GadisNeural`, neural voice natural)
- **Audio layers**: Generated via Python (numpy + scipy) — ambient + binaural beats

## 🚀 Quick Start (Development)

```bash
# 1. Clone repo
git clone https://github.com/USERNAME/darpana.git
cd darpana

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env, isi GROQ_API_KEY (dapatkan di https://console.groq.com/keys)

# 4. Jalankan backend + frontend bersamaan
npm run dev:full
```

Buka **http://localhost:5173** di browser.

## 📦 Struktur Project

```
darpana/
├── server.js                    # Express server (API + static serve)
├── public/
│   └── audio/                   # Audio files (ambient, binaural, voice-over)
│       ├── ambient-*.mp3        # 4 ambient backgrounds (60s loop)
│       ├── binaural-*.mp3       # 4 binaural beats (60s loop, stereo)
│       └── voice/               # 12 natural voice-overs (Edge TTS)
├── src/
│   ├── App.jsx                  # Root component + 8 layar
│   ├── main.jsx                 # React entry point
│   ├── index.css                # Tailwind + custom styles
│   ├── contexts/
│   │   └── LanguageContext.jsx  # i18n state provider
│   ├── i18n/
│   │   └── translations.js      # 4 bahasa: ID, EN, JA, ZH
│   ├── data/
│   │   ├── wukuData.js          # 30 Wuku Pawukon + algoritma konversi
│   │   ├── sadhanaData.js       # 4 praktik Sadhana
│   │   └── sadhanaScripts.js    # Voice-over text scripts
│   └── utils/
│       └── speech.js            # Web Speech API helper (legacy/fallback)
├── scripts/
│   ├── generate-sadhana-audio-layers.py  # Generate ambient + binaural
│   ├── generate-natural-voiceover.py     # Generate voice via Edge TTS
│   └── test-pawukon.js                   # Test algoritma Pawukon
├── render.yaml                  # Render Blueprint (production deploy)
├── vercel.json                  # Vercel config (alternatif)
├── .env.example                 # Template env vars
└── package.json
```

## 🌐 Deployment

### Opsi 1: Render (REKOMENDASI — Single Service, Gratis, Mudah)

Deploy backend Express + frontend Vite sebagai satu web service di Render.

**Langkah-langkah:**

1. **Push ke GitHub** (lihat section [Git Setup](#-git-setup) di bawah)

2. **Daftar Render**: https://render.com (gratis, login pakai GitHub)

3. **Buat Web Service**:
   - Dashboard → **New +** → **Blueprint**
   - Pilih repo GitHub `USERNAME/darpana`
   - Render akan auto-detect `render.yaml`
   - Klik **Apply**

4. **Set Environment Variables** di dashboard Render:
   - `GROQ_API_KEY` = `gsk_xxxxxxxx` (dari https://console.groq.com/keys)
   - `NODE_ENV` = `production` (sudah di-set dari render.yaml)
   - `GROQ_MODEL` = `llama-3.3-70b-versatile` (sudah di-set)

5. **Deploy!** Tunggu 2-5 menit. URL akan berupa `https://darpana.onrender.com`

**Free tier Render**: 750 jam/bulan, service sleep setelah 15 menit idle (cold start ~30 detik saat pertama diakses).

---

### Opsi 2: Vercel (Frontend) + Render (Backend) — Split Deployment

Untuk performance terbaik (frontend CDN global, backend persistent):

1. **Deploy Backend ke Render**:
   - Ikuti langkah Opsi 1 di atas, tapi abaikan frontend
   - Catat URL backend: `https://darpana-api.onrender.com`

2. **Deploy Frontend ke Vercel**:
   - Daftar https://vercel.com (gratis, login pakai GitHub)
   - **New Project** → import repo `USERNAME/darpana`
   - Framework: **Vite** (auto-detected dari `vercel.json`)
   - Edit `vercel.json`: ganti `https://your-backend-url.onrender.com` dengan URL backend Render Anda
   - Deploy!

3. Frontend URL: `https://darpana.vercel.app` (atau custom domain)

---

### Opsi 3: Lokal (Tanpa Deploy)

```bash
npm install
cp .env.example .env  # isi GROQ_API_KEY
npm run build         # build frontend ke dist/
npm run start         # jalanin Express server (serve API + dist/)
```

Buka http://localhost:8787 — frontend + backend di URL yang sama.

## 🔧 Git Setup

### Pertama Kali: Inisialisasi & Push ke GitHub

```bash
# 1. Inisialisasi git repo lokal
git init
git branch -M main

# 2. Stage semua file (kecuali node_modules, .env, dist — sudah di .gitignore)
git add .

# 3. Initial commit
git commit -m "feat: initial DARPANA MVP — 8 layar, 4 bahasa, 30 Wuku, Sumur Akasa AI, Ruang Sadhana, Dana Punia"

# 4. Buat repo kosong di GitHub dulu (https://github.com/new), tanpa README/license
#    Lalu hubungkan:
git remote add origin https://github.com/USERNAME/darpana.git

# 5. Push
git push -u origin main
```

### Update Selanjutnya

```bash
git add .
git commit -m "feat: tambah fitur baru"
git push
```

> **Penting**: File `.env` (berisi `GROQ_API_KEY` asli) **TIDAK** akan ter-commit karena sudah ada di `.gitignore`. Hanya `.env.example` (template tanpa secrets) yang ter-commit.

## 🔑 Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GROQ_API_KEY` | ✅ Yes | — | API key Groq (dari https://console.groq.com/keys) |
| `GROQ_MODEL` | ❌ No | `llama-3.3-70b-versatile` | Model Groq (`llama-3.1-8b-instant` untuk lebih cepat) |
| `PORT` | ❌ No | `8787` | Port Express server (production platform biasanya set otomatis) |
| `NODE_ENV` | ❌ No | `development` | Set ke `production` di deploy |

## 🧪 Testing

```bash
# Test algoritma Pawukon (4 tanggal referensi terkalibrasi)
node scripts/test-pawukon.js
```

Expected output: 4/4 tests PASS ✓

## 🎧 Audio Regeneration (Opsional)

Jika perlu regenerate audio layers (misalnya ganti voice atau teks):

```bash
# Ambient + binaural beats (butuh Python 3 + numpy + scipy)
python3 scripts/generate-sadhana-audio-layers.py

# Voice-over natural (butuh Python 3 + edge-tts)
pip install edge-tts
python3 scripts/generate-natural-voiceover.py

# Kompres WAV → MP3 (butuh ffmpeg)
cd public/audio && for f in *.wav; do ffmpeg -y -i "$f" -b:a 64k "${f%.wav}.mp3"; done && rm *.wav
```

## 🔥 Model Ekonomi: Dana Punia

DARPANA tidak punya iklan, tidak paywall, tidak jual data. Kami mengandalkan **Dana Punia** (donasi sukarela berdasarkan rasa syukur).

- ✅ Peta Sanskara + Sumur Akasa + Ruang Sadhana: 100% gratis selamanya
- ✅ Tanpa iklan, tanpa tracking komersial
- ✅ Donasi melalui: https://linktr.ee/Slegna

Pelajari filosofinya di halaman "Menjaga Api DARPANA" dalam aplikasi.

## 📜 License

MIT License — lihat [LICENSE](LICENSE). Bebas digunakan, dimodifikasi, didistribusikan.

## 🙏 Acknowledgments

- **Pawukon Bali** — sistem kalender 210-hari dengan 30 Wuku, sumber: Wikipedia & kalenderbali.info
- **Groq** — free tier Llama 3.3 70B untuk Sumur Akasa
- **Microsoft Edge TTS** — neural voice Bahasa Indonesia natural
- **Filosofi Hindu-Bali** — Tattwa, Sekala-Niskala, Tri Pramana, mitologi Prabu Watugunung

## 📞 Kontak

- **Donasi (Dana Punia)**: https://linktr.ee/Slegna
- **Issues**: https://github.com/USERNAME/darpana/issues

---

> *"Engagingan raga, tan pawak sira."* — Bhagawad Gita
