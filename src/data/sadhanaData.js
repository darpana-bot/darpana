// =============================================================================
// DARPANA — Ruang Sadhana Practice Data
//
// 4 praktik dasar:
//   1. anxious   — Menenangkan Kecemasan (vagus nerve breathing)
//   2. tired     — Memulihkan Ketenangan (restorative breathing)
//   3. angry     — Mendinginkan Api (cooling breath / sitali)
//   4. sanskara  — Personalisasi sesuai Wuku kelahiran
//
// Setiap praktik punya:
//   - id, type, duration_minutes, breath_pattern, mantra, frequency,
//     visual_theme, color (untuk visual breathing element),
//     audio: { ambient, binaural, voice_intro, voice_loop, voice_outro }
//       - 3 layer audio yang diputar bersamaan
//
// Voice-over: pre-generated via Microsoft Edge TTS (id-ID-GadisNeural,
//   neural voice, natural, humanize). File di /public/audio/voice/.
//   Lihat scripts/generate-natural-voiceover.py untuk re-generate.
//
// Audio files di /public/audio/:
//   - ambient-{rain,ocean,stream,bowl}.mp3 (60s loop, generated via Python)
//   - binaural-{alpha-10hz,theta-6hz,alpha-8hz,schumann-7.83hz}.mp3 (60s loop)
//   - voice/voice-{practice}-{intro,loop,outro}.mp3 (natural voice-over)
// =============================================================================

export const sadhanaPractices = [
  {
    id: 'anxious',
    type: 'emotional',
    duration_minutes: 5,
    breath_pattern: {
      // Box breathing 4-4-4-4 untuk vagus nerve
      phases: [
        { name: 'inhale', duration: 4 },
        { name: 'hold', duration: 4 },
        { name: 'exhale', duration: 4 },
        { name: 'hold', duration: 4 },
      ],
      cycles: 12, // 12 cycles × 16 sec = 192 sec ~ 3.2 min + intro/outro
    },
    mantra: 'Om Shanti Shanti Shanti',
    mantra_translation_key: 'peace',
    frequency: 'Alpha 10Hz (relaxation)',
    visual_theme: 'gentle_wave',
    color: '#7A8B70', // sage green
    audio: {
      ambient: '/audio/ambient-rain.mp3',
      binaural: '/audio/binaural-alpha-10hz.mp3',
      voice_intro: '/audio/voice/voice-anxious-intro.mp3',
      voice_loop: '/audio/voice/voice-anxious-loop.mp3',
      voice_outro: '/audio/voice/voice-anxious-outro.mp3',
    },
    breath_instruction: {
      id: 'Tarik 4 detik, tahan 4, hembuskan 4, tahan 4. Ulangi lembut.',
      en: 'Inhale 4 seconds, hold 4, exhale 4, hold 4. Repeat gently.',
      ja: '4秒吸い、4秒止め、4秒吐き、4秒止める。優しく繰り返す。',
      zh: '吸气4秒，屏息4秒，呼气4秒，屏息4秒。轻柔地重复。',
    },
  },
  {
    id: 'tired',
    type: 'emotional',
    duration_minutes: 7,
    breath_pattern: {
      // 4-7-8 breathing untuk restorative
      phases: [
        { name: 'inhale', duration: 4 },
        { name: 'hold', duration: 7 },
        { name: 'exhale', duration: 8 },
      ],
      cycles: 15,
    },
    mantra: 'Om Mritunjaya Namah',
    mantra_translation_key: 'healing',
    frequency: 'Theta 6Hz (deep restoration)',
    visual_theme: 'slow_pulse',
    color: '#5A6F8A', // muted blue
    audio: {
      ambient: '/audio/ambient-ocean.mp3',
      binaural: '/audio/binaural-theta-6hz.mp3',
      voice_intro: '/audio/voice/voice-tired-intro.mp3',
      voice_loop: '/audio/voice/voice-tired-loop.mp3',
      voice_outro: '/audio/voice/voice-tired-outro.mp3',
    },
    breath_instruction: {
      id: 'Tarik 4 detik, tahan 7, hembuskan 8. Rileks, jangan dipaksa.',
      en: 'Inhale 4 seconds, hold 7, exhale 8. Relax, do not force.',
      ja: '4秒吸い、7秒止め、8秒吐く。リラックス、無理しない。',
      zh: '吸气4秒，屏息7秒，呼气8秒。放松，不强求。',
    },
  },
  {
    id: 'angry',
    type: 'emotional',
    duration_minutes: 4,
    breath_pattern: {
      // Sitali-style cooling breath — long exhale
      phases: [
        { name: 'inhale', duration: 4 },
        { name: 'exhale', duration: 8 },
      ],
      cycles: 18,
    },
    mantra: 'Om Aim Hrim Klim',
    mantra_translation_key: 'cooling',
    frequency: 'Alpha 8Hz (cooling)',
    visual_theme: 'water_ripple',
    color: '#4A7C8A', // teal
    audio: {
      ambient: '/audio/ambient-stream.mp3',
      binaural: '/audio/binaural-alpha-8hz.mp3',
      voice_intro: '/audio/voice/voice-angry-intro.mp3',
      voice_loop: '/audio/voice/voice-angry-loop.mp3',
      voice_outro: '/audio/voice/voice-angry-outro.mp3',
    },
    breath_instruction: {
      id: 'Tarik 4 detik lewat mulut (seolah minum lewat sedotan), hembuskan 8 lewat hidung. Dinginkan.',
      en: 'Inhale 4 seconds through curled tongue (or pursed lips), exhale 8 through nose. Cool down.',
      ja: '口から4秒吸い（ストローで吸うように）、鼻から8秒吐く。冷やす。',
      zh: '卷舌或撅嘴吸气4秒，鼻呼8秒。冷却。',
    },
  },
  {
    id: 'sanskara',
    type: 'sanskara',
    duration_minutes: 6,
    breath_pattern: {
      // Coherent breathing 5-5 — universal harmony
      phases: [
        { name: 'inhale', duration: 5 },
        { name: 'exhale', duration: 5 },
      ],
      cycles: 18,
    },
    // Mantra akan diisi dinamis berdasarkan Wuku saat runtime
    mantra_default: 'Om Namah Shivaya',
    mantra_translation_key: 'alignment',
    frequency: 'Alpha 7.83Hz (Schumann resonance)',
    visual_theme: 'lotus_bloom',
    color: '#C29B57', // gold
    audio: {
      ambient: '/audio/ambient-bowl.mp3',
      binaural: '/audio/binaural-schumann-7.83hz.mp3',
      voice_intro: '/audio/voice/voice-sanskara-intro.mp3',
      voice_loop: '/audio/voice/voice-sanskara-loop.mp3',
      voice_outro: '/audio/voice/voice-sanskara-outro.mp3',
    },
    breath_instruction: {
      id: 'Tarik 5 detik, hembuskan 5 detik. Setara, tenang, tanpa jeda. Bayangkan Wuku Anda.',
      en: 'Inhale 5 seconds, exhale 5 seconds. Even, calm, no pause. Visualize your Wuku.',
      ja: '5秒吸い、5秒吐く。均等に、穏やかに、途切れず。あなたのWukuを思い描く。',
      zh: '吸气5秒，呼气5秒。均等、平静、不顿。观想您的 Wuku。',
    },
  },
]

