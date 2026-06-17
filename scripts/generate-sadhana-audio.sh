#!/bin/bash
# =============================================================================
# DARPANA — Generate Sadhana Audio Files via z-ai CLI (WAV format)
# =============================================================================

set -e

OUTPUT_DIR="/home/z/my-project/darpana/public/audio"
mkdir -p "$OUTPUT_DIR"

ANXIOUS_TEXT='Selamat datang di Ruang Sadhana. Mari kita tenangkan kecemasan bersama. Tarik napas perlahan, empat hitungan. Tahan empat. Hembuskan empat. Tahan empat. Bayangkan setiap tarikan napas adalah gelombang yang membasuh dada Anda. Setiap hembusan, membawa pergi pikiran yang berputar cepat. Anda bukan pikiran Anda. Anda adalah langit yang membiarkan awan berlalu. Ulangi pola napas ini. Tarik, tahan, hembuskan, tahan. Mantra: Om Shanti Shanti Shanti. Dengarkan keheningan di antara setiap napas. Disitu, ketenangan tinggal. Tetaplah disini, sebentar lagi kita menutup bersama.'

TIRED_TEXT='Selamat datang di Ruang Sadhana. Mari kita pulihkan ketenangan. Tubuh Anda lelah, tapi pikiran belum mau istirahat. Mari kita ajak mereka berdamai. Tarik napas empat hitungan. Tahan tujuh. Hembuskan delapan. Setiap tahanan napas, biarkan tubuh Anda makin berat, makin terbumi. Setiap hembusan panjang, lepaskan beban yang selama ini Anda pikul. Mantra: Om Mritunjaya Namah. Energinya menyembuhkan. Bayangkan akar tumbuh dari telapak kaki Anda, masuk ke bumi, dalam dan stabil. Anda boleh lemah disini. Anda boleh tidak produktif. Hanya napas, hanya napas. Sebentar lagi, kita akan menutup bersama.'

ANGRY_TEXT='Selamat datang di Ruang Sadhana. Mari kita dinginkan api yang menyala. Tarik napas empat hitungan, lewat mulut, seolah minum lewat sedotan. Hembuskan delapan hitungan lewat hidung, panjang dan halus. Setiap hembusan, bayangkan api emosi meredup sedikit demi sedikit. Marah adalah energi. Bukan musuh. Bisa disalurkan, bisa didinginkan. Mantra: Om Aim Hrim Klim. Getarannya menyeimbangkan. Rasakan hawa napas Anda yang dingin. Itu adalah air yang memadamkan api. Anda bukan emosi Anda. Anda adalah ruang tempat emosi muncul dan hilang. Kita akan segera menutup sesi ini bersama.'

SANSKARA_TEXT='Selamat datang di Ruang Sadhana. Mari kita selaraskan dengan pola energi Wuku Anda. Tarik napas lima hitungan. Hembuskan lima hitungan. Setara, tenang, tanpa jeda. Bayangkan Wuku kelahiran Anda sebagai pola cahaya di dada Anda. Cahaya dan bayangannya, keduanya menyempurnakan Anda. Setiap napas, rasakan sinkronisasi dengan siklus Pawukon yang lebih besar. Mantra: Om Namah Shivaya. Saya bersujud pada transformasi. Anda adalah bagian dari siklus. Siklus adalah bagian dari Anda. Tidak ada yang perlu dilawan. Tidak ada yang perlu dipaksakan. Hanya napas, hanya kesadaran. Sebentar lagi, kita menutup bersama.'

OUTRO_TEXT='Sekarang, mari kita menutup sesi ini bersama. Sadari berat tubuh Anda. Rasakan kontak tubuh dengan permukaan di bawah Anda. Telapak kaki, punggung, bahu. Semuanya disangga oleh bumi. Tarik napas satu kali lagi, perlahan, dalam. Hembuskan, lepaskan sisa energi yang tidak Anda perlukan. Anda boleh membuka mata perlahan saat siap. Terima kasih telah berlatih di Ruang Sadhana. Sampai jumpa di sesi berikutnya.'

echo "Generating anxious..."
z-ai tts -i "$ANXIOUS_TEXT" -o "$OUTPUT_DIR/sadhana-anxious.wav" --voice tongtong --speed 0.8 --format wav
echo "✓ sadhana-anxious.wav"
sleep 2

echo "Generating tired..."
z-ai tts -i "$TIRED_TEXT" -o "$OUTPUT_DIR/sadhana-tired.wav" --voice tongtong --speed 0.8 --format wav
echo "✓ sadhana-tired.wav"
sleep 2

echo "Generating angry..."
z-ai tts -i "$ANGRY_TEXT" -o "$OUTPUT_DIR/sadhana-angry.wav" --voice tongtong --speed 0.8 --format wav
echo "✓ sadhana-angry.wav"
sleep 2

echo "Generating sanskara..."
z-ai tts -i "$SANSKARA_TEXT" -o "$OUTPUT_DIR/sadhana-sanskara.wav" --voice tongtong --speed 0.8 --format wav
echo "✓ sadhana-sanskara.wav"
sleep 2

echo "Generating outro..."
z-ai tts -i "$OUTRO_TEXT" -o "$OUTPUT_DIR/sadhana-outro.wav" --voice tongtong --speed 0.8 --format wav
echo "✓ sadhana-outro.wav"

echo ""
echo "=== DONE ==="
ls -lh "$OUTPUT_DIR/"
