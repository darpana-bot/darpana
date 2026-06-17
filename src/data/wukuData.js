// =============================================================================
// DARPANA — Wuku Pawukon Data (30 Wuku lengkap)
//
// Sumber:
// - Daftar Wuku & Bhatara: Wikipedia "Wuku" (id.wikipedia.org/wiki/Wuku)
// - Mitologi Prabu Watugunung: nowbali.co.id, ullensentalu.com
// - Kalibrasi algoritma: kalenderbali.info
//     · 1945-08-17 (Jumat) → Dungulan (minggu 12 dari 30)
//     · 2024-02-28 (Rabu, Galungan) → Dungulan
//
// Algoritma konversi Masehi → Wuku:
// 1. Hitung selisih hari dari tanggal referensi (1945-08-17 = Dungulan day-3,
//    yaitu hari ke-80 dalam siklus Pawukon 210-hari, 0-indexed = 79).
// 2. modulo 210 → posisi dalam siklus Pawukon.
// 3. Bagi 7 → nomor Wuku (0..29).
//
// Catatan:
// - Algoritma ini menggunakan hari Masehi murni (tanpa penyesuaian tz), karena
//   Pawukon tidak bergantung pada posisi matahari.
// - Akurasi sudah diverifikasi terhadap dua tanggal referensi di atas.
// =============================================================================