// ---------------------------------------------------------------------------
// Helper: dapatkan praktik by id
// ---------------------------------------------------------------------------
export function getSadhanaPractice(id) {
  return sadhanaPractices.find((p) => p.id === id) || null
}

// ---------------------------------------------------------------------------
// Helper: rekomendasi praktik berdasarkan Wuku
// Berguna untuk personalisasi Ruang Sadhana sesuai hasil Peta Sanskara.
// ---------------------------------------------------------------------------
export function getRecommendedPracticeForWuku(wukuId) {
  // Pemetaan sederhana: setiap Wuku punya rekomendasi praktik berdasarkan
  // elemen dan shadow trait dominan. Untuk MVP, pakai 3 kategori.
  const mapping = {
    // Wuku dengan elemen Api → cenderung perlu cooling
    landep: 'angry',
    warigalit: 'angry',
    mandasiya: 'angry',
    prangbakat: 'angry',
    wugu: 'angry',
    wuye: 'angry',
    // Wuku dengan elemen Air/Udara → cenderung perlu grounding untuk anxietas
    sinta: 'anxious',
    kurantil: 'anxious',
    tolu: 'anxious',
    gumbreg: 'anxious',
    julungwangi: 'anxious',
    kuruwelut: 'anxious',
    kulawu: 'anxious',
    dukut: 'anxious',
    // Wuku dengan elemen Tanah/Eter → cenderung perlu restoratif
    wukir: 'tired',
    sungsang: 'tired',
    pahang: 'tired',
    maktal: 'tired',
    manahil: 'tired',
    bala: 'tired',
    // Wuku khusus → pakai sanskara alignment
    dungulan: 'sanskara',
    kuningan: 'sanskara',
    langkir: 'sanskara',
    julungpujut: 'sanskara',
    marakeh: 'sanskara',
    tambir: 'sanskara',
    medangkungan: 'sanskara',
    wayang: 'sanskara',
    watugunung: 'sanskara',
    warigagung: 'sanskara',
  }
  return mapping[wukuId] || 'sanskara'
}
