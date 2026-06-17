// =============================================================================
// DARPANA — Resonance API Helper
//
// Semua kirim feedback ke backend dilakukan asynchronous (fire-and-forget).
// Tidak perlu menunggu response — pengguna harus tetap dalam keheningan.
// Error di-swallow (cuma di-log ke console), tidak ditampilkan ke user.
// =============================================================================

/**
 * Kirim micro-feedback pasca-Sadhana ke backend.
 * Async, tidak menunggu response, tidak throw error.
 */
export function logSadhanaResonance(payload) {
  try {
    fetch('/api/resonance/sadhana', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // useAbortSignal: false — biarkan request selesai walau user navigasi
      keepalive: true, // pastikan request tetap jalan walau page unload
    }).catch((err) => {
      console.warn('[resonance] sadhana log failed (silent):', err.message)
    })
  } catch (err) {
    console.warn('[resonance] sadhana log failed (silent):', err.message)
  }
}

/**
 * Kirim resonance untuk jawaban AI (ripple atau lontar).
 * Async, tidak menunggu response.
 */
export function logAIResonance(payload) {
  try {
    fetch('/api/resonance/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch((err) => {
      console.warn('[resonance] AI log failed (silent):', err.message)
    })
  } catch (err) {
    console.warn('[resonance] AI log failed (silent):', err.message)
  }
}

/**
 * Kirim bug report / Rta imbalance.
 * Mengembalikan Promise supaya UI bisa show success message.
 */
export async function submitRtaImbalance(payload) {
  try {
    const res = await fetch('/api/resonance/rta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || 'Gagal mengirim pantulan.')
    }
    return data
  } catch (err) {
    console.error('[resonance] rta submit failed:', err.message)
    throw err
  }
}
