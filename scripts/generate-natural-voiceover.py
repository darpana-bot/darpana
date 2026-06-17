#!/usr/bin/env python3
"""
DARPANA — Generate Natural Voice-Over dengan Microsoft Edge TTS
================================================================

Pakai id-ID-GadisNeural (female, friendly) — neural voice kualitas tinggi
dari Microsoft Azure, sama dengan yang dipakai Edge browser Read Aloud.

Output: 12 file MP3 di /home/z/my-project/darpana/public/audio/voice/
  - voice-{practice}-intro.mp3 (~30 detik)
  - voice-{practice}-loop.mp3 (~10 detik)
  - voice-{practice}-outro.mp3 (~45 detik)

Voice over settings:
  - voice: id-ID-GadisNeural (female, lembut, natural)
  - rate: -15% (lebih lambat dari normal, meditatif)
  - pitch: default
  - volume: default

Usage:
  python3 generate-natural-voiceover.py
"""

import asyncio
import os
from pathlib import Path
import edge_tts

OUTPUT_DIR = Path('/home/z/my-project/darpana/public/audio/voice')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

VOICE = 'id-ID-GadisNeural'  # Female, friendly, natural — ideal untuk meditasi
RATE = '-15%'  # 15% lebih lambat dari normal
PITCH = '+0Hz'
VOLUME = '+0%'

# =============================================================================
# Voice-over scripts (Bahasa Indonesia — natural, meditatif, humanize)
# =============================================================================

