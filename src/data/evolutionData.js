export const evolutionEntries = [
  {
    date: '2026-06-17',
    version: '0.1.0',
    title: 'Kelahiran DARPANA',
    body: 'Versi pertama lahir ke dunia. 8 layar lengkap dengan fitur Peta Sanskara, Sumur Akasa, Ruang Sadhana, Pilih Bahasa, Dana Punia, Ruang Resonansi, dan Jejak Evolusi ini.',
    based_on_resonance: false,
  },
  {
    date: '2026-06-17',
    version: '0.1.0',
    title: 'Voice-Over: Dari Robotik ke Natural',
    body: 'Awalnya kami pakai Web Speech API browser untuk voice-over Ruang Sadhana. Suara terdengar robotik dan mengganggu keheningan. Kami ganti ke Microsoft Edge TTS dengan neural voice id-ID-GadisNeural.',
    based_on_resonance: true,
  },
  {
    date: '2026-06-17',
    version: '0.1.0',
    title: 'Audio Latar 3-Layer per Emosi',
    body: 'Awalnya Ruang Sadhana hanya punya 1 file TTS per praktik. Kami tambahkan 2 layer baru: ambient background + binaural beats spesifik per gelombang otak.',
    based_on_resonance: true,
  },
]
export function getEvolutionEntries() {
  return [...evolutionEntries].sort((a, b) => new Date(b.date) - new Date(a.date))
}
