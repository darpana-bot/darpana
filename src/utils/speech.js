// =============================================================================
// DARPANA — Web Speech API Voice Helper
//
// Pakai SpeechSynthesisUtterance browser untuk voice-over Bahasa Indonesia
// dengan voice native (id-ID). Lebih natural daripada TTS cloud yang berbahasa
// Mandarin mencoba ngomong Indonesia.
//
// Fallback: jika browser tidak punya voice id-ID, pakai voice default dan
// tetap set lang='id-ID' (browser akan coba approximation).
// =============================================================================

/**
 * Cek apakah Web Speech API tersedia di browser.
 */
export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/**
 * Cari voice Bahasa Indonesia native di browser.
 * Beberapa browser butuh waktu untuk load voice list → pakai onvoiceschanged.
 */
export function findIndonesianVoice() {
  if (!isSpeechSupported()) return null
  const voices = window.speechSynthesis.getVoices()
  if (!voices || voices.length === 0) return null

  // Prioritas 1: voice dengan lang persis 'id-ID'
  let voice = voices.find((v) => v.lang === 'id-ID')
  if (voice) return voice

  // Prioritas 2: voice dengan lang mulai 'id'
  voice = voices.find((v) => v.lang?.toLowerCase().startsWith('id'))
  if (voice) return voice

  // Prioritas 3: voice yang namanya mengandung 'indonesia'
  voice = voices.find((v) => v.name?.toLowerCase().includes('indonesia'))
  if (voice) return voice

  // Fallback: null → browser akan pakai default voice
  return null
}

/**
 * Tunggu voice list tersedia (beberapa browser load async).
 * Returns promise yang resolve ke Indonesian voice atau null.
 */
export function waitForVoices(maxWaitMs = 2000) {
  return new Promise((resolve) => {
    if (!isSpeechSupported()) return resolve(null)

    const existing = findIndonesianVoice()
    if (existing) return resolve(existing)

    let resolved = false
    const finish = (v) => {
      if (resolved) return
      resolved = true
      resolve(v)
    }

    const handler = () => {
      const v = findIndonesianVoice()
      if (v) finish(v)
    }
    window.speechSynthesis.onvoiceschanged = handler
    // Trigger once immediately
    handler()
    // Timeout fallback
    setTimeout(() => finish(findIndonesianVoice()), maxWaitMs)
  })
}

/**
 * Speak text dengan voice Bahasa Indonesia native.
 *
 * @param {string} text - Teks yang akan diucapkan
 * @param {Object} options - { rate, pitch, volume, onEnd, onStart }
 * @returns {SpeechSynthesisUtterance|null}
 */
export function speakIndonesian(text, options = {}) {
  if (!isSpeechSupported()) {
    console.warn('Web Speech API not supported')
    options.onEnd?.()
    return null
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'id-ID'
  utterance.rate = options.rate ?? 0.85 // sedikit lambat, meditatif
  utterance.pitch = options.pitch ?? 1.0
  utterance.volume = options.volume ?? 0.9

  const voice = findIndonesianVoice()
  if (voice) {
    utterance.voice = voice
  }

  if (options.onStart) utterance.onstart = options.onStart
  if (options.onEnd) utterance.onend = options.onEnd
  if (options.onError) utterance.onerror = options.onError
  if (options.onBoundary) utterance.onboundary = options.onBoundary

  window.speechSynthesis.speak(utterance)
  return utterance
}

/**
 * Stop any ongoing speech.
 */
export function stopSpeaking() {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel()
  }
}

/**
 * Pause speech (can be resumed).
 */
export function pauseSpeaking() {
  if (isSpeechSupported() && window.speechSynthesis.speaking) {
    window.speechSynthesis.pause()
  }
}

/**
 * Resume paused speech.
 */
export function resumeSpeaking() {
  if (isSpeechSupported() && window.speechSynthesis.paused) {
    window.speechSynthesis.resume()
  }
}

/**
 * Cek status speech.
 */
export function getSpeechState() {
  if (!isSpeechSupported()) return 'unsupported'
  if (window.speechSynthesis.paused) return 'paused'
  if (window.speechSynthesis.speaking) return 'speaking'
  return 'idle'
}