scripts = {
    'anxious': {
        'intro':
            'Selamat datang di Ruang Sadhana. Mari kita tenangkan kecemasan bersama. '
            'Tarik napas perlahan, empat hitungan. Tahan empat. Hembuskan empat. Tahan empat. '
            'Bayangkan setiap tarikan napas adalah gelombang yang membasuh dada Anda. '
            'Setiap hembusan, membawa pergi pikiran yang berputar cepat. '
            'Anda bukan pikiran Anda. Anda adalah langit yang membiarkan awan berlalu.',
        'loop':
            'Tarik, tahan, hembuskan, tahan. Mantra, Om Shanti Shanti Shanti. '
            'Dengarkan keheningan di antara setiap napas.',
        'outro':
            'Sekarang, mari kita menutup sesi ini bersama. '
            'Sadari berat tubuh Anda. Rasakan kontak tubuh dengan permukaan di bawah Anda. '
            'Telapak kaki, punggung, bahu. Semuanya disangga oleh bumi. '
            'Tarik napas satu kali lagi, perlahan, dalam. '
            'Hembuskan, lepaskan sisa energi yang tidak Anda perlukan. '
            'Terima kasih telah berlatih di Ruang Sadhana.',
    },
    'tired': {
        'intro':
            'Selamat datang di Ruang Sadhana. Mari kita pulihkan ketenangan. '
            'Tubuh Anda lelah, tapi pikiran belum mau istirahat. Mari kita ajak mereka berdamai. '
            'Tarik napas empat hitungan. Tahan tujuh. Hembuskan delapan. '
            'Setiap tahanan napas, biarkan tubuh Anda makin berat, makin terbumi. '
            'Setiap hembusan panjang, lepaskan beban yang selama ini Anda pikul.',
        'loop':
            'Tarik empat, tahan tujuh, hembuskan delapan. Mantra, Om Mritunjaya Namah. '
            'Bayangkan akar tumbuh dari telapak kaki, masuk ke bumi.',
        'outro':
            'Sekarang, mari kita menutup sesi ini bersama. '
            'Sadari berat tubuh Anda. Rasakan kontak tubuh dengan permukaan di bawah Anda. '
            'Telapak kaki, punggung, bahu. Semuanya disangga oleh bumi. '
            'Anda boleh lemah di sini. Anda boleh tidak produktif. '
            'Tarik napas satu kali lagi, perlahan, dalam. '
            'Hembuskan, lepaskan sisa energi yang tidak Anda perlukan. '
            'Terima kasih telah berlatih di Ruang Sadhana.',
    },
    'angry': {
        'intro':
            'Selamat datang di Ruang Sadhana. Mari kita dinginkan api yang menyala. '
            'Tarik napas empat hitungan, lewat mulut, seolah minum lewat sedotan. '
            'Hembuskan delapan hitungan lewat hidung, panjang dan halus. '
            'Setiap hembusan, bayangkan api emosi meredup sedikit demi sedikit. '
            'Marah adalah energi. Bukan musuh. Bisa disalurkan, bisa didinginkan.',
        'loop':
            'Tarik empat lewat mulut, hembuskan delapan lewat hidung. '
            'Mantra, Om Aim Hrim Klim. Rasakan hawa napas yang dingin.',
        'outro':
            'Sekarang, mari kita menutup sesi ini bersama. '
            'Sadari berat tubuh Anda. Rasakan kontak tubuh dengan permukaan di bawah Anda. '
            'Telapak kaki, punggung, bahu. Semuanya disangga oleh bumi. '
            'Anda bukan emosi Anda. Anda adalah ruang tempat emosi muncul dan hilang. '
            'Tarik napas satu kali lagi, perlahan, dalam. '
            'Hembuskan, lepaskan sisa energi yang tidak Anda perlukan. '
            'Terima kasih telah berlatih di Ruang Sadhana.',
    },
    'sanskara': {
        'intro':
            'Selamat datang di Ruang Sadhana. Mari kita selaraskan dengan pola energi Wuku Anda. '
            'Tarik napas lima hitungan. Hembuskan lima hitungan. Setara, tenang, tanpa jeda. '
            'Bayangkan Wuku kelahiran Anda sebagai pola cahaya di dada Anda. '
            'Cahaya dan bayangannya, keduanya menyempurnakan Anda. '
            'Setiap napas, rasakan sinkronisasi dengan siklus Pawukon yang lebih besar.',
        'loop':
            'Tarik lima, hembuskan lima. Mantra, Om Namah Shivaya. '
            'Saya bersujud pada transformasi. Anda adalah bagian dari siklus.',
        'outro':
            'Sekarang, mari kita menutup sesi ini bersama. '
            'Sadari berat tubuh Anda. Rasakan kontak tubuh dengan permukaan di bawah Anda. '
            'Telapak kaki, punggung, bahu. Semuanya disangga oleh bumi. '
            'Tidak ada yang perlu dilawan. Tidak ada yang perlu dipaksakan. '
            'Tarik napas satu kali lagi, perlahan, dalam. '
            'Hembuskan, lepaskan sisa energi yang tidak Anda perlukan. '
            'Terima kasih telah berlatih di Ruang Sadhana.',
    },
}


async def generate_voice(text, output_path, voice=VOICE, rate=RATE, pitch=PITCH, volume=VOLUME):
    """Generate voice-over MP3 via edge-tts."""
    communicate = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch, volume=volume)
    await communicate.save(str(output_path))
    size = os.path.getsize(output_path) / 1024
    print(f"  ✓ {output_path.name} ({size:.1f} KB)")


async def main():
    print("=" * 60)
    print("  DARPANA — Natural Voice-Over Generator")
    print(f"  Voice: {VOICE}")
    print(f"  Rate: {RATE} (slower for meditation)")
    print("=" * 60)
    print()

    for practice_id, script in scripts.items():
        print(f"--- {practice_id} ---")
        for phase in ['intro', 'loop', 'outro']:
            output = OUTPUT_DIR / f'voice-{practice_id}-{phase}.mp3'
            print(f"  Generating {phase}...")
            await generate_voice(script[phase], output)
        print()

    print("=" * 60)
    print("  DONE — All natural voice-overs generated!")
    print("=" * 60)
    print()
    print(f"Files in {OUTPUT_DIR}:")
    for f in sorted(OUTPUT_DIR.glob('*.mp3')):
        size = os.path.getsize(f) / 1024
        print(f"  {f.name:40s} {size:8.1f} KB")


if __name__ == '__main__':
    asyncio.run(main())
