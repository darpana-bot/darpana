// =============================================================================
// DARPANA — Generate Sadhana Audio Files
// Menghasilkan 4 file TTS untuk Ruang Sadhana:
//   - sadhana-anxious.mp3
//   - sadhana-tired.mp3
//   - sadhana-angry.mp3
//   - sadhana-sanskara.mp3
//
// Voice: tongtong (warm), speed 0.8 (slow, calm)
// Bahasa: Indonesia (karena aplikasi default Bahasa Indonesia)
// =============================================================================

import ZAI from 'z-ai-web-dev-sdk'
import fs from 'fs'
import path from 'path'

const OUTPUT_DIR = '/home/z/my-project/darpana/public/audio'

// Skrip voice-over untuk setiap sesi. Dibawah 1024 karakter per request.
const scripts = {
  anxious: `Selamat datang di Ruang Sadhana. Mari kita tenangkan kecemasan bersama.
Tarik napas perlahan, empat hitungan. Tahan empat. Hembuskan empat. Tahan empat.
Bayangkan setiap tarikan napas adalah gelombang yang membasuh dada Anda.
Setiap hembusan, membawa pergi pikiran yang berputar cepat.
Anda bukan pikiran Anda. Anda adalah langit yang membiarkan awan berlalu.
Ulangi pola napas ini. Tarik, tahan, hembuskan, tahan.
Mantra: Om Shanti Shanti Shanti.
Dengarkan keheningan di antara setiap napas. Disitu, ketenangan tinggal.
Tetaplah disini, sebentar lagi kita menutup bersama.`,

  tired: `Selamat datang di Ruang Sadhana. Mari kita pulihkan ketenangan.
Tubuh Anda lelah, tapi pikiran belum mau istirahat. Mari kita ajak mereka berdamai.
Tarik napas empat hitungan. Tahan tujuh. Hembuskan delapan.
Setiap tahanan napas, biarkan tubuh Anda makin berat, makin terbumi.
Setiap hembusan panjang, lepaskan beban yang selama ini Anda pikul.
Mantra: Om Mritunjaya Namah. Energinya menyembuhkan.
Bayangkan akar tumbuh dari telapak kaki Anda, masuk ke bumi, dalam dan stabil.
Anda boleh lemah disini. Anda boleh tidak produktif. Hanya napas, hanya napas.
Sebentar lagi, kita akan menutup bersama.`,

  angry: `Selamat datang di Ruang Sadhana. Mari kita dinginkan api yang menyala.
Tarik napas empat hitungan, lewat mulut, seolah minum lewat sedotan.
Hembuskan delapan hitungan lewat hidung, panjang dan halus.
Setiap hembusan, bayangkan api emosi meredup sedikit demi sedikit.
Marah adalah energi. Bukan musuh. Bisa disalurkan, bisa didinginkan.
Mantra: Om Aim Hrim Klim. Getarannya menyeimbangkan.
Rasakan hawa napas Anda yang dingin. Itu adalah air yang memadamkan api.
Anda bukan emosi Anda. Anda adalah ruang tempat emosi muncul dan hilang.
Kita akan segera menutup sesi ini bersama.`,

  sanskara: `Selamat datang di Ruang Sadhana. Mari kita selaraskan dengan pola energi Wuku Anda.
Tarik napas lima hitungan. Hembuskan lima hitungan. Setara, tenang, tanpa jeda.
Bayangkan Wuku kelahiran Anda sebagai pola cahaya di dada Anda.
Cahaya dan bayangannya, keduanya menyempurnakan Anda.
Setiap napas, rasakan sinkronisasi dengan siklus Pawukon yang lebih besar.
Mantra: Om Namah Shivaya. Saya bersujud pada transformasi.
Anda adalah bagian dari siklus. Siklus adalah bagian dari Anda.
Tidak ada yang perlu dilawan. Tidak ada yang perlu dipaksakan.
Hanya napas, hanya kesadaran. Sebentar lagi, kita menutup bersama.`,
}

// Outro grounding yang sama untuk semua sesi (akan dimainkan terakhir)
const outroScript = `Sekarang, mari kita menutup sesi ini bersama.
Sadari berat tubuh Anda. Rasakan kontak tubuh dengan permukaan di bawah Anda.
Telapak kaki, punggung, bahu. Semuanya disangga oleh bumi.
Tarik napas satu kali lagi, perlahan, dalam.
Hembuskan, lepaskan sisa energi yang tidak Anda perlukan.
Anda boleh membuka mata perlahan saat siap.
Terima kasih telah berlatih di Ruang Sadhana. Sampai jumpa di sesi berikutnya.`

async function generateAll() {
  console.log('Initializing ZAI SDK...')
  const zai = await ZAI.create()

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  // Generate 4 main session files
  for (const [id, script] of Object.entries(scripts)) {
    const outputPath = path.join(OUTPUT_DIR, `sadhana-${id}.mp3`)
    console.log(`Generating ${id}... (${script.length} chars)`)

    try {
      const response = await zai.audio.tts.create({
        input: script,
        voice: 'tongtong',
        speed: 0.8,
        response_format: 'mp3',
        stream: false,
      })

      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(new Uint8Array(arrayBuffer))
      fs.writeFileSync(outputPath, buffer)
      console.log(`✓ Saved ${outputPath} (${buffer.length} bytes)`)
    } catch (err) {
      console.error(`✗ Failed ${id}:`, err.message)
    }

    // Small delay to avoid rate limit
    await new Promise((r) => setTimeout(r, 1500))
  }

  // Generate outro file
  const outroPath = path.join(OUTPUT_DIR, 'sadhana-outro.mp3')
  console.log(`Generating outro...`)
  try {
    const response = await zai.audio.tts.create({
      input: outroScript,
      voice: 'tongtong',
      speed: 0.8,
      response_format: 'mp3',
      stream: false,
    })
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(arrayBuffer))
    fs.writeFileSync(outroPath, buffer)
    console.log(`✓ Saved ${outroPath} (${buffer.length} bytes)`)
  } catch (err) {
    console.error(`✗ Failed outro:`, err.message)
  }

  console.log('All audio files generated!')
}

generateAll().catch(console.error)