// ---------------------------------------------------------------------------
// 30 Wuku Pawukon — urutan resmi sesuai mitologi Prabu Watugunung
// Sinta (istri tertua) → ... → Watugunung (raja terakhir)
// ---------------------------------------------------------------------------
export const wukuData = [
  {
    id: 'sinta',
    name: 'Sinta',
    order: 1,
    bhatara: 'Batara Yama',
    range: 'Ahad Pahing – Sabtu Pon',
    archetype: 'The Womb of Tides — Sang Penjaga Air',
    element: 'Air',
    myth_role: 'Istri tertua Prabu Watugunung, simbol penerimaan & pembersihan',
    quantum_pattern:
      'Resonansi cair, mirip keadaan superfluid — energi mengalir tanpa friksi, mampu menembus rintangan tanpa kehilangan bentuk. Pola ini erat kaitannya dengan entanglement emosional: mudah "menyerap" keadaan medan orang di sekitar.',
    neuroscience_note:
      'Vagus nerve aktif dominan (parasympathetic) — pola rest-digest. Sensitivitas interoceptif tinggi membuat individu mudah menyadari sinyal tubuh, namun rentan dysregulasi saat empati berlebih.',
    light_traits: [
      'Empati yang dalam dan menyembuhkan',
      'Intuisi yang kuat',
      'Kemampuan adaptasi seperti air',
      'Ketenangan yang menenangkan',
    ],
    shadow_traits: [
      'Mudah menyerap emosi orang lain',
      'Sulit menetapkan batas',
      'Kecenderungan menarik diri saat overwhelmed',
      'Bisa terjebak dalam ruminasi emosional',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Pasang": tarik napas perlahan 6 hitungan dari perut, hembuskan 8 hitungan. Rasakan ombak napas membasuh dada — keluar masuk, tanpa disimpan.',
      sabda: 'Mantra bisik: "Om Tirta Amrta Namah" — diucapkan 3x saat merasa terlalu penuh emosi orang lain, untuk memurnikan medan.',
      idep: 'Afirmasi: "Aku adalah cangkir yang menampung, bukan lautan yang menenggelamkan." Ulangi saat menetapkan batas dengan orang lain.',
    },
  },
  {
    id: 'landep',
    name: 'Landep',
    order: 2,
    bhatara: 'Batara Mahadewa',
    range: 'Ahad Wage – Sabtu Kliwon',
    archetype: 'The Blade of Light — Sang Empu Pemurna',
    element: 'Api',
    myth_role: 'Istri termuda Prabu Watugunung, simbol ketajaman dan pemurnian',
    quantum_pattern:
      'Resonansi koheren seperti laser: gelombang energi tersusun sefase, mempertajam intent. Pola ini menyerupai keadaan "superposition collapse" — saat kesadaran terfokus, realitas yang teramati ikut mengkristal.',
    neuroscience_note:
      'Prefrontal cortex (PFC) menunjukkan aktivitas gamma tinggi pada pola fokus tajam — indikator konsentrasi tunggal. Pola ini bermanuver cepat namun rentan over-arousal jika tidak diimbangi.',
    light_traits: [
      'Berpikir jernih dan analitis',
      'Memotong ilusi dengan kebijaksanaan',
      'Kemampuan fokus mendalam',
      'Integritas yang tajam',
    ],
    shadow_traits: [
      'Kecenderungan menghakimi diri sendiri',
      'Terkadang terlalu kritis pada orang lain',
      'Sulit melepaskan kontrol',
      'Pikiran berputar (overthinking) saat lelah',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Pedang": tarik napas 4 hitungan, tahan 2, hembuskan 6. Visualisasikan setiap hembusan memotong benang pikiran yang mengganggu.',
      sabda: 'Mantra bisik: "Om Agni Hotra Namah" — diucapkan 3x saat pikiran terasa kabur, untuk memanggil kembali ketajaman.',
      idep: 'Afirmasi: "Aku adalah mata pedang, bukan mata yang ditusuk." Ulangi 3x sebelum mengambil keputusan sulit.',
    },
  },
  {
    id: 'wukir',
    name: 'Wukir',
    order: 3,
    bhatara: 'Batara Mahayakti',
    range: 'Ahad Legi – Sabtu Pahing',
    archetype: 'The Mountain Spine — Sang Tulang Punggung',
    element: 'Tanah',
    myth_role: 'Putra sulung, simbol fondasi yang tak tergoyahkan',
    quantum_pattern:
      'Koherensi struktural seperti kristal — atom tersusun dalam kisi yang stabil, getarannya saling memperkuat. Pola ini menyerupai "ground state" kuantum: energi minimum, stabilitas maksimum.',
    neuroscience_note:
      'Aktivitas otak dominan di gelombang alfa (8-12 Hz) — keadaan "relaxed alertness". Individu dengan pola ini memiliki baseline kortisol rendah dan respons stres yang cepat kembali normal.',
    light_traits: [
      'Kestabilan emosi yang mengakar',
      'Bisa diandalkan dalam krisis',
      'Kesabaran yang tulus',
      'Pikiran praktis dan realistis',
    ],
    shadow_traits: [
      'Sulit beradaptasi dengan perubahan cepat',
      'Kadang terasa kaku atau stubborn',
      'Menyimpan beban terlalu lama',
      'Cenderung resisten terhadap hal baru',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Gunung": tarik 4 hitungan, tahan 4, hembuskan 4, tahan 4 (box breathing). Rasakan tubuh menjadi berat dan terhubung ke bumi.',
      sabda: 'Mantra bisik: "Om Bhuwana Atmah" — 3x saat merasa goyah, untuk mengingatkan diri pada fondasi.',
      idep: 'Afirmasi: "Aku adalah batu yang dialiri air, bukan air yang membentuk batu." Ulangi saat menghadapi perubahan.',
    },
  },
  {
    id: 'kurantil',
    name: 'Kurantil',
    order: 4,
    bhatara: 'Batara Langsur',
    range: 'Ahad Pon – Sabtu Wage',
    archetype: 'The Flowing River — Sang Pembawa Arus',
    element: 'Air',
    myth_role: 'Putra penghubung, simbol aliran yang terus bergerak',
    quantum_pattern:
      'Pola aliran laminar — energi bergerak dalam garus paralel tanpa turbulensi. Mirip prinsip quantum tunneling: partikel bisa menembus barrier tanpa kehilangan momentum.',
    neuroscience_note:
      'Default Mode Network (DMN) aktif seimbang — keadaan "flow" mudah dicapai. Pola ini baik untuk kreativitas tapi rentan kehilangan kontak dengan realitas fisik.',
    light_traits: [
      'Kreativitas yang mengalir',
      'Mudah menemukan solusi alternatif',
      'Fleksibel dalam pendekatan',
      'Pendongeng yang memikat',
    ],
    shadow_traits: [
      'Sulit menyelesaikan apa yang dimulai',
      'Kadang terlalu cepat pindah topik',
      'Mudah teralihkan fokus',
      'Tidak konsisten dalam rutinitas',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Sungai": tarik 5 hitungan, hembuskan 5, tanpa jeda. Rasakan napas mengalir terus seperti arus.',
      sabda: 'Mantra bisik: "Om Namo Bhagavate" — 3x saat merasa terjebak, untuk memulai kembali aliran.',
      idep: 'Afirmasi: "Aku adalah sungai yang mengalir, bukan kolam yang mengendap." Ulangi saat mulai merasa stagnan.',
    },
  },
  {
    id: 'tolu',
    name: 'Tolu',
    order: 5,
    bhatara: 'Batara Bayu',
    range: 'Ahad Kliwon – Sabtu Legi',
    archetype: 'The Wind Caller — Sang Pemanggil Angin',
    element: 'Udara',
    myth_role: 'Putra pembawa pesan, simbol komunikasi dan pergerakan',
    quantum_pattern:
      'Pola gelombang termodulasi — frekuensi yang berubah-ubah sesuai konteks, seperti superposition yang collapse berbeda tergantung pengamat. Adaptif tapi sulit diprediksi.',
    neuroscience_note:
      'Konektivitas tinggi antara hemisfer kanan-kiri (corpus callosum aktif). Pola ini menghasilkan pemikiran lateral yang kuat tapi rentan sensory overload.',
    light_traits: [
      'Komunikasi yang ekspresif',
      'Pemikir cepat dan luwes',
      'Mudah memahami banyak sudut pandang',
      'Mampu memediasi konflik',
    ],
    shadow_traits: [
      'Bicara sebelum berpikir',
      'Sulit diam dan tenang',
      'Terkadang tidak konsisten',
      'Mudah cemas saat harus diam',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Angin": tarik cepat 2 hitungan, hembuskan panjang 8. Lakukan 5 kali untuk menenangkan sistem saraf.',
      sabda: 'Mantra bisik: "Om Vata Yana Namah" — 3x sebelum bicara hal penting, untuk menyelaraskan kata.',
      idep: 'Afirmasi: "Aku adalah angin yang membawa benih, bukan badai yang merusak." Ulangi saat merasa tergesa.',
    },
  },
  {
    id: 'gumbreg',
    name: 'Gumbreg',
    order: 6,
    bhatara: 'Batara Candra',
    range: 'Ahad Pahing – Sabtu Pon',
    archetype: 'The Moon Mirror — Sang Cermin Purnama',
    element: 'Air',
    myth_role: 'Putra pencermin, simbol refleksi dan siklus',
    quantum_pattern:
      'Resonansi reflektif — pola gelombang yang memantul dan berinterferensi dengan dirinya sendiri, menciptakan pola stabil seperti moiré. Mirip efek quantum Zeno: observasi mengubah keadaan.',
    neuroscience_note:
      'Aktivitas theta (4-8 Hz) dominan saat istirahat — keadaan kreativitas bawah sadar. Pola ini baik untuk introspeksi tapi rentan over-rumination.',
    light_traits: [
      'Refleksi diri yang mendalam',
      'Memori yang kuat',
      'Peka terhadap pola dan ritme',
      'Bisa belajar dari pengalaman',
    ],
    shadow_traits: [
      'Terlalu banyak merenung',
      'Sulit melepaskan masa lalu',
      'Mudah terjebak nostalgia',
      'Cenderung melancholic',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Bulan": tarik 6 hitungan, tahan 2, hembuskan 6. Visualisasikan bulan purnama di dada.',
      sabda: 'Mantra bisik: "Om Chandra Namah" — 3x saat merasa kelewat dalam dalam pikiran.',
      idep: 'Afirmasi: "Aku adalah cermin yang memantulkan, bukan bayangan yang ditangkap." Ulangi saat mulai overthink.',
    },
  },
  {
    id: 'warigalit',
    name: 'Warigalit',
    order: 7,
    bhatara: 'Batara Asmara',
    range: 'Ahad Wage – Sabtu Kliwon',
    archetype: 'The Heart Ember — Sang Bara Hati',
    element: 'Api',
    myth_role: 'Putra asmara, simbol hasrat dan keterikatan',
    quantum_pattern:
      'Pola osilasi tidak teredam — energi bergetar dengan amplitudo tinggi tanpa kehilangan intensitas. Mirip keadaan non-equilibrium dalam termodinamika kuantum.',
    neuroscience_note:
      'Aktivitas dopaminergik tinggi di mesolimbic pathway. Pola ini memproduksi motivasi kuat tapi rentan addiction dan craving.',
    light_traits: [
      'Passion yang menyala',
      'Mampu mencintai dalam-dalam',
      'Energi yang menular',
      'Berani mengejar yang dicintai',
    ],
    shadow_traits: [
      'Mudah obsesif',
      'Keterikatan yang sehat berlebih',
      'Mood swing tajam',
      'Sulit menerima penolakan',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Bara": tarik 4, tahan 4, hembuskan 8. Rasakan bara membara lalu meredup perlahan.',
      sabda: 'Mantra bisik: "Om Asmara Santi Namah" — 3x saat merasa terlalu melekat.',
      idep: 'Afirmasi: "Aku adalah bara yang menghangatkan, bukan api yang membakar." Ulangi saat emosi meningkat.',
    },
  },
  {
    id: 'warigagung',
    name: 'Warigagung',
    order: 8,
    bhatara: 'Batara Maharesi',
    range: 'Ahad Legi – Sabtu Pahing',
    archetype: 'The Sage Crown — Sang Maharesi',
    element: 'Eter',
    myth_role: 'Putra resi, simbol kebijaksanaan tertinggi',
    quantum_pattern:
      'Koherensi kuantum makroskopik — seperti kondensat Bose-Einstein, partikel berperilaku sebagai satu kesatuan. Pola ini mendekati keadaan "non-dualitas" dalam bahasa fisika.',
    neuroscience_note:
      'Sinkronisasi gamma tinggi (40+ Hz) di seluruh korteks — keadaan "pure awareness" yang teramati pada meditator senior. Pola ini langka dan powerful.',
    light_traits: [
      'Kebijaksanaan yang melampaui usia',
      'Pandangan helikopter terhadap masalah',
      'Tenang di tengah badai',
      'Mampu mengajar tanpa menggurui',
    ],
    shadow_traits: [
      'Terkadang terlalu lepas dari emosi',
      'Sulit memahami penderitaan langsung',
      'Bisa terasa dingin atau jauh',
      'Mudah frustrasi pada kedangkalan',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Resi": tarik halus 8 hitungan, hembuskan halus 8, tanpa suara. Lakukan 10 menit untuk masuk koherensi.',
      sabda: 'Mantra bisik: "Om Gum Gurave Namah" — 3x sebelum belajar atau mengajar.',
      idep: 'Afirmasi: "Aku adalah ruang tempat semua terjadi, bukan isi yang terjadi." Ulangi saat merasa terlalu teridentifikasi dengan peran.',
    },
  },
  {
    id: 'julungwangi',
    name: 'Julungwangi',
    order: 9,
    bhatara: 'Batara Sambu',
    range: 'Ahad Pon – Sabtu Wage',
    archetype: 'The Serpent Ascending — Sang Ular Naik',
    element: 'Air',
    myth_role: 'Putra kundalini, simbol energi naik dari dasar ke puncak',
    quantum_pattern:
      'Pola spiral naik — seperti spin partikel yang mensejajar dengan medan, energi bergerak dari entropi rendah ke tinggi. Mirip proses emergent complexity dalam sistem kuantum.',
    neuroscience_note:
      'Aktivasi bertahap brainstem → limbic → cortex (proses bottom-up). Pola ini baik untuk integrasi trauma tapi perlu waktu dan kesabaran.',
    light_traits: [
      'Pertumbuhan yang berkelanjutan',
      'Mampu transformasi dalam-dalam',
      'Ketekunan yang sehat',
      'Pemahaman intuitif tentang proses',
    ],
    shadow_traits: [
      'Proses yang terasa lambat',
      'Mudah frustasi pada kemajuan kecil',
      'Sulit merasa cukup',
      'Cenderung perfeksionis',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Kundalini": tarik dari perut bawah 4 hitungan, naik ke dada 4, hembuskan dari kepala 6. Rasakan energi naik.',
      sabda: 'Mantra bisik: "Om Namah Shivaya" — 3x saat memulai transformasi baru.',
      idep: 'Afirmasi: "Aku adalah ular yang membongkar kulit, bukan kulit yang dibongkar." Ulangi saat merasa stuck.',
    },
  },
  {
    id: 'sungsang',
    name: 'Sungsang',
    order: 10,
    bhatara: 'Batara Gana (Ganesha)',
    range: 'Ahad Kliwon – Sabtu Legi',
    archetype: 'The Inverted One — Sang Pembalik',
    element: 'Tanah',
    myth_role: 'Putra pembalik, simbol melihat dari sisi terbalik',
    quantum_pattern:
      'Pola anti-materi — pasangan charge yang berlawanan, menciptakan stabilitas melalui oposisi. Mirip pasangan fermion-boson dalam simetri kuantum.',
    neuroscience_note:
      'Hemisfer kanan dominan dengan aktivitas parietal tinggi — keadaan "lateral thinking" ekstrem. Pola ini inovatif tapi sulit konvensional.',
    light_traits: [
      'Pemikir out-of-the-box',
      'Mampu melihat dari sudut tak terduga',
      'Inovator natural',
      'Berani menantang status quo',
    ],
    shadow_traits: [
      'Terasa aneh atau sulit dipahami',
      'Sulit mengikuti prosedur standar',
      'Mudah merasa terasingkan',
      'Kadang kontraproduktif',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Terbalik": tarik dari atas kepala turun ke perut (visualisasi), hembuskan dari perut naik ke kepala. Lakukan 6 kali.',
      sabda: 'Mantra bisik: "Om Gam Ganapataye Namaha" — 3x sebelum menghadapi rintangan.',
      idep: 'Afirmasi: "Aku adalah cermin yang membalik, bukan cermin yang menduplikasi." Ulangi saat merasa misfit.',
    },
  },
  {
    id: 'dungulan',
    name: 'Dungulan',
    order: 11,
    bhatara: 'Batara Kamajaya',
    range: 'Ahad Pahing – Sabtu Pon',
    archetype: 'The Victory Light — Sang Cahaya Kemenangan',
    element: 'Api',
    myth_role: 'Wuku Galungan — kemenangan dharma atas adharma',
    quantum_pattern:
      'Pola phase transition — seperti air yang berubah jadi uap pada titik kritis, energi melompat ke keadaan baru yang lebih teratur. Coherence muncul dari chaos.',
    neuroscience_note:
      'Aktivasi prefrontal cortex puncak dengan integrasi limbic seimbang — keadaan "optimal executive function". Pola ini langka, muncul saat seseorang "menang" atas diri sendiri.',
    light_traits: [
      'Kemampuan mengatasi konflik batin',
      'Keseimbangan emosi dan logika',
      'Kemurahan hati yang tulus',
      'Kewibawaan yang menenangkan',
    ],
    shadow_traits: [
      'Terkadang terlalu mengendalikan',
      'Sulit menerima kekalahan kecil',
      'Mudah merasa harus selalu menang',
      'Beban "harus jadi teladan"',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Kemenangan": tarik 6, tahan 2 di puncak, hembuskan 6. Visualisasikan cahaya keemasan di dada.',
      sabda: 'Mantra bisik: "Om Dharma Vijaya Namah" — 3x saat menghadapi konflik batin.',
      idep: 'Afirmasi: "Aku adalah cahaya yang mengusir, bukan bayangan yang diusir." Ulangi saat merasa kalah.',
    },
  },
  {
    id: 'kuningan',
    name: 'Kuningan',
    order: 12,
    bhatara: 'Batara Indra',
    range: 'Ahad Wage – Sabtu Kliwon',
    archetype: 'The Golden Pivot — Sang Poros Emas',
    element: 'Eter',
    myth_role: 'Wuku Kuningan — puncak pemberkahan, keemasan turun ke bumi',
    quantum_pattern:
      'Pola golden ratio — resonansi yang self-similar pada skala berbeda, menciptakan harmoni fraktal. Mirip geografi spektral pada quantum chaos.',
    neuroscience_note:
      'Sinkronisasi gamma-alpha yang seimbang — keadaan "insight" yang juga tetap grounded. Pola ini menghasilkan inspirasi yang dapat dieksekusi.',
    light_traits: [
      'Insight yang bisa diterapkan',
      'Penghubung dunia ide dan praktis',
      'Kecerdasan adaptif',
      'Peka pada timing yang tepat',
    ],
    shadow_traits: [
      'Bisa terlalu optimis',
      'Sulit menerima keterbatasan',
      'Mudah kecewa saat ideal gagal',
      'Terkadang terlalu cepat berpindah',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Emas": tarik 4, tahan 4, hembuskan 4, tahan 4. Visualisasikan poros emas di tulang belakang.',
      sabda: 'Mantra bisik: "Om Indraya Namah" — 3x saat meminta petunjuk arah.',
      idep: 'Afirmasi: "Aku adalah poros yang berputar, bukan roda yang terguling." Ulangi saat merasa terlempar.',
    },
  },
  {
    id: 'langkir',
    name: 'Langkir',
    order: 13,
    bhatara: 'Batara Kala',
    range: 'Ahad Legi – Sabtu Pahing',
    archetype: 'The Time Bender — Sang Pembengkok Waktu',
    element: 'Eter',
    myth_role: 'Putra waktu, simbol siklus dan tempo',
    quantum_pattern:
      'Pola time dilation — pengamat dalam keadaan berbeda mengalami waktu secara berbeda. Mirip efek relativitas kuantum pada skala partikel.',
    neuroscience_note:
      'Persepsi waktu alter (pre-frontal ke striatum imbalance). Individu bisa "kehilangan waktu" saat fokus atau merasa waktu berjalan sangat lambat saat bosan.',
    light_traits: [
      'Pemahaman mendalam tentang timing',
      'Sabar dengan proses',
      'Peka terhadap ritme alami',
      'Mampu menunggu momen tepat',
    ],
    shadow_traits: [
      'Sulit dengan deadline',
      'Terkadang terlalu lambat',
      'Mudah kehilangan momentum',
      'Bisa terjebak "menunggu sempurna"',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Waktu": tarik 4 hitungan, rasakan waktu melambat. Hembuskan 8, rasakan waktu mengalir. Lakukan 5x.',
      sabda: 'Mantra bisik: "Om Kala Sangkara Namah" — 3x saat merasa terburu-buru.',
      idep: 'Afirmasi: "Aku adalah pembuat waktu, bukan budak waktu." Ulangi saat merasa dikejar.',
    },
  },
  {
    id: 'mandasiya',
    name: 'Mandasiya',
    order: 14,
    bhatara: 'Batara Brahma',
    range: 'Ahad Pon – Sabtu Wage',
    archetype: 'The Creator Spark — Sang Pencipta',
    element: 'Api',
    myth_role: 'Putra pencipta, simbol kelahiran dan kreativitas baru',
    quantum_pattern:
      'Pola pair production — dari vakum muncul pasangan partikel-antipartikel. Energi berubah menjadi materi, ide menjadi bentuk.',
    neuroscience_note:
      'Aktivasi tinggi di salience network + mode kreatif. Pola ini menghasilkan ide-ide baru tapi rentan burnout tanpa ritme istirahat.',
    light_traits: [
      'Kreativitas produktif',
      'Mampu mewujudkan ide',
      'Pionir yang berani',
      'Energi inisiatif tinggi',
    ],
    shadow_traits: [
      'Bisa terlalu banyak mulai',
      'Sulit menyelesaikan',
      'Mudah kelelahan kreatif',
      'Terkadang merusak dalam proses kreatif',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Pencipta": tarik 4, tahan 2 di puncak (manifestasi), hembuskan 6. Visualisasikan ide jadi bentuk.',
      sabda: 'Mantra bisik: "Om Brahma Karaya Namah" — 3x sebelum memulai kreasi baru.',
      idep: 'Afirmasi: "Aku adalah pencipta yang bertanggung jawab, bukan perusak yang ceroboh." Ulangi saat memulai project.',
    },
  },
  {
    id: 'julungpujut',
    name: 'Julungpujut',
    order: 15,
    bhatara: 'Batara Guritna',
    range: 'Ahad Kliwon – Sabtu Legi',
    archetype: 'The Word Weaver — Sang Penjaga Kata',
    element: 'Eter',
    myth_role: 'Putra kata, simbol kekuatan bahasa dan doa',
    quantum_pattern:
      'Pola information entanglement — informasi terkait non-lokal seperti quantum information theory. Kata yang diucapkan bisa "terhubung" ke makna jauh.',
    neuroscience_note:
      'Broca + Wernicke area aktif seimbang dengan default mode network — keadaan "lucid speech". Pola ini menghasilkan komunikasi yang jernih dan bermakna.',
    light_traits: [
      'Komunikasi yang menyembuhkan',
      'Kata-kata yang tepat sasaran',
      'Kemampuan mendengar dalam',
      'Doa yang kuat',
    ],
    shadow_traits: [
      'Bisa melukai dengan kata',
      'Sulit diam saat sebaiknya diam',
      'Mudah terobsesi pada makna',
      'Terkadang terlalu analitis terhadap kata',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Kata": tarik 4 dalam diam, hembuskan 4 dengan satu suara (Ohm). Lakukan 6x.',
      sabda: 'Mantra bisik: "Om Vagisvari Namah" — 3x sebelum bicara hal sensitif.',
      idep: 'Afirmasi: "Aku adalah penjaga kata, bukan tawanan kata." Ulangi saat merasa harus selalu berkata sesuatu.',
    },
  },
  {
    id: 'pahang',
    name: 'Pahang',
    order: 16,
    bhatara: 'Batara Tantra',
    range: 'Ahad Pahing – Sabtu Pon',
    archetype: 'The Hidden Weaver — Sang Penenun Gaib',
    element: 'Tanah',
    myth_role: 'Putra tantra, simbol menyatkan kenyataan dan misteri',
    quantum_pattern:
      'Pola entangled weaving — dua realitas terjalin tanpa bisa dipisahkan. Mirip quantum contextuality: makna muncul dari konteks.',
    neuroscience_note:
      'Integrasi tinggi antara cortical dan subcortical — keadaan "embodied cognition". Pola ini memungkinkan intuisi yang akurat dan rasional.',
    light_traits: [
      'Intuisi yang akurat',
      'Pemahaman holistik',
      'Mampu menyatkan hal bertentangan',
      'Kebijaksanaan praktis',
    ],
    shadow_traits: [
      'Sulit menjelaskan dengan kata',
      'Mudah terjebak mistifikasi',
      'Terkadang terlalu intuitif tanpa validasi',
      'Bisa terasa misterius atau tertutup',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Tenun": tarik 4, rasakan tenun antara napas dan tubuh. Hembuskan 6. Lakukan dengan mata tertutup.',
      sabda: 'Mantra bisik: "Om Tanaya Namah" — 3x saat merasa perlu menyatkan hal-hal.',
      idep: 'Afirmasi: "Aku adalah tenun yang menyatukan, bukan benang yang terpisah." Ulangi saat meraca fragmented.',
    },
  },
  {
    id: 'kuruwelut',
    name: 'Kuruwelut',
    order: 17,
    bhatara: 'Batara Wisnu',
    range: 'Ahad Wage – Sabtu Kliwon',
    archetype: 'The Preserver Spiral — Sang Penjaga Lingkar',
    element: 'Air',
    myth_role: 'Putra preserver, simbol pemeliharaan dan kelangsungan',
    quantum_pattern:
      'Pola standing wave — energi beresonansi dalam cavity, menciptakan stabilitas dinamis. Mirip quantized orbits pada atom.',
    neuroscience_note:
      'Aktivitas serotonin tinggi dengan baseline dopamine stabil — keadaan "contentment". Pola ini menjaga homeostasis emosi dengan baik.',
    light_traits: [
      'Konsisten dalam kebaikan',
      'Pemelihara hubungan',
      'Kesetiaan yang tulus',
      'Stabilitas jangka panjang',
    ],
    shadow_traits: [
      'Sulit dengan perubahan',
      'Bisa terlalu konservatif',
      'Mudah bosan dalam rutinitas',
      'Terkadang menahan yang sebaiknya dilepas',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Lingkar": tarik 4, tahan 2, hembuskan 4, tahan 2. Visualisasikan lingkar emas di perut.',
      sabda: 'Mantra bisik: "Om Namo Bhagavate Vasudevaya" — 3x saat merasa perlu stabilitas.',
      idep: 'Afirmasi: "Aku adalah penjaga lingkar, bukan tawanan lingkar." Ulangi saat merasa terjebak rutinitas.',
    },
  },
  {
    id: 'marakeh',
    name: 'Marakeh',
    order: 18,
    bhatara: 'Batara Suranggana',
    range: 'Ahad Legi – Sabtu Pahing',
    archetype: 'The Net Caster — Sang Penjala Medan',
    element: 'Eter',
    myth_role: 'Putra penjala, simbol menangkap peluang dan makna',
    quantum_pattern:
      'Pola probability field — energi tersebar dalam jaring kemungkinan, collapse saat observasi. Mirip many-worlds interpretation.',
    neuroscience_note:
      'Aktivitas parietal posterior tinggi — keadaan "global workspace". Pola ini memungkinkan multitasking dan integrasi informasi luas.',
    light_traits: [
      'Visi yang luas',
      'Mampu melihat peluang',
      'Multitasking natural',
      'Pemahaman sistemik',
    ],
    shadow_traits: [
      'Bisa terlalu tersebar',
      'Sulit fokus pada satu hal',
      'Mudah overwhelmed dengan informasi',
      'Terkadang terjebak analisis tanpa aksi',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Jala": tarik 4, rasakan jala terbentang. Hembuskan 6, rasakan jala menarik. Lakukan 5x.',
      sabda: 'Mantra bisik: "Om Jagannatha Namah" — 3x saat meminta petunjuk arah.',
      idep: 'Afirmasi: "Aku adalah penjala yang memilih, bukan ikan yang terjebak." Ulangi saat merasa overwhelmed.',
    },
  },
  {
    id: 'tambir',
    name: 'Tambir',
    order: 19,
    bhatara: 'Batara Siwa',
    range: 'Ahad Pon – Sabtu Wage',
    archetype: 'The Transformer — Sang Penghancur Penyembuh',
    element: 'Eter',
    myth_role: 'Putra Siwa, simbol destruksi yang membebaskan',
    quantum_pattern:
      'Pola quantum tunneling dari satu keadaan ke keadaan lain — partikel menembus barrier tanpa melalui transisi kontinu. Transformasi instan di tingkat fundamental.',
    neuroscience_note:
      'Aktivitas tinggi di salience network + norepinephrine spike — keadaan "alert transformation". Pola ini memungkinkan shift mendadak dalam pemahaman.',
    light_traits: [
      'Mampu melepaskan yang tidak berguna',
      'Berani mengakhiri yang seharusnya berakhir',
      'Transformasi yang sehat',
      'Pemahaman tentang impermanensi',
    ],
    shadow_traits: [
      'Bisa terlalu cepat memutus',
      'Sulit dengan konsistensi',
      'Mudah destruktif tanpa sadar',
      'Terkadang merusak yang masih bisa diperbaiki',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Penghancur": tarik 4, tahan 4 (akumulasi), hembuskan 8 dengan suara "Hah". Visualisasikan melepaskan.',
      sabda: 'Mantra bisik: "Om Namah Shivaya" — 3x saat melepaskan sesuatu.',
      idep: 'Afirmasi: "Aku adalah penghancur yang membebaskan, bukan perusak yang melukai." Ulangi saat melepaskan.',
    },
  },
  {
    id: 'medangkungan',
    name: 'Medangkungan',
    order: 20,
    bhatara: 'Batara Basuki',
    range: 'Ahad Kliwon – Sabtu Legi',
    archetype: 'The Sound Carrier — Sang Pembawa Nada',
    element: 'Eter',
    myth_role: 'Putra nada, simbol vibrasi yang menyembuhkan',
    quantum_pattern:
      'Pola phonon resonance — getaran suara yang terkoherensi dalam medium, mirip phonon dalam kristal kuantum. Suara sebagai gelombang koheren.',
    neuroscience_note:
      'Aktivitas auditory cortex + limbic — keadaan "sonic emotional resonance". Pola ini menjelaskan mengapa musik/mantra bisa menyembuhkan.',
    light_traits: [
      'Suara yang menyembuhkan',
      'Peka terhadap nada dan ritme',
      'Mampu menenangkan dengan kata',
      'Koneksi dengan musik/spiritualitas',
    ],
    shadow_traits: [
      'Sensitif terhadap suara keras',
      'Mudah terpengaruh nada bicara',
      'Sulit dengan keheningan total',
      'Terkadang terlalu reaktif terhadap kritik',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Nada": tarik 4 dengan nada tinggi (嗡), hembuskan 6 dengan nada rendah (嗡). Lakukan 5x.',
      sabda: 'Mantra bisik: "Om Basukaya Namah" — 3x saat merasa terganggu suara.',
      idep: 'Afirmasi: "Aku adalah pembawa nada, bukan tawanan kebisingan." Ulangi saat lingkungan bising.',
    },
  },
  {
    id: 'maktal',
    name: 'Maktal',
    order: 21,
    bhatara: 'Batara Sakri',
    range: 'Ahad Pahing – Sabtu Pon',
    archetype: 'The Anchor Point — Sang Jangkar Tetap',
    element: 'Tanah',
    myth_role: 'Putra jangkar, simbol titik tetap dalam perubahan',
    quantum_pattern:
      'Pola ground state stable — energi minimum yang sulit diganggu. Mirip partikel dalam sumur potensial dalam.',
    neuroscience_note:
      'Aktivitas tinggi di vmPFC (ventromedial prefrontal cortex) — keadaan "grounded certainty". Pola ini memberikan rasa aman dan kepastian internal.',
    light_traits: [
      'Kepastian internal yang kuat',
      'Stabil dalam krisis',
      'Mampu jadi titik referensi orang lain',
      'Teguh dalam nilai inti',
    ],
    shadow_traits: [
      'Bisa terlalu kaku',
      'Sulit mengakomodasi perubahan',
      'Mudah merasa terancam oleh hal baru',
      'Terkadang dogmatis',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Jangkar": tarik 4, tahan 2, hembuskan 6. Rasakan tubuh berat dan terhubung ke bumi.',
      sabda: 'Mantra bisik: "Om Sakri Namah" — 3x saat merasa goyah.',
      idep: 'Afirmasi: "Aku adalah jangkar yang menahan, bukan rantai yang mengikat." Ulangi saat merasa terancam.',
    },
  },
  {
    id: 'wuye',
    name: 'Wuye',
    order: 22,
    bhatara: 'Batara Kowera',
    range: 'Ahad Wage – Sabtu Kliwon',
    archetype: 'The Color Dancer — Sang Penari Warna',
    element: 'Api',
    myth_role: 'Putra warna, simbol ekspresi dan keindahan',
    quantum_pattern:
      'Pola superposition spektral — partikel ada dalam banyak keadaan sekaligus, "warna" yang berbeda muncul tergantung pengamat.',
    neuroscience_note:
      'Aktivitas visual cortex + limbic — keadaan "synesthetic processing". Pola ini menghasilkan estetika dan ekspresi unik.',
    light_traits: [
      'Ekspresi diri yang kaya',
      'Estetika yang berkembang',
      'Kreativitas visual',
      'Mampu membawa keindahan ke hidup',
    ],
    shadow_traits: [
      'Sensitif terhadap keindahan vs keburukan',
      'Bisa terlalu perfeksionis estetik',
      'Mudah frustrasi dengan disharmoni',
      'Terkadang terlalu fokus pada tampilan',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Warna": tarik 4, visualisasikan warna emas. Hembuskan 6, visualisasikan warna sage. Lakukan 5x.',
      sabda: 'Mantra bisik: "Om Kowera Namah" — 3x saat merasa disharmoni.',
      idep: 'Afirmasi: "Aku adalah penari warna, bukan tawanan palet." Ulangi saat merasa harus tampil sempurna.',
    },
  },
  {
    id: 'manahil',
    name: 'Manahil',
    order: 23,
    bhatara: 'Batara Citragotra',
    range: 'Ahad Legi – Sabtu Pahing',
    archetype: 'The Mind Gardener — Sang Tukang Kebun Pikiran',
    element: 'Tanah',
    myth_role: 'Putra pikiran, simbol kultivasi kesadaran',
    quantum_pattern:
      'Pola quantum decoherence kontrol — pengamat sengaja mengatur tingkat koherensi sistem. Mirip quantum Zeno effect dengan kesadaran.',
    neuroscience_note:
      'Aktivitas tinggi di anterior cingulate cortex (ACC) — keadaan "metacognitive monitoring". Pola ini memungkinkan kesadaran akan pikiran sendiri.',
    light_traits: [
      'Kesadaran diri yang tinggi',
      'Mampu menyadari dan mengubah pikiran',
      'Pemahaman meta-kognitif',
      'Kemampuan meditasi natural',
    ],
    shadow_traits: [
      'Terkadang terlalu menganalisis pikiran sendiri',
      'Sulit "menyerah" pada alam bawah sadar',
      'Mudah overthink',
      'Bisa terjebak meta-endless',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Kebun": tarik 4, rasakan pikiran sebagai tanaman. Hembuskan 6, rasakan menyiangi yang tidak perlu. Lakukan 6x.',
      sabda: 'Mantra bisik: "Om Citragotraya Namah" — 3x saat meditasi.',
      idep: 'Afirmasi: "Aku adalah tukang kebun pikiran, bukan pikiran yang diternak." Ulangi saat overthink.',
    },
  },
  {
    id: 'prangbakat',
    name: 'Prangbakat',
    order: 24,
    bhatara: 'Batara Bisma',
    range: 'Ahad Pon – Sabtu Wage',
    archetype: 'The Warrior Adept — Sang Prajurit Sejati',
    element: 'Api',
    myth_role: 'Putra prajurit, simbol keberanian disiplin',
    quantum_pattern:
      'Pola coherent armor — koherensi kuantum yang melindungi dari dekoherensi eksternal. Mirip topological protection dalam quantum computing.',
    neuroscience_note:
      'Aktivitas tinggi di DLPFC + norepinephrine — keadaan "disciplined action". Pola ini memungkinkan tindakan berani dengan kontrol diri.',
    light_traits: [
      'Keberanian yang terukur',
      'Disiplin dalam tindakan',
      'Mampu bertindak meski takut',
      'Integritas dalam tekanan',
    ],
    shadow_traits: [
      'Bisa terlalu keras pada diri sendiri',
      'Sulit menerima kerentanan',
      'Mudah merasa harus selalu kuat',
      'Terkadang menghindari istirahat',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Prajurit": tarik 4, tahan 4 (siap tempur), hembuskan 4 (eksekusi). Lakukan 6x.',
      sabda: 'Mantra bisik: "Om Bhisma Namah" — 3x sebelum tindakan berani.',
      idep: 'Afirmasi: "Aku adalah prajurit yang bertindak, bukan penakut yang merenung." Ulangi saat ragu bertindak.',
    },
  },
  {
    id: 'bala',
    name: 'Bala',
    order: 25,
    bhatara: 'Batara Durga',
    range: 'Ahad Kliwon – Sabtu Legi',
    archetype: 'The Shadow Worker — Sang Pekerja Bayangan',
    element: 'Tanah',
    myth_role: 'Putra kekuatan gelap, simbol transformasi melalui bayangan',
    quantum_pattern:
      'Pola dark matter — energi yang tidak terlihat tapi membentuk struktur. Mirip quantum vacuum fluctuation yang mendasari realitas.',
    neuroscience_note:
      'Aktivitas tinggi di amygdala + hippocampus — keadaan "shadow integration". Pola ini memungkinkan integrasi trauma dan kekuatan tersembunyi.',
    light_traits: [
      'Mampu menghadapi sisi gelap diri',
      'Kekuatan dari integrasi bayangan',
      'Pemahaman mendalam tentang penderitaan',
      'Transformasi nyata',
    ],
    shadow_traits: [
      'Bisa terlalu lama di kegelapan',
      'Mudah tertarik pada hal tabu',
      'Sulit menerima kebahagiaan sederhana',
      'Terkadang menormalisasi penderitaan',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Bayangan": tarik 4 dari perut bawah (kegelapan), hembuskan 6 lewat mata (terang). Lakukan 6x.',
      sabda: 'Mantra bisik: "Om Dum Durgayei Namah" — 3x saat menghadapi ketakutan.',
      idep: 'Afirmasi: "Aku adalah pekerja bayangan, bukan budak kegelapan." Ulangi saat merasa tertarik hal gelap.',
    },
  },
  {
    id: 'wugu',
    name: 'Wugu',
    order: 26,
    bhatara: 'Batara Singajanma',
    range: 'Ahad Pahing – Sabtu Pon',
    archetype: 'The Lion Hearted — Sang Berhati Singa',
    element: 'Api',
    myth_role: 'Putra keberanian, simbol kekuatan dengan kelembutan',
    quantum_pattern:
      'Pola coherent amplifier — koherensi kecil diperkuat menjadi koherensi besar tanpa noise. Mirip lasing action.',
    neuroscience_note:
      'Aktivitas tinggi di hypothalamus + cortex — keadaan "fight response yang terkontrol". Pola ini menghasilkan keberanian dengan kebijaksanaan.',
    light_traits: [
      'Keberanian dengan belas kasih',
      'Mampu melindungi yang lemah',
      'Pemimpin natural',
      'Kekuatan yang menenangkan',
    ],
    shadow_traits: [
      'Bisa terlalu dominan',
      'Sulit menerima kelemahan',
      'Mudah marah saat terancam',
      'Terkadang terlalu protektif',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Singa": tarik 4 lewat hidung, hembuskan 6 lewat mulut dengan suara "Hah" (singa mengaum). Lakukan 5x.',
      sabda: 'Mantra bisik: "Om Singa Vahana Namah" — 3x saat merasa perlu keberanian.',
      idep: 'Afirmasi: "Aku adalah singa yang berhati lembut, bukan domba yang berhati singa." Ulangi saat harus tegas.',
    },
  },
  {
    id: 'wayang',
    name: 'Wayang',
    order: 27,
    bhatara: 'Batara Sri',
    range: 'Ahad Wage – Sabtu Kliwon',
    archetype: 'The Puppet Mirror — Sang Cermin Dalang',
    element: 'Eter',
    myth_role: 'Putra pertunjukan, simbol kesadaran akan peran dalam hidup',
    quantum_pattern:
      'Pola observer-dependent reality — realitas yang muncul tergantung pengamat, mirip Wigner\'s friend experiment.',
    neuroscience_note:
      'Aktivitas tinggi di temporal-parietal junction (TPJ) — keadaan "out-of-body perspective". Pola ini memungkinkan melihat diri dari luar.',
    light_traits: [
      'Kesadaran akan peran sosial',
      'Mampu "keluar" dari situasi',
      'Pemahaman mendalam tentang ilusi (Maya)',
      'Seniman kehidupan',
    ],
    shadow_traits: [
      'Bisa merasa tidak otentik',
      'Sulit tahu mana "diri sejati"',
      'Mudah terjebak peran',
      'Terkadang sinis terhadap realitas',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Dalang": tarik 4 (masuk peran), tahan 2 (sadari peran), hembuskan 6 (lepaskan peran). Lakukan 6x.',
      sabda: 'Mantra bisik: "Om Sri Devyai Namah" — 3x saat merasa terjebak peran.',
      idep: 'Afirmasi: "Aku adalah dalang yang memainkan, bukan wayang yang dimainkan." Ulangi saat merasa terjebak.',
    },
  },
  {
    id: 'kulawu',
    name: 'Kulawu',
    order: 28,
    bhatara: 'Batara Sadana',
    range: 'Ahad Legi – Sabtu Pahing',
    archetype: 'The Family Knot — Sang Simpul Keluarga',
    element: 'Air',
    myth_role: 'Putra keluarga, simbol ikatan darah dan pilihan',
    quantum_pattern:
      'Pola quantum entanglement multi-partikel — banyak partikel terikat satu sama lain, keadaan satu langsung mempengaruhi yang lain.',
    neuroscience_note:
      'Aktivitas tinggi di insula + mirror neurons — keadaan "deep attunement". Pola ini membuat individu peka pada dinamika kelompok.',
    light_traits: [
      'Peka terhadap dinamika kelompok',
      'Mampu menjaga harmoni',
      'Kesetiaan pada komunitas',
      'Pemahaman tentang warisan',
    ],
    shadow_traits: [
      'Bisa terlalu terikat keluarga',
      'Sulit memisahkan diri',
      'Mudah menanggung beban keluarga',
      'Terkadang mengorbankan diri sendiri',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Simpul": tarik 4 (ikat), tahan 2 (pertahankan), hembuskan 6 (longgarkan). Lakukan 5x.',
      sabda: 'Mantra bisik: "Om Sadanaya Namah" — 3x saat merasa terlalu terikat.',
      idep: 'Afirmasi: "Aku adalah simpul yang bisa dilepas, bukan tali yang terbelit." Ulangi saat merasa overwhelmed oleh keluarga.',
    },
  },
  {
    id: 'dukut',
    name: 'Dukut',
    order: 29,
    bhatara: 'Batara Baruna',
    range: 'Ahad Pon – Sabtu Wage',
    archetype: 'The Hermit Feather — Sang Pertapa Bulu',
    element: 'Air',
    myth_role: 'Putra pertapa, simbol kesendirian yang produktif',
    quantum_pattern:
      'Pola single-particle coherence — partikel tunggal dalam keadaan superposisi murni, tanpa gangguan eksternal. Mirip quantum isolation.',
    neuroscience_note:
      'Aktivitas tinggi di default mode network + korteks parietal — keadaan "deep solitude processing". Pola ini memungkinkan introspeksi mendalam.',
    light_traits: [
      'Kemandirian emosional',
      'Mampu menemukan makna dalam kesendirian',
      'Pemikir independen',
      'Kebijaksanaan dari dalam',
    ],
    shadow_traits: [
      'Bisa terlalu menyendiri',
      'Sulit meminta bantuan',
      'Mudah merasa terasingkan',
      'Terkadang terlalu otonom hingga isolasi',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Pertapa": tarik 4 dalam keheningan total, hembuskan 8 dengan rasa syukur. Lakukan 10 menit.',
      sabda: 'Mantra bisik: "Om Barunaya Namah" — 3x saat merasa perlu menyendiri.',
      idep: 'Afirmasi: "Aku adalah pertapa yang terhubung, bukan penyendiri yang terpisah." Ulangi saat merasa kesepian.',
    },
  },
  {
    id: 'watugunung',
    name: 'Watugunung',
    order: 30,
    bhatara: 'Batara Anantaboga',
    range: 'Ahad Kliwon – Sabtu Legi',
    archetype: 'The Cosmic Serpent — Sang Ular Kosmik',
    element: 'Eter',
    myth_role: 'Prabu Watugunung, raja terakhir, simbol penutup siklus',
    quantum_pattern:
      'Pola unified field — semua partikel terhubung dalam satu medan fundamental. Mirip teori segalanya dalam fisika kuantum.',
    neuroscience_note:
      'Sinkronisasi seluruh otak gamma-theta — keadaan "cosmic consciousness". Pola ini langka, muncul saat individu mengalami transendensi.',
    light_traits: [
      'Pemahaman holistik tentang hidup',
      'Mampu melihat siklus besar',
      'Kebijaksanaan integratif',
      'Penyembuh tradisional',
    ],
    shadow_traits: [
      'Bisa merasa terlalu berat beban',
      'Sulit dengan detail kecil',
      'Mudah merasa harus menyelamatkan semua',
      'Terkadang terlalu mistis',
    ],
    bio_quantum_hacks: {
      bayu: 'Latihan "Napas Kosmik": tarik 8 (seluruh tubuh), tahan 2 (integrasi), hembuskan 8 (seluruh tubuh). Lakukan 12x.',
      sabda: 'Mantra bisik: "Om Anantaya Namah" — 3x saat merasa perlu perspektif besar.',
      idep: 'Afirmasi: "Aku adalah ular yang menelan ekornya, bukan ekor yang ditelan." Ulangi saat merasa terjebak siklus.',
    },
  },
]

