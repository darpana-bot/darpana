// =============================================================================
// DARPANA — Internationalization (i18n)
//
// Bahasa yang didukung:
//   - id: Bahasa Indonesia (default)
//   - en: English
//   - ja: 日本語 (Japanese)
//   - zh: 中文 (Chinese Simplified)
//
// Catatan: Istilah Bali/Sanskerta (DARPANA, Sumur Akasa, Peta Sanskara, Wuku,
// Saptawara, Pancawara, Bhatara, Galungan, Kuningan, Tri Pramana, Bayu/Sabda/
// Idep, mantra, archetype names) TIDAK diterjemahkan, sesuai permintaan user.
// =============================================================================

export const LANGUAGES = [
  { code: 'id', label: 'Bahasa Indonesia', short: 'ID' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ja', label: '日本語', short: 'JA' },
  { code: 'zh', label: '中文', short: 'ZH' },
]

export const translations = {
  // ===========================================================================
  // ONBOARDING
  // ===========================================================================
  onboarding: {
    id: {
      subtitle: 'Cermin digital antara Sekala dan Niskala.',
      instruction: 'Tarik napas tiga kali sebelum masuk — biarkan sistem saraf mendarat dulu.',
      breathButton: 'Tarik Napas',
      breathProgress: (n, total) => `(${n}/${total})`,
      enterButton: 'Masuk',
      quote: '"Engagingan raga, tan pawak sira." — Bhagawad Gita',
      langLabel: 'Bahasa',
    },
    en: {
      subtitle: 'A digital mirror between Sekala and Niskala.',
      instruction: 'Take three breaths before entering — let your nervous system land first.',
      breathButton: 'Breathe In',
      breathProgress: (n, total) => `(${n}/${total})`,
      enterButton: 'Enter',
      quote: '"Engagingan raga, tan pawak sira." — Bhagawad Gita',
      langLabel: 'Language',
    },
    ja: {
      subtitle: 'SekalaとNiskalaのあいだのデジタル鏡。',
      instruction: '入る前に三度息を吸い、神経系を落ち着かせてください。',
      breathButton: '息を吸う',
      breathProgress: (n, total) => `(${n}/${total})`,
      enterButton: '入る',
      quote: '"Engagingan raga, tan pawak sira." — Bhagawad Gita',
      langLabel: '言語',
    },
    zh: {
      subtitle: '介于 Sekala 与 Niskala 之间的数字之镜。',
      instruction: '进入前先深呼吸三次 — 让神经系统先安定下来。',
      breathButton: '深呼吸',
      breathProgress: (n, total) => `(${n}/${total})`,
      enterButton: '进入',
      quote: '"Engagingan raga, tan pawak sira." — Bhagawad Gita',
      langLabel: '语言',
    },
  },

  // ===========================================================================
  // HOME
  // ===========================================================================
  home: {
    id: {
      subtitle: 'Cermin Akasa',
      sanskaraTitle: 'Peta Sanskara',
      sanskaraDesc:
        'Selaraskan diri dengan siklus Pawukon. Lihat archetype, pola energi kuantum, dan hack bio-kuantum untuk hari ini.',
      akasaTitle: 'Sumur Akasa',
      akasaDesc:
        'Percakapan dengan Penjaga Sumur — pemandu reflektif yang memadukan Tattwa Bali, metafisika Timur, dan sains modern.',
      sadhanaTitle: 'Ruang Sadhana',
      sadhanaDesc:
        'Praktik audio-visual terpadu untuk menyeimbangkan energi. Pilih sesi sesuai kondisi emosional atau rekomendasi Peta Sanskara.',
    },
    en: {
      subtitle: 'Akasa Mirror',
      sanskaraTitle: 'Peta Sanskara',
      sanskaraDesc:
        'Align with the Pawukon cycle. Discover your archetype, quantum energy pattern, and bio-quantum hacks for today.',
      akasaTitle: 'Sumur Akasa',
      akasaDesc:
        'Conversation with the Well Keeper — a reflective guide blending Balinese Tattwa, Eastern metaphysics, and modern science.',
      sadhanaTitle: 'Ruang Sadhana',
      sadhanaDesc:
        'Integrated audio-visual practice to balance energy. Choose a session by emotional state or Peta Sanskara recommendation.',
    },
    ja: {
      subtitle: 'Akasaの鏡',
      sanskaraTitle: 'Peta Sanskara',
      sanskaraDesc:
        'Pawukon周期に調和しましょう。あなたのarchetype、量子エネルギーパターン、今日のbio-quantum hacksを知る。',
      akasaTitle: 'Sumur Akasa',
      akasaDesc:
        'Penjaga Sumur（井戸の守り手）との対話 — バリのTattwa、東洋形而上学、現代科学を融合した内省のガイド。',
      sadhanaTitle: 'Ruang Sadhana',
      sadhanaDesc:
        'エネルギーを整える統合音声・視覚プラクティス。感情状態やPeta Sanskaraのおすすめに従ってセッションを選べます。',
    },
    zh: {
      subtitle: 'Akasa 之镜',
      sanskaraTitle: 'Peta Sanskara',
      sanskaraDesc:
        '与 Pawukon 周期对齐。发现你的 archetype、量子能量模式，以及今日的 bio-quantum hacks。',
      akasaTitle: 'Sumur Akasa',
      akasaDesc:
        '与 Penjaga Sumur（井之守护者）对话 — 融合巴厘 Tattwa、东方形而上学与现代科学的反思向导。',
      sadhanaTitle: 'Ruang Sadhana',
      sadhanaDesc:
        '整合音视频练习以平衡能量。根据情绪状态或 Peta Sanskara 推荐选择会话。',
    },
  },

  // ===========================================================================
  // WUKU INPUT
  // ===========================================================================
  wukuInput: {
    id: {
      back: 'Kembali',
      birthDate: 'Tanggal Lahir',
      analyze: 'Analisis Pola Energi',
      note: '*Sistem Pawukon lengkap: 30 Wuku dengan algoritma konversi tanggal Masehi yang akurat.',
      intro: 'Setiap kelahiran membawa pola resonansi tertentu. Masukkan tanggal lahir untuk menyelaraskan dengan siklus Pawukon.',
    },
    en: {
      back: 'Back',
      birthDate: 'Birth Date',
      analyze: 'Analyze Energy Pattern',
      note: '*Full Pawukon system: 30 Wuku with accurate Gregorian-date conversion algorithm.',
      intro: 'Each birth carries a specific resonance pattern. Enter your birth date to align with the Pawukon cycle.',
    },
    ja: {
      back: '戻る',
      birthDate: '生年月日',
      analyze: 'エネルギーパターンを分析',
      note: '*完全なPawukonシステム：30 Wukuと正確な西暦日付変換アルゴリズム。',
      intro: '誕生にはそれぞれ特定の共鳴パターンがあります。生年月日を入力してPawukon周期に調和してください。',
    },
    zh: {
      back: '返回',
      birthDate: '出生日期',
      analyze: '分析能量模式',
      note: '*完整 Pawukon 系统：30 个 Wuku 与精确的公历日期转换算法。',
      intro: '每次诞生都带有特定的共振模式。输入您的出生日期以与 Pawukon 周期对齐。',
    },
  },

  // ===========================================================================
  // WUKU RESULT
  // ===========================================================================
  wukuResult: {
    id: {
      back: 'Kembali',
      loading: 'Menyelaraskan dengan siklus Pawukon...',
      wukuLabel: (order) => `Wuku ${order} dari 30`,
      saptawara: 'Saptawara',
      pancawara: 'Pancawara',
      dayOf: 'Hari ke',
      daysToGalungan: (n) => `${n} hari lagi menuju Galungan berikutnya`,
      element: 'Unsur',
      range: 'Rentang Hari',
      mythRole: 'Peran Mitologis',
      quantumPattern: 'Pola Energi Kuantum',
      neuroscienceNote: 'Catatan Neurosains',
      light: 'Cahaya',
      shadow: 'Bayangan',
      hackTitle: 'Hack Bio-Kuantum — Tri Pramana',
      bayu: 'Bayu (Tubuh)',
      sabda: 'Sabda (Suara)',
      idep: 'Idep (Pikiran)',
      bringToAkasa: 'Bawa pola ini ke Sumur Akasa',
    },
    en: {
      back: 'Back',
      loading: 'Aligning with the Pawukon cycle...',
      wukuLabel: (order) => `Wuku ${order} of 30`,
      saptawara: 'Saptawara',
      pancawara: 'Pancawara',
      dayOf: 'Day',
      daysToGalungan: (n) => `${n} days until next Galungan`,
      element: 'Element',
      range: 'Day Range',
      mythRole: 'Mythological Role',
      quantumPattern: 'Quantum Energy Pattern',
      neuroscienceNote: 'Neuroscience Note',
      light: 'Light',
      shadow: 'Shadow',
      hackTitle: 'Bio-Quantum Hacks — Tri Pramana',
      bayu: 'Bayu (Body)',
      sabda: 'Sabda (Voice)',
      idep: 'Idep (Mind)',
      bringToAkasa: 'Bring this pattern to Sumur Akasa',
    },
    ja: {
      back: '戻る',
      loading: 'Pawukon周期に調和中...',
      wukuLabel: (order) => `Wuku ${order} / 30`,
      saptawara: 'Saptawara',
      pancawara: 'Pancawara',
      dayOf: '曜日',
      daysToGalungan: (n) => `次のGalunganまであと${n}日`,
      element: '元素',
      range: '期間',
      mythRole: '神話的役割',
      quantumPattern: '量子エネルギーパターン',
      neuroscienceNote: '脳科学メモ',
      light: '光',
      shadow: '影',
      hackTitle: 'Bio-Quantum Hacks — Tri Pramana',
      bayu: 'Bayu（体）',
      sabda: 'Sabda（声）',
      idep: 'Idep（心）',
      bringToAkasa: 'このパターンをSumur Akasaへ',
    },
    zh: {
      back: '返回',
      loading: '正在与 Pawukon 周期对齐...',
      wukuLabel: (order) => `Wuku ${order} / 30`,
      saptawara: 'Saptawara',
      pancawara: 'Pancawara',
      dayOf: '第几日',
      daysToGalungan: (n) => `距下次 Galungan 还有 ${n} 天`,
      element: '元素',
      range: '日期范围',
      mythRole: '神话角色',
      quantumPattern: '量子能量模式',
      neuroscienceNote: '神经科学注解',
      light: '光明',
      shadow: '阴影',
      hackTitle: 'Bio-Quantum Hacks — Tri Pramana',
      bayu: 'Bayu（身）',
      sabda: 'Sabda（语）',
      idep: 'Idep（意）',
      bringToAkasa: '将此模式带入 Sumur Akasa',
    },
  },

  // ===========================================================================
  // AKASA CHAT
  // ===========================================================================
  akasa: {
    id: {
      back: 'Kembali',
      title: 'Penjaga Sumur',
      welcome:
        'Selamat datang di Sumur Akasa. Aku hanya jari yang menunjuk bulan — bukan bulannya. Apa yang ingin engkau pantulkan hari ini?',
      placeholder: 'Tuliskan apa yang ingin dipantulkan...',
      disclaimer: 'AI ini adalah cermin reflektif, bukan pengganti bantuan profesional.',
      sendError: 'Maaf, sambungan ke Sumur Akasa sedang terganggu. Tarik napas sejenak, lalu coba lagi. 🙏',
    },
    en: {
      back: 'Back',
      title: 'Well Keeper',
      welcome:
        'Welcome to Sumur Akasa. I am only the finger pointing at the moon — not the moon itself. What would you like to reflect on today?',
      placeholder: 'Write what you wish to reflect on...',
      disclaimer: 'This AI is a reflective mirror, not a substitute for professional help.',
      sendError: 'Sorry, the connection to Sumur Akasa is interrupted. Take a breath, then try again. 🙏',
    },
    ja: {
      back: '戻る',
      title: 'Penjaga Sumur',
      welcome:
        'Sumur Akasaへようこそ。私は月を指さす指にすぎません — 月そのものではありません。今日、何を映したいですか？',
      placeholder: '振り返りたいことを書いてください...',
      disclaimer: 'このAIは内省の鏡であり、専門家の支援の代わりではありません。',
      sendError: '申し訳ありません、Sumur Akasaとの接続が途絶えました。息を整えてからもう一度お試しください。🙏',
    },
    zh: {
      back: '返回',
      title: 'Penjaga Sumur',
      welcome:
        '欢迎来到 Sumur Akasa。我仅是指月之指 — 非月本身。今日您想映照什么？',
      placeholder: '写下您想反思的内容...',
      disclaimer: '本 AI 是反思之镜，不能替代专业帮助。',
      sendError: '抱歉，与 Sumur Akasa 的连接中断。请先深呼吸，再试一次。🙏',
    },
  },

  // ===========================================================================
  // SADHANA — Ruang Sadhana (Sanctuary)
  // ===========================================================================
  sadhana: {
    id: {
      back: 'Kembali',
      title: 'Ruang Sadhana',
      subtitle: 'The Sanctuary',
      intro: 'Pilih praktik yang sesuai dengan kondisi energi Anda saat ini.',
      emotionalTitle: 'Berdasarkan Kondisi Emosional',
      sanskaraTitle: 'Rekomendasi dari Peta Sanskara',
      needBirthDate: 'Lihat Peta Sanskara Anda dulu untuk mendapatkan rekomendasi praktik yang dipersonalisasi.',
      goToSanskara: 'Buka Peta Sanskara',
      sessionTitle: 'Sesi',
      duration: (n) => `${n} menit`,
      startSession: 'Mulai Sesi',
      breathing: 'Pola Napas',
      mantra: 'Mantra',
      frequency: 'Frekuensi',
      elements: 'Elemen Visual & Audio',
      benefits: 'Manfaat',
      sessionIntro: (name) => `Memulai sesi ${name}...`,
      sessionOutro: 'Menutup sesi dengan grounding...',
      grounding: 'Sadari berat tubuh Anda. Rasakan kontak tubuh dengan permukaan di bawah Anda. Tarik napas satu kali lagi, perlahan.',
      returnTo: 'Kembali ke Sekala',
      pause: 'Jeda',
      resume: 'Lanjut',
      stop: 'Hentikan',
      inhale: 'Tarik',
      exhale: 'Hembuskan',
      hold: 'Tahan',
    },
    en: {
      back: 'Back',
      title: 'Ruang Sadhana',
      subtitle: 'The Sanctuary',
      intro: 'Choose a practice that matches your current energy state.',
      emotionalTitle: 'By Emotional State',
      sanskaraTitle: 'Peta Sanskara Recommendation',
      needBirthDate: 'View your Peta Sanskara first to receive a personalized practice recommendation.',
      goToSanskara: 'Open Peta Sanskara',
      sessionTitle: 'Session',
      duration: (n) => `${n} minutes`,
      startSession: 'Start Session',
      breathing: 'Breath Pattern',
      mantra: 'Mantra',
      frequency: 'Frequency',
      elements: 'Visual & Audio Elements',
      benefits: 'Benefits',
      sessionIntro: (name) => `Starting ${name} session...`,
      sessionOutro: 'Closing session with grounding...',
      grounding: 'Become aware of your body\'s weight. Feel the contact between your body and the surface beneath you. Take one more slow breath.',
      returnTo: 'Return to Sekala',
      pause: 'Pause',
      resume: 'Resume',
      stop: 'Stop',
      inhale: 'Inhale',
      exhale: 'Exhale',
      hold: 'Hold',
    },
    ja: {
      back: '戻る',
      title: 'Ruang Sadhana',
      subtitle: 'The Sanctuary',
      intro: '今のエネルギー状態に合ったプラクティスを選んでください。',
      emotionalTitle: '感情状態から選ぶ',
      sanskaraTitle: 'Peta Sanskaraのおすすめ',
      needBirthDate: 'パーソナライズされたおすすめを受けるには、まずPeta Sanskaraをご覧ください。',
      goToSanskara: 'Peta Sanskaraを開く',
      sessionTitle: 'セッション',
      duration: (n) => `${n}分`,
      startSession: 'セッション開始',
      breathing: '呼吸パターン',
      mantra: 'Mantra',
      frequency: '周波数',
      elements: '視覚・音声要素',
      benefits: '効果',
      sessionIntro: (name) => `${name}セッションを開始...`,
      sessionOutro: 'グラウンディングでセッションを閉じています...',
      grounding: '体の重みを意識してください。体と下の面の接触を感じてください。もう一度、ゆっくりと息を吸ってください。',
      returnTo: 'Sekalaへ戻る',
      pause: '一時停止',
      resume: '再開',
      stop: '停止',
      inhale: '吸う',
      exhale: '吐く',
      hold: '止める',
    },
    zh: {
      back: '返回',
      title: 'Ruang Sadhana',
      subtitle: 'The Sanctuary',
      intro: '选择与您当前能量状态相符的练习。',
      emotionalTitle: '按情绪状态选择',
      sanskaraTitle: 'Peta Sanskara 推荐',
      needBirthDate: '请先查看您的 Peta Sanskara 以获得个性化练习推荐。',
      goToSanskara: '打开 Peta Sanskara',
      sessionTitle: '会话',
      duration: (n) => `${n} 分钟`,
      startSession: '开始会话',
      breathing: '呼吸模式',
      mantra: 'Mantra',
      frequency: '频率',
      elements: '视觉与音频元素',
      benefits: '益处',
      sessionIntro: (name) => `正在开始 ${name} 会话...`,
      sessionOutro: '以 grounding 收尾...',
      grounding: '觉察您身体的重量。感受身体与下方表面的接触。再缓慢地呼吸一次。',
      returnTo: '返回 Sekala',
      pause: '暂停',
      resume: '继续',
      stop: '停止',
      inhale: '吸气',
      exhale: '呼气',
      hold: '屏息',
    },
  },

  // ===========================================================================
  // SADHANA PRACTICES (emotional states & descriptions)
  // Note: mantra stays in Sanskrit/Balinese. Visual element names are translated
  // but the description flavor is translated.
  // ===========================================================================
  sadhanaPractices: {
    anxious: {
      id: {
        name: 'Menenangkan Kecemasan',
        description: 'Untuk saat dada terasa sesak dan pikiran berputar cepat.',
        benefits: ['Menenangkan vagus nerve', 'Menurunkan cortisol', 'Membumikan pikiran'],
      },
      en: {
        name: 'Calming Anxiety',
        description: 'For moments when your chest feels tight and thoughts race.',
        benefits: ['Soothes the vagus nerve', 'Lowers cortisol', 'Grounds the mind'],
      },
      ja: {
        name: '不安を鎮める',
        description: '胸が締めつけられ、思考が急ぐ時に。',
        benefits: ['迷走神経を鎮める', 'コルチゾールを下げる', '心をグラウンディング'],
      },
      zh: {
        name: '平息焦虑',
        description: '适用于胸闷、思绪飞速时。',
        benefits: ['安抚迷走神经', '降低皮质醇', '让心念落地'],
      },
    },
    tired: {
      id: {
        name: 'Memulihkan Ketenangan',
        description: 'Saat tubuh terasa lelah namun pikiran tidak bisa istirahat.',
        benefits: ['Memperdalam napas', 'Melepas ketegangan', 'Memulihkan energi'],
      },
      en: {
        name: 'Restoring Calm',
        description: 'When your body is tired but your mind cannot rest.',
        benefits: ['Deepens the breath', 'Releases tension', 'Restores energy'],
      },
      ja: {
        name: '静寂を取り戻す',
        description: '体は疲れているのに心が休まらない時に。',
        benefits: ['呼吸を深める', '緊張を解く', 'エネルギーを回復'],
      },
      zh: {
        name: '恢复宁静',
        description: '当身体疲倦但心念无法休息时。',
        benefits: ['加深呼吸', '释放紧张', '恢复能量'],
      },
    },
    angry: {
      id: {
        name: 'Mendinginkan Api',
        description: 'Saat emosi memuncak dan butuh menyalurkan dengan tenang.',
        benefits: ['Menurunkan tekanan darah', 'Mengaktifkan parasimpatik', 'Mengembalikan kejernihan'],
      },
      en: {
        name: 'Cooling the Fire',
        description: 'When emotion peaks and needs a calm channel.',
        benefits: ['Lowers blood pressure', 'Activates parasympathetic', 'Restores clarity'],
      },
      ja: {
        name: '炎を鎮める',
        description: '感情が高ぶり、静かに流す必要がある時に。',
        benefits: ['血圧を下げる', '副交感神経を活性化', '明晰さを取り戻す'],
      },
      zh: {
        name: '冷却火焰',
        description: '当情绪高涨、需要平静地疏导时。',
        benefits: ['降低血压', '激活副交感神经', '恢复清明'],
      },
    },
    sanskara: {
      id: {
        name: 'Sesuai Wuku Anda',
        description: 'Praktik yang dipersonalisasi berdasarkan archetype Wuku kelahiran Anda.',
        benefits: ['Sinkron dengan pola energi', 'Memperkuat cahaya Wuku', 'Menyeimbangkan bayangan'],
      },
      en: {
        name: 'Aligned With Your Wuku',
        description: 'A personalized practice based on your birth Wuku archetype.',
        benefits: ['Syncs with your energy pattern', 'Strengthens your Wuku light', 'Balances the shadow'],
      },
      ja: {
        name: 'あなたのWukuに合わせて',
        description: '誕生Wukuのarchetypeに基づくパーソナライズされたプラクティス。',
        benefits: ['エネルギーパターンと同期', 'Wukuの光を強化', '影をバランス'],
      },
      zh: {
        name: '与您的 Wuku 对齐',
        description: '根据您的出生 Wuku archetype 个性化练习。',
        benefits: ['与能量模式同步', '增强 Wuku 光明', '平衡阴影'],
      },
    },
  },

  // ===========================================================================
  // DANA PUNIA — Menjaga Api DARPANA (Donation Page)
  // ===========================================================================
  danaPunia: {
    id: {
      back: 'Kembali',
      title: 'Menjaga Api DARPANA',
      subtitle: 'Sangkan Paraning Dharma',
      intro:
        'Aplikasi ini tidak memiliki iklan, tidak menjual data Anda, dan tidak memaksa Anda berlangganan. Kami membuatnya sebagai persembahan.',
      ask:
        'Jika DARPANA membawa kedamaian bagi Anda, dan Anda memiliki rezeki lebih, Anda bisa mendukung biaya server kami dengan memberikan Dana Punia.',
      section1Title: 'Mengapa Kami Tidak Memasang Iklan',
      section1Body:
        'Ruang Sadhana adalah ruang suci. Memasang iklan di dalamnya sama seperti menjual daging di dalam pura — mencemari keheningan yang justru ingin kami jaga. Kami percaya bahwa kedamaian sejati tidak boleh diperdagangkan.',
      section2Title: 'Mengapa Kami Tidak Mengunci Fitur',
      section2Body:
        'Peta Sanskara dan Sumur Akasa tersedia 100% gratis untuk semua orang — dari anak sekolah hingga orang tua. Kearifan leluhur bukan komoditas. Siapa pun yang membutuhkan pencerminan, berhak mendapatkannya tanpa syarat.',
      section3Title: 'Bagaimana Kami Bertahan',
      section3Body:
        'Kami mengandalkan kebaikan hati Anda. Banyak orang di era modern yang sangat lelah dengan langganan. Ketika mereka melihat aplikasi berkualitas yang mempercayai kebaikan hati mereka, mereka justru memberikan dukungan finansial yang lebih besar — didorong oleh rasa syukur, bukan paksaan.',
      section4Title: 'Tiga Janji DARPANA',
      promise1: 'Tanpa iklan, selamanya',
      promise2: 'Tanpa paywall untuk fitur inti',
      promise3: 'Tanpa penjualan data pribadi Anda',
      giveButton: 'Berikan Dana Punia',
      giveNote: 'Anda akan diarahkan ke halaman donasi kami di Linktree',
      noPressure:
        'Tidak ada kewajiban. Tidak ada batas waktu. Tidak ada peringatan. Jika Anda tidak bisa memberi, nikmati DARPANA dengan tenang — itu juga bentuk dukungan.',
      closingQuote: '"Yad bhāvi tadātītaṁ, dānaṁ tena sukhaṁ bhavet." — Yang telah lewat adalah masa depan, dan kebahagiaan datang dari pemberian.',
      thanksTitle: 'Terima Kasih',
      thanksBody:
        'Atas setiap napas yang Anda ambil di sini, atas setiap refleksi yang muncul, atas setiap niat baik — kami menerima sebagai persembahan Anda kepada DARPANA.',
    },
    en: {
      back: 'Back',
      title: 'Keeping the DARPANA Flame',
      subtitle: 'Sangkan Paraning Dharma',
      intro:
        'This app has no ads, does not sell your data, and does not force you to subscribe. We made it as an offering.',
      ask:
        'If DARPANA has brought you peace, and you have abundance, you may support our server costs by offering Dana Punia.',
      section1Title: 'Why We Have No Ads',
      section1Body:
        'Ruang Sadhana is a sacred space. Placing ads in it would be like selling meat in a temple — polluting the very stillness we seek to preserve. We believe true peace must not be traded.',
      section2Title: 'Why We Have No Paywall',
      section2Body:
        'Peta Sanskara and Sumur Akasa are 100% free for everyone — from schoolchildren to elders. Ancestral wisdom is not a commodity. Anyone who needs a mirror deserves one, unconditionally.',
      section3Title: 'How We Sustain Ourselves',
      section3Body:
        'We rely on your goodwill. Many people in the modern era are exhausted by subscriptions. When they encounter a quality app that trusts their kindness, they often give more generously — driven by gratitude, not coercion.',
      section4Title: 'Three DARPANA Promises',
      promise1: 'No ads, ever',
      promise2: 'No paywall on core features',
      promise3: 'No selling of your personal data',
      giveButton: 'Offer Dana Punia',
      giveNote: 'You will be directed to our Linktree donation page',
      noPressure:
        'No obligation. No deadline. No reminder. If you cannot give, enjoy DARPANA peacefully — that too is a form of support.',
      closingQuote: '"Yad bhāvi tadātītaṁ, dānaṁ tena sukhaṁ bhavet." — What has passed becomes the future, and happiness arises from giving.',
      thanksTitle: 'Thank You',
      thanksBody:
        'For every breath you have taken here, for every reflection that has surfaced, for every kind intention — we receive them as your offering to DARPANA.',
    },
    ja: {
      back: '戻る',
      title: 'DARPANAの灯火を守る',
      subtitle: 'Sangkan Paraning Dharma',
      intro:
        'このアプリに広告はなく、あなたのデータを売らず、購読を強要しません。お供えとして作りました。',
      ask:
        'DARPANAがあなたに平和をもたらしたなら、余裕があれば、Dana Punia（喜捨）でサーバー費用を支えていただけます。',
      section1Title: '広告を入れない理由',
      section1Body:
        'Ruang Sadhanaは聖なる空間です。ここに広告を置くことは、寺院で肉を売るようなもの — 守るべき静寂を汚すことになります。真の平和は取引すべきではないと信じています。',
      section2Title: '機能をロックしない理由',
      section2Body:
        'Peta SanskaraとSumur Akasaは、学生からお年寄りまで100%無料で開放されています。祖先の知恵は商品ではありません。鏡を必要とするすべての人に、無条件で開かれるべきです。',
      section3Title: 'どう存続するか',
      section3Body:
        'あなたの善意に頼っています。現代の人々はサブスクリプションに疲れています。品質の高いアプリが自分の善意を信じてくれていると知った時、強制ではなく感謝から、かえって多くを与えることが多いのです。',
      section4Title: 'DARPANAの三つの誓い',
      promise1: '広告は永遠にない',
      promise2: 'コア機能の課金なし',
      promise3: '個人データの売却なし',
      giveButton: 'Dana Puniaを捧げる',
      giveNote: 'Linktreeの寄付ページへ移動します',
      noPressure:
        '義務はありません。期限もありません。催促もありません。与えられないなら、静かにDARPANAをお楽しみください — それも支えの一つです。',
      closingQuote: '"Yad bhāvi tadātītaṁ, dānaṁ tena sukhaṁ bhavet." — 過ぎたものは未来となり、喜びは与えることから生まれる。',
      thanksTitle: 'ありがとう',
      thanksBody:
        'ここで吸った每一息、浮かんだ每一省察、每一の善意 — それらをDARPANAへのあなたのお供えとして受け取ります。',
    },
    zh: {
      back: '返回',
      title: '守护 DARPANA 之火',
      subtitle: 'Sangkan Paraning Dharma',
      intro:
        '本应用无广告，不售卖您的数据，也不强制订阅。我们将其作为奉献而制作。',
      ask:
        '如果 DARPANA 为您带来了平静，而您又有余裕，可以通过 Dana Punia（布施）支持我们的服务器费用。',
      section1Title: '为何不放广告',
      section1Body:
        'Ruang Sadhana 是神圣空间。在其中放广告如同在寺庙里卖肉 — 污染了我们想要守护的宁静。我们相信真正的平静不可被交易。',
      section2Title: '为何不锁功能',
      section2Body:
        'Peta Sanskara 和 Sumur Akasa 对所有人 100% 免费 — 从学生到长者。祖先的智慧不是商品。任何需要镜照的人，都应无条件得到。',
      section3Title: '我们如何存续',
      section3Body:
        '我们依靠您的善意。现代人已厌倦订阅。当他们看到一款高质量应用信任他们的善意时，往往出于感恩而非被迫，反而给予更多支持。',
      section4Title: 'DARPANA 三项承诺',
      promise1: '永不放广告',
      promise2: '核心功能永不收费',
      promise3: '永不售卖您的个人数据',
      giveButton: '奉献 Dana Punia',
      giveNote: '您将被引导至我们的 Linktree 捐赠页面',
      noPressure:
        '无义务。无期限。无提醒。若您无法给予，请安心享受 DARPANA — 这也是一种支持。',
      closingQuote: '"Yad bhāvi tadātītaṁ, dānaṁ tena sukhaṁ bhavet." — 已逝者成未来，喜乐由布施而生。',
      thanksTitle: '感谢您',
      thanksBody:
        '您在此呼吸的每一息、浮现的每一反思、每一善念 — 我们都作为您对 DARPANA 的奉献而接纳。',
    },
  },

  // ===========================================================================
  // RUANG RESONANSI — Micro-Feedback Pasca-Sadhana
  // ===========================================================================
  resonance: {
    id: {
      beforeTitle: 'Sebelum masuk ruang ini',
      afterTitle: 'Saat ini, setelah sesi',
      beforeHint: 'Bagaimana frekuensi pikiran Anda sebelum masuk?',
      afterHint: 'Bagaimana frekuensi Anda saat ini?',
      state_kacau: 'Berisik / Kacau',
      state_gelisah: 'Gelisah',
      state_biasa: 'Biasa Saja',
      state_tenang: 'Tenang',
      state_jernih: 'Sangat Jernih',
      skip: 'Lewati',
      thanks: 'Terima kasih telah mengamati pergeseran Anda.',
    },
    en: {
      beforeTitle: 'Before entering this space',
      afterTitle: 'Right now, after the session',
      beforeHint: 'What was the frequency of your mind before entering?',
      afterHint: 'What is your frequency right now?',
      state_kacau: 'Noisy / Chaotic',
      state_gelisah: 'Restless',
      state_biasa: 'Neutral',
      state_tenang: 'Calm',
      state_jernih: 'Very Clear',
      skip: 'Skip',
      thanks: 'Thank you for observing your shift.',
    },
    ja: {
      beforeTitle: 'この空間に入る前',
      afterTitle: '今、セッションの後',
      beforeHint: '入る前、心の周波数はどうでしたか？',
      afterHint: '今のあなたの周波数はどうですか？',
      state_kacau: '騒がしい / 混乱',
      state_gelisah: '落ち着かない',
      state_biasa: '普通',
      state_tenang: '穏やか',
      state_jernih: 'とても清明',
      skip: 'スキップ',
      thanks: '自分の変化を観察してくれてありがとう。',
    },
    zh: {
      beforeTitle: '进入此空间之前',
      afterTitle: '此刻，会话之后',
      beforeHint: '进入前，您心念的频率如何？',
      afterHint: '此刻您的频率如何？',
      state_kacau: '嘈杂 / 混乱',
      state_gelisah: '不安',
      state_biasa: '一般',
      state_tenang: '平静',
      state_jernih: '非常清明',
      skip: '跳过',
      thanks: '感谢您观察自己的转变。',
    },
  },

  // ===========================================================================
  // AI RESONANCE — Water Ripple & Lontar Leaf
  // ===========================================================================
  aiResonance: {
    id: {
      rippleHint: 'Ini beresonansi dengan saya',
      lontarHint: 'Tuliskan koreksi',
      lontarPrompt: 'Apa yang bisa diperbaiki dari pantulan ini agar lebih jernih?',
      lontarSubmit: 'Kirim',
      lontarCancel: 'Batal',
      lontarThanks: 'Pantulan Anda telah kami terima. Om Shanti.',
      rippleThanks: '🎮 Tetesan air telah jatuh ke sumur.',
    },
    en: {
      rippleHint: 'This resonates with me',
      lontarHint: 'Write a correction',
      lontarPrompt: 'What could be refined in this reflection to make it clearer?',
      lontarSubmit: 'Send',
      lontarCancel: 'Cancel',
      lontarThanks: 'Your reflection has been received. Om Shanti.',
      rippleThanks: '🎮 A drop has fallen into the well.',
    },
    ja: {
      rippleHint: 'これに共鳴します',
      lontarHint: '修正を書く',
      lontarPrompt: 'この反射をより明澄にするために、何を改善できますか？',
      lontarSubmit: '送信',
      lontarCancel: 'キャンセル',
      lontarThanks: 'あなたの反射を受け取りました。Om Shanti。',
      rippleThanks: '🎮 雫が井戸に落ちました。',
    },
    zh: {
      rippleHint: '这引起了我的共鸣',
      lontarHint: '写下修正',
      lontarPrompt: '此反思可如何改进以更清明？',
      lontarSubmit: '发送',
      lontarCancel: '取消',
      lontarThanks: '您的反思已被接收。Om Shanti。',
      rippleThanks: '🎮 一滴水已落入井中。',
    },
  },

  // ===========================================================================
  // RTA — Bug Report / System Imbalance
  // ===========================================================================
  rta: {
    id: {
      title: 'Menjaga Keseimbangan Sistem',
      subtitle: 'Rta',
      intro:
        'Ketika ada sesuatu yang rusak atau tidak seimbang, itu adalah gangguan terhadap Rta — keteraturan kosmis. Anda tidak sedang melapor ke customer service. Anda sedang membantu kami menyeimbangkan kembali Rta di dalam DARPANA.',
      sectionLabel: 'Di bagian mana keteraturan ini terganggu?',
      section_peta_sanskara: 'Peta Sanskara',
      section_ruang_sadhana: 'Ruang Sadhana',
      section_sumur_akasa: 'Sumur Akasa',
      section_lainnya: 'Lainnya',
      descriptionLabel: 'Bantu kami memahaminya:',
      descriptionPlaceholder: 'Jelaskan apa yang terjadi, apa yang Anda harapkan, dan apa yang muncul...',
      contextLabel: 'Konteks tambahan (opsional)',
      contextPlaceholder: 'Tanggal lahir yang Anda input, praktik yang dipilih, pesan error, dll.',
      submit: 'Kirim Pantulan',
      submitting: 'Mengirim...',
      success: 'Pantulan Anda telah diterima. Kami akan segera menyeimbangkan kembali sistem ini. Om Shanti.',
      backHome: 'Kembali ke Beranda',
      needSection: 'Silakan pilih bagian yang terganggu.',
      needDescription: 'Silakan jelaskan gangguan yang Anda alami.',
    },
    en: {
      title: 'Keeping the System in Balance',
      subtitle: 'Rta',
      intro:
        'When something is broken or imbalanced, it is a disturbance of Rta — cosmic order. You are not filing a customer service report. You are helping us restore Rta within DARPANA.',
      sectionLabel: 'Where was this order disturbed?',
      section_peta_sanskara: 'Peta Sanskara',
      section_ruang_sadhana: 'Ruang Sadhana',
      section_sumur_akasa: 'Sumur Akasa',
      section_lainnya: 'Other',
      descriptionLabel: 'Help us understand:',
      descriptionPlaceholder: 'Describe what happened, what you expected, and what appeared...',
      contextLabel: 'Additional context (optional)',
      contextPlaceholder: 'Birth date you entered, practice chosen, error message, etc.',
      submit: 'Send Reflection',
      submitting: 'Sending...',
      success: 'Your reflection has been received. We will restore balance to this system soon. Om Shanti.',
      backHome: 'Back to Home',
      needSection: 'Please select the disturbed section.',
      needDescription: 'Please describe the disturbance you experienced.',
    },
    ja: {
      title: 'システムの均衡を守る',
      subtitle: 'Rta',
      intro:
        '何かが壊れたり不均衡になったりする時、それはRta — 宇宙の秩序 — の乱れです。あなたはカスタマーサービスに報告しているのではありません。DARPANA内のRtaを再均衡させるのを助けています。',
      sectionLabel: 'どこで秩序が乱れましたか？',
      section_peta_sanskara: 'Peta Sanskara',
      section_ruang_sadhana: 'Ruang Sadhana',
      section_sumur_akasa: 'Sumur Akasa',
      section_lainnya: 'その他',
      descriptionLabel: '理解を助けてください：',
      descriptionPlaceholder: '何が起きたか、期待したこと、現れたことを説明してください...',
      contextLabel: '追加の文脈（任意）',
      contextPlaceholder: '入力した生年月日、選んだプラクティス、エラーメッセージなど',
      submit: '反射を送る',
      submitting: '送信中...',
      success: 'あなたの反射を受け取りました。まもなくこのシステムの均衡を取り戻します。Om Shanti.',
      backHome: 'ホームに戻る',
      needSection: '乱れたセクションを選んでください。',
      needDescription: '経験した乱れを説明してください。',
    },
    zh: {
      title: '维护系统平衡',
      subtitle: 'Rta',
      intro:
        '当某物损坏或失衡时，那是对 Rta — 宇宙秩序 — 的扰乱。您不是在提交客服报告。您是在帮助我们恢复 DARPANA 内的 Rta。',
      sectionLabel: '此秩序在何处被扰乱？',
      section_peta_sanskara: 'Peta Sanskara',
      section_ruang_sadhana: 'Ruang Sadhana',
      section_sumur_akasa: 'Sumur Akasa',
      section_lainnya: '其他',
      descriptionLabel: '帮助我们理解：',
      descriptionPlaceholder: '描述发生了什么、您期望什么、出现了什么...',
      contextLabel: '额外上下文（可选）',
      contextPlaceholder: '您输入的出生日期、选择的练习、错误消息等',
      submit: '发送反思',
      submitting: '发送中...',
      success: '您的反思已被接收。我们将尽快恢复此系统的平衡。Om Shanti.',
      backHome: '返回首页',
      needSection: '请选择被扰乱的章节。',
      needDescription: '请描述您经历的扰乱。',
    },
  },

  // ===========================================================================
  // JEJAK EVOLUSI — The Changelog of Consciousness
  // ===========================================================================
  evolution: {
    id: {
      title: 'Jejak Evolusi',
      subtitle: 'The Changelog of Consciousness',
      intro:
        'DARPANA adalah organisme hidup. Setiap perbaikan lahir dari resonansi komunitas — bukan dari roadmap marketing. Inilah jejak evolusi kami, ditulis dengan jujur.',
      noEntries: 'Belum ada jejak. Evolusi baru saja dimulai.',
      basedOnResonance: 'Berdasarkan resonansi komunitas',
    },
    en: {
      title: 'Trail of Evolution',
      subtitle: 'The Changelog of Consciousness',
      intro:
        'DARPANA is a living organism. Every improvement is born from community resonance — not from a marketing roadmap. This is our evolution trail, written honestly.',
      noEntries: 'No trails yet. Evolution has just begun.',
      basedOnResonance: 'Based on community resonance',
    },
    ja: {
      title: '進化の軌跡',
      subtitle: 'The Changelog of Consciousness',
      intro:
        'DARPANAは生きた有機体です。すべての改善はコミュニティの共鳴から生まれます — マーケティングのロードマップからではありません。これが私たちの進化の軌跡、正直に書かれています。',
      noEntries: 'まだ軌跡はありません。進化は始まったばかりです。',
      basedOnResonance: 'コミュニティの共鳴に基づく',
    },
    zh: {
      title: '进化之迹',
      subtitle: 'The Changelog of Consciousness',
      intro:
        'DARPANA 是一个活的有机体。每一次改进都源于社区共鸣 — 而非营销路线图。这是我们的进化之迹，诚实书写。',
      noEntries: '尚无痕迹。进化刚刚开始。',
      basedOnResonance: '基于社区共鸣',
    },
  },

  // ===========================================================================
  // HOME — subtle links labels
  // ===========================================================================
  homeLinks: {
    id: {
      rta: 'Menjaga Keseimbangan Sistem (Rta)',
      evolution: 'Jejak Evolusi',
    },
    en: {
      rta: 'Keeping System Balance (Rta)',
      evolution: 'Trail of Evolution',
    },
    ja: {
      rta: 'システムの均衡を守る (Rta)',
      evolution: '進化の軌跡',
    },
    zh: {
      rta: '维护系统平衡 (Rta)',
      evolution: '进化之迹',
    },
  },
}

// ---------------------------------------------------------------------------
// Helper: get translation with fallback to Indonesian
// ---------------------------------------------------------------------------
export function t(lang, section, key, ...args) {
  const sectionData = translations[section]
  if (!sectionData) return key
  const langData = sectionData[lang] || sectionData.id
  if (!langData) return key
  const value = langData[key]
  if (typeof value === 'function') return value(...args)
  return value ?? key
}

// ---------------------------------------------------------------------------
// Hook helper for components
// ---------------------------------------------------------------------------
export function getT(lang) {
  return (section, key, ...args) => t(lang, section, key, ...args)
}
