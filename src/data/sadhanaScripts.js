// =============================================================================
// DARPANA — Sadhana Voice-Over Scripts (Bahasa Indonesia)
//
// Teks ini akan diucapkan oleh Web Speech API browser dengan voice id-ID
// (native Indonesian speaker), bukan TTS cloud yang berbahasa Mandarin.
//
// Script dibagi per phase:
//   - intro: pembuka sesi (~30 detik)
//   - loop: pengingat singkat yang diucapkan setiap beberapa menit (~10 detik)
//   - outro: penutup + grounding (~45 detik)
// =============================================================================

export const sadhanaScripts = {
  anxious: {
    intro:
      'Selamat datang di Ruang Sadhana. Mari kita tenangkan kecemasan bersama. ' +
      'Tarik napas perlahan, empat hitungan. Tahan empat. Hembuskan empat. Tahan empat. ' +
      'Bayangkan setiap tarikan napas adalah gelombang yang membasuh dada Anda. ' +
      'Setiap hembusan, membawa pergi pikiran yang berputar cepat. ' +
      'Anda bukan pikiran Anda. Anda adalah langit yang membiarkan awan berlalu.',
    loop:
      'Tarik, tahan, hembuskan, tahan. Mantra: Om Shanti Shanti Shanti. ' +
      'Dengarkan keheningan di antara setiap napas.',
    outro:
      'Sekarang, mari kita menutup sesi ini bersama. ' +
      'Sadari berat tubuh Anda. Rasakan kontak tubuh dengan permukaan di bawah Anda. ' +
      'Telapak kaki, punggung, bahu. Semuanya disangga oleh bumi. ' +
      'Tarik napas satu kali lagi, perlahan, dalam. ' +
      'Hembuskan, lepaskan sisa energi yang tidak Anda perlukan. ' +
      'Terima kasih telah berlatih di Ruang Sadhana.',
  },
  tired: {
    intro:
      'Selamat datang di Ruang Sadhana. Mari kita pulihkan ketenangan. ' +
      'Tubuh Anda lelah, tapi pikiran belum mau istirahat. Mari kita ajak mereka berdamai. ' +
      'Tarik napas empat hitungan. Tahan tujuh. Hembuskan delapan. ' +
      'Setiap tahanan napas, biarkan tubuh Anda makin berat, makin terbumi. ' +
      'Setiap hembusan panjang, lepaskan beban yang selama ini Anda pikul.',
    loop:
      'Tarik empat, tahan tujuh, hembuskan delapan. Mantra: Om Mritunjaya Namah. ' +
      'Bayangkan akar tumbuh dari telapak kaki, masuk ke bumi.',
    outro:
      'Sekarang, mari kita menutup sesi ini bersama. ' +
      'Sadari berat tubuh Anda. Rasakan kontak tubuh dengan permukaan di bawah Anda. ' +
      'Telapak kaki, punggung, bahu. Semuanya disangga oleh bumi. ' +
      'Anda boleh lemah di sini. Anda boleh tidak produktif. ' +
      'Tarik napas satu kali lagi, perlahan, dalam. ' +
      'Hembuskan, lepaskan sisa energi yang tidak Anda perlukan. ' +
      'Terima kasih telah berlatih di Ruang Sadhana.',
  },
  angry: {
    intro:
      'Selamat datang di Ruang Sadhana. Mari kita dinginkan api yang menyala. ' +
      'Tarik napas empat hitungan, lewat mulut, seolah minum lewat sedotan. ' +
      'Hembuskan delapan hitungan lewat hidung, panjang dan halus. ' +
      'Setiap hembusan, bayangkan api emosi meredup sedikit demi sedikit. ' +
      'Marah adalah energi. Bukan musuh. Bisa disalurkan, bisa didinginkan.',
    loop:
      'Tarik empat lewat mulut, hembuskan delapan lewat hidung. ' +
      'Mantra: Om Aim Hrim Klim. Rasakan hawa napas yang dingin.',
    outro:
      'Sekarang, mari kita menutup sesi ini bersama. ' +
      'Sadari berat tubuh Anda. Rasakan kontak tubuh dengan permukaan di bawah Anda. ' +
      'Telapak kaki, punggung, bahu. Semuanya disangga oleh bumi. ' +
      'Anda bukan emosi Anda. Anda adalah ruang tempat emosi muncul dan hilang. ' +
      'Tarik napas satu kali lagi, perlahan, dalam. ' +
      'Hembuskan, lepaskan sisa energi yang tidak Anda perlukan. ' +
      'Terima kasih telah berlatih di Ruang Sadhana.',
  },
  sanskara: {
    intro:
      'Selamat datang di Ruang Sadhana. Mari kita selaraskan dengan pola energi Wuku Anda. ' +
      'Tarik napas lima hitungan. Hembuskan lima hitungan. Setara, tenang, tanpa jeda. ' +
      'Bayangkan Wuku kelahiran Anda sebagai pola cahaya di dada Anda. ' +
      'Cahaya dan bayangannya, keduanya menyempurnakan Anda. ' +
      'Setiap napas, rasakan sinkronisasi dengan siklus Pawukon yang lebih besar.',
    loop:
      'Tarik lima, hembuskan lima. Mantra: Om Namah Shivaya. ' +
      'Saya bersujud pada transformasi. Anda adalah bagian dari siklus.',
    outro:
      'Sekarang, mari kita menutup sesi ini bersama. ' +
      'Sadari berat tubuh Anda. Rasakan kontak tubuh dengan permukaan di bawah Anda. ' +
      'Telapak kaki, punggung, bahu. Semuanya disangga oleh bumi. ' +
      'Tidak ada yang perlu dilawan. Tidak ada yang perlu dipaksakan. ' +
      'Tarik napas satu kali lagi, perlahan, dalam. ' +
      'Hembuskan, lepaskan sisa energi yang tidak Anda perlukan. ' +
      'Terima kasih telah berlatih di Ruang Sadhana.',
  },
}

/**
 * Ambil script untuk praktik tertentu.
 */
export function getScript(practiceId) {
  return sadhanaScripts[practiceId] || sadhanaScripts.sanskara
}