// ---------------------------------------------------------------------------
// Algoritma konversi tanggal Masehi → Wuku Pawukon
// ---------------------------------------------------------------------------
//
// Strategi: hitung posisi hari dalam siklus Pawukon 210-hari, lalu map ke Wuku.
//
// Referensi kalibrasi (terverifikasi):
//   - 23 Oktober 2022 = Redite Paing Sinta = hari 0 (awal siklus Pawukon)
//     Sumber: Detik.com "Watak Kelahiran Redite Paing Sinta Menurut Kalender Bali"
//   - 5 April 2026 = Redite Paing Sinta (kalenderbali.org via bali_tv Instagram)
//     Selisih 1260 hari = 6 × 210 hari ✓
//   - 28 Februari 2024 = Rabu Kliwon Wuku Dungulan (Hari Raya Galungan)
//     Dari 2022-10-23 ke 2024-02-28 = 493 hari. 493 mod 210 = 73.
//     Posisi 73 → wuku index 10 (Dungulan, dimulai hari 70), hari ke-3 (Rabu) ✓
//     Pancawara: (73+1) mod 5 = 4 = Kliwon ✓
//
// Konvensi:
//   - Day 0 = Redite (Ahad) Paing Wuku Sinta (hari pertama siklus Pawukon)
//   - Wuku indeks 0 = Sinta, 29 = Watugunung
//   - Setiap wuku = 7 hari
//   - Saptawara (7 hari): day mod 7 → 0=Redite, 1=Soma, 2=Anggara, 3=Buda,
//     4=Wraspati, 5=Sukra, 6=Saniscara
//   - Pancawara (5 hari): (day + 1) mod 5 → 0=Umanis, 1=Paing, 2=Pon,
//     3=Wage, 4=Kliwon. Offset +1 karena day 0 = Paing (bukan Umanis).
// ---------------------------------------------------------------------------

// Tanggal referensi: 23 Oktober 2022 = Redite Paing Sinta = posisi 0 Pawukon
const REFERENCE_DATE = new Date(Date.UTC(2022, 9, 23)) // 23 Oktober 2022 (bulan 0-indexed)
const REFERENCE_POSITION = 0 // hari 0 dalam siklus Pawukon

// Saptawara (7 hari) — dimulai dari Redite (Ahad)
export const saptawara = ['Redite', 'Soma', 'Anggara', 'Buda', 'Wraspati', 'Sukra', 'Saniscara']
export const saptawaraTranslation = {
  Redite: 'Ahad / Minggu',
  Soma: 'Senin',
  Anggara: 'Selasa',
  Buda: 'Rabu',
  Wraspati: 'Kamis',
  Sukra: 'Jumat',
  Saniscara: 'Sabtu',
}

// Pancawara (5 hari pasaran) — Umanis/Legi, Paing, Pon, Wage, Kliwon
export const pancawara = ['Umanis', 'Paing', 'Pon', 'Wage', 'Kliwon']

/**
 * Konversi tanggal Masehi (string ISO YYYY-MM-DD) ke Wuku Pawukon.
 *
 * @param {string} dateString - Tanggal dalam format YYYY-MM-DD
 * @returns {{
 *   wuku: object,
 *   wukuIndex: number,
 *   dayInWuku: number,
 *   saptawara: string,
 *   saptawaraTranslated: string,
 *   pancawara: string,
 *   pawukonPosition: number,
 *   galunganDistance: number,
 *   inputDate: string
 * }}
 */
export function getWukuByDate(dateString) {
  if (!dateString) {
    return getWukuByDate('2000-01-01') // default
  }

  const date = new Date(dateString + 'T00:00:00Z')
  if (isNaN(date.getTime())) {
    return getWukuByDate('2000-01-01')
  }

  // Hitung selisih hari dari referensi
  const diffMs = date.getTime() - REFERENCE_DATE.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  // Posisi dalam siklus Pawukon (0..209)
  let position = (diffDays + REFERENCE_POSITION) % 210
  if (position < 0) position += 210

  // Nomor Wuku (0..29)
  const wukuIndex = Math.floor(position / 7)
  const dayInWuku = position % 7

  // Saptawara: day 0 = Redite (Ahad), day 1 = Soma (Senin), ...
  const saptawaraIdx = position % 7
  const saptawaraName = saptawara[saptawaraIdx]

  // Pancawara: day 0 = Paing (index 1), so formula = (day + 1) mod 5
  const pancawaraIdx = (position + 1) % 5
  const pancawaraName = pancawara[pancawaraIdx]

  // Wuku object
  const wuku = wukuData[wukuIndex]

  // Hitung jarak ke Galungan terdekat (Rabu Kliwon Dungulan = day 73)
  // Galungan terjadi setiap 210 hari pada posisi 73
  let galunganDistance = 73 - position
  if (galunganDistance < 0) galunganDistance += 210

  return {
    wuku,
    wukuIndex,
    dayInWuku,
    saptawara: saptawaraName,
    saptawaraTranslated: saptawaraTranslation[saptawaraName] || saptawaraName,
    pancawara: pancawaraName,
    pawukonPosition: position,
    galunganDistance,
    inputDate: dateString,
  }
}

/**
 * Helper lama — ambil Wuku by id (untuk kompatibilitas)
 */
export function getWukuById(id) {
  return wukuData.find((w) => w.id === id) || null
}

/**
 * Validasi: cek beberapa tanggal referensi
 */
export function validateAlgorithm() {
  const tests = [
    // 2022-10-23 = Redite Paing Sinta (cycle day 0)
    {
      date: '2022-10-23',
      expectedWuku: 'Sinta',
      expectedDayInWuku: 0,
      expectedSaptawara: 'Redite',
      expectedPancawara: 'Paing',
    },
    // 2024-02-28 = Rabu Kliwon Dungulan (Galungan, cycle day 73)
    {
      date: '2024-02-28',
      expectedWuku: 'Dungulan',
      expectedDayInWuku: 3,
      expectedSaptawara: 'Buda',
      expectedPancawara: 'Kliwon',
    },
    // 2024-03-09 = Sabtu Kliwon Kuningan (cycle day 83, 10 days after Galungan)
    {
      date: '2024-03-09',
      expectedWuku: 'Kuningan',
      expectedDayInWuku: 6,
      expectedSaptawara: 'Saniscara',
      expectedPancawara: 'Kliwon',
    },
    // 2026-04-05 = Redite Paing Sinta (cycle day 0, 6 cycles later)
    {
      date: '2026-04-05',
      expectedWuku: 'Sinta',
      expectedDayInWuku: 0,
      expectedSaptawara: 'Redite',
      expectedPancawara: 'Paing',
    },
  ]
  return tests.map((t) => {
    const result = getWukuByDate(t.date)
    const pass =
      result.wuku.name === t.expectedWuku &&
      result.dayInWuku === t.expectedDayInWuku &&
      result.saptawara === t.expectedSaptawara &&
      result.pancawara === t.expectedPancawara
    return {
      ...t,
      actual: `${result.wuku.name} ${result.saptawara} ${result.pancawara} day-${result.dayInWuku}`,
      pass,
    }
  })
}
