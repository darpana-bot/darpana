import React, { useState, useRef, useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Wind,
  Sparkles,
  Calendar,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  Send,
  Moon,
  Sun,
  Flame,
  Droplets,
  Brain,
  Heart,
  AlertCircle,
  Globe,
  Play,
  Pause,
  Square,
  Flower,
  Waves,
  Leaf,
  Volume2,
  VolumeX,
  Flame as FlameIcon,
  ExternalLink,
  Droplet,
  Scroll,
  Scale,
  Sparkle,
} from 'lucide-react'
import { wukuData, getWukuByDate } from './data/wukuData.js'
import { sadhanaPractices, getSadhanaPractice, getRecommendedPracticeForWuku } from './data/sadhanaData.js'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext.jsx'
import { LANGUAGES, getT } from './i18n/translations.js'
import { getEvolutionEntries } from './data/evolutionData.js'
import { logSadhanaResonance, logAIResonance, submitRtaImbalance } from './utils/resonance.js'

// =============================================================================
// Konstanta animasi — lambat, easeInOut sesuai design system
// =============================================================================
const EASE = [0.4, 0.0, 0.2, 1]
const SLOW = { duration: 0.8, ease: EASE }
const SLOWER = { duration: 1.2, ease: EASE }
const FADE_UP = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: SLOW,
}

// =============================================================================
// Komponen kecil: SectionLabel
// =============================================================================
function SectionLabel({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2 mb-3 text-gold/80">
      {Icon && <Icon size={16} strokeWidth={1.5} />}
      <span className="text-xs uppercase tracking-[0.2em] font-medium">{children}</span>
    </div>
  )
}

// =============================================================================
// Komponen: LanguageSelector (dipakai di Onboarding)
// =============================================================================
function LanguageSelector() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate/60 backdrop-blur-sm border border-sand/10 text-sand text-xs hover:border-gold/30 transition-colors"
      >
        <Globe size={14} strokeWidth={1.5} />
        <span>{current.short}</span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={SLOW}
              className="absolute right-0 mt-2 w-44 p-2 rounded-2xl bg-slate/95 backdrop-blur-md border border-sand/10 shadow-2xl z-50"
            >
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code)
                    setOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                    l.code === lang ? 'bg-gold/20 text-gold' : 'text-sand/70 hover:bg-sand/5'
                  }`}
                >
                  <span className="font-medium mr-2">{l.short}</span>
                  <span className="text-xs">{l.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// =============================================================================
// LAYAR A: ONBOARDING
// =============================================================================
function Onboarding({ onEnter }) {
  const { lang } = useLanguage()
  const t = getT(lang)
  const [breathCount, setBreathCount] = useState(0)
  const total = 3

  const handleBreath = () => {
    const next = breathCount + 1
    if (next >= total) {
      setBreathCount(total)
      setTimeout(onEnter, 800)
    } else {
      setBreathCount(next)
    }
  }

  const isReady = breathCount >= total

  return (
    <motion.div
      key="onboarding"
      {...FADE_UP}
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center"
    >
      <LanguageSelector />

      {/* Ikon napas berdenyut */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <div className="absolute inset-0 -m-6 rounded-full bg-gold/5 blur-2xl" />
        <Wind size={72} strokeWidth={1.2} className="text-gold relative z-10" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, ...SLOW }}
        className="font-heading text-4xl md:text-5xl text-sand mt-10 mb-3"
      >
        DARPANA
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="text-sand/60 text-sm max-w-sm leading-relaxed mb-12"
      >
        {t('onboarding', 'subtitle')} {t('onboarding', 'instruction')}
      </motion.p>

      <motion.button
        onClick={handleBreath}
        disabled={isReady}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={SLOW}
        className="px-8 py-4 rounded-3xl border border-gold/40 bg-slate/40 backdrop-blur-sm text-sand font-body text-base tracking-wide hover:bg-slate/70 hover:border-gold/70 transition-colors disabled:opacity-80"
      >
        {isReady ? (
          <span className="flex items-center gap-2">
            {t('onboarding', 'enterButton')} <ArrowRight size={16} />
          </span>
        ) : (
          `${t('onboarding', 'breathButton')} ${t('onboarding', 'breathProgress', breathCount, total)}`
        )}
      </motion.button>

      {/* Indikator 3 titik */}
      <div className="flex gap-2 mt-8">
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              backgroundColor: i < breathCount ? 'rgba(194,155,87,0.9)' : 'rgba(194,155,87,0.15)',
              scale: i < breathCount ? 1 : 0.7,
            }}
            transition={SLOW}
            className="w-2 h-2 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  )
}

// =============================================================================
// LAYAR B: HOME
// =============================================================================
function Home({ onNavigate }) {
  const { lang } = useLanguage()
  const t = getT(lang)

  return (
    <motion.div
      key="home"
      {...FADE_UP}
      className="min-h-[100dvh] flex flex-col px-6 pt-16 pb-12"
    >
      <LanguageSelector />

      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SLOWER}
        className="text-center mb-10"
      >
        <h1 className="font-heading text-5xl md:text-6xl text-gold tracking-wide">DARPANA</h1>
        <p className="text-sand/50 text-xs uppercase tracking-[0.35em] mt-3">{t('home', 'subtitle')}</p>
      </motion.header>

      <div className="flex-1 flex flex-col gap-4 max-w-md w-full mx-auto justify-center">
        {/* Kartu Peta Sanskara */}
        <motion.button
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...SLOW }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onNavigate('wuku_input')}
          className="text-left p-6 rounded-3xl bg-slate/60 border border-sand/5 hover:border-gold/30 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="p-3 rounded-2xl bg-gold/10">
              <Calendar size={20} strokeWidth={1.5} className="text-gold" />
            </div>
            <Sparkles size={16} className="text-gold/30" />
          </div>
          <h2 className="font-heading text-xl text-sand mb-1.5">{t('home', 'sanskaraTitle')}</h2>
          <p className="text-sand/55 text-sm leading-relaxed">{t('home', 'sanskaraDesc')}</p>
        </motion.button>

        {/* Kartu Sumur Akasa */}
        <motion.button
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...SLOW }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onNavigate('akasa')}
          className="text-left p-6 rounded-3xl bg-slate/60 border border-sand/5 hover:border-sage/30 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="p-3 rounded-2xl bg-sage/10">
              <MessageCircle size={20} strokeWidth={1.5} className="text-sage" />
            </div>
            <Sparkles size={16} className="text-sage/30" />
          </div>
          <h2 className="font-heading text-xl text-sand mb-1.5">{t('home', 'akasaTitle')}</h2>
          <p className="text-sand/55 text-sm leading-relaxed">{t('home', 'akasaDesc')}</p>
        </motion.button>

        {/* Kartu Ruang Sadhana (NEW) */}
        <motion.button
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ...SLOW }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onNavigate('sadhana')}
          className="text-left p-6 rounded-3xl bg-slate/60 border border-sand/5 hover:border-gold/30 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="p-3 rounded-2xl bg-gold/10">
              <Flower size={20} strokeWidth={1.5} className="text-gold" />
            </div>
            <Sparkles size={16} className="text-gold/30" />
          </div>
          <h2 className="font-heading text-xl text-sand mb-1.5">{t('home', 'sadhanaTitle')}</h2>
          <p className="text-sand/55 text-sm leading-relaxed">{t('home', 'sadhanaDesc')}</p>
        </motion.button>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.4 }}
        className="text-sand/30 text-[11px] text-center mt-8 italic"
      >
        {t('onboarding', 'quote')}
      </motion.p>

      {/* Tautan halus ke Dana Punia — kecil, tenang, tidak mengganggu */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate('dana_punia')}
        className="mt-6 mx-auto flex items-center gap-1.5 px-4 py-2 text-[10px] text-gold/40 hover:text-gold/70 transition-colors"
      >
        <FlameIcon size={11} strokeWidth={1.5} />
        <span className="uppercase tracking-[0.2em]">{t('danaPunia', 'title')}</span>
      </motion.button>

      {/* Tautan super halus ke Rta + Jejak Evolusi — sepasang kecil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.6 }}
        className="mt-2 flex items-center justify-center gap-4 text-[9px] text-sand/30"
      >
        <button
          onClick={() => onNavigate('rta')}
          className="flex items-center gap-1 px-2 py-1 hover:text-sand/60 transition-colors"
        >
          <Scale size={10} strokeWidth={1.5} />
          <span className="uppercase tracking-[0.15em]">{t('homeLinks', 'rta')}</span>
        </button>
        <span className="text-sand/15">·</span>
        <button
          onClick={() => onNavigate('evolution')}
          className="flex items-center gap-1 px-2 py-1 hover:text-sand/60 transition-colors"
        >
          <Sparkle size={10} strokeWidth={1.5} />
          <span className="uppercase tracking-[0.15em]">{t('homeLinks', 'evolution')}</span>
        </button>
      </motion.div>
    </motion.div>
  )
}

// =============================================================================
// LAYAR C: WUKU INPUT
// =============================================================================
function WukuInput({ onNavigate, onAnalyze }) {
  const { lang } = useLanguage()
  const t = getT(lang)
  const [date, setDate] = useState('')

  const handleAnalyze = () => {
    onAnalyze(date || new Date().toISOString().slice(0, 10))
  }

  return (
    <motion.div
      key="wuku_input"
      {...FADE_UP}
      className="min-h-[100dvh] flex flex-col px-6 pt-16 pb-12"
    >
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-sand/50 hover:text-sand transition-colors mb-12 self-start text-sm"
      >
        <ArrowLeft size={16} /> {t('wukuInput', 'back')}
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={SLOWER}
          className="p-4 rounded-3xl bg-gold/10 w-fit mx-auto mb-8"
        >
          <Calendar size={36} strokeWidth={1.3} className="text-gold" />
        </motion.div>

        <h1 className="font-heading text-3xl text-sand text-center mb-3">{t('home', 'sanskaraTitle')}</h1>
        <p className="text-sand/55 text-sm text-center mb-10 leading-relaxed">
          {t('wukuInput', 'intro')}
        </p>

        <label className="block mb-2 text-xs uppercase tracking-[0.2em] text-sand/40">
          {t('wukuInput', 'birthDate')}
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-5 py-4 rounded-2xl bg-slate/70 border border-sand/10 text-sand font-body focus:outline-none focus:border-gold/50 transition-colors [color-scheme:dark]"
        />

        <motion.button
          onClick={handleAnalyze}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={SLOW}
          className="mt-8 w-full py-4 rounded-2xl bg-gold/90 text-obsidian font-medium hover:bg-gold transition-colors"
        >
          {t('wukuInput', 'analyze')}
        </motion.button>

        <p className="text-sand/30 text-[11px] text-center mt-6 italic">{t('wukuInput', 'note')}</p>
      </div>
    </motion.div>
  )
}

// =============================================================================
// LAYAR D: WUKU RESULT
// =============================================================================
function WukuResult({ onNavigate, dateString }) {
  const { lang } = useLanguage()
  const t = getT(lang)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    const t1 = setTimeout(() => {
      const result = getWukuByDate(dateString)
      setData(result)
      setLoading(false)
    }, 2000)
    return () => clearTimeout(t1)
  }, [dateString])

  if (loading) {
    return (
      <motion.div
        key="wuku_loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={SLOW}
        className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8"
        >
          <Sparkles size={48} strokeWidth={1.2} className="text-gold" />
        </motion.div>
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="font-heading text-lg text-sand/80 italic"
        >
          {t('wukuResult', 'loading')}
        </motion.p>
        <p className="text-sand/40 text-xs mt-3 tracking-[0.2em] uppercase">Tri Pramana</p>
      </motion.div>
    )
  }

  return (
    <motion.div key="wuku_result" {...FADE_UP} className="min-h-[100dvh] px-6 pt-16 pb-12">
      <button
        onClick={() => onNavigate('wuku_input')}
        className="flex items-center gap-2 text-sand/50 hover:text-sand transition-colors mb-8 text-sm"
      >
        <ArrowLeft size={16} /> {t('wukuResult', 'back')}
      </button>

      <div className="max-w-md w-full mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SLOW}
          className="text-center mb-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold/60 mb-2">
            {t('wukuResult', 'wukuLabel', data.wuku.order)}
          </p>
          <h1 className="font-heading text-4xl text-gold mb-2">{data.wuku.name}</h1>
          <p className="text-sand/70 italic font-body text-sm mb-4">{data.wuku.archetype}</p>

          {/* Pawukon Info Bar */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="p-2.5 rounded-2xl bg-slate/40 border border-sand/5">
              <p className="text-[10px] uppercase tracking-wider text-sand/40 mb-0.5">
                {t('wukuResult', 'saptawara')}
              </p>
              <p className="text-xs text-sand font-medium">{data.saptawaraTranslated}</p>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate/40 border border-sand/5">
              <p className="text-[10px] uppercase tracking-wider text-sand/40 mb-0.5">
                {t('wukuResult', 'pancawara')}
              </p>
              <p className="text-xs text-sand font-medium">{data.pancawara}</p>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate/40 border border-sand/5">
              <p className="text-[10px] uppercase tracking-wider text-sand/40 mb-0.5">
                {t('wukuResult', 'dayOf')}
              </p>
              <p className="text-xs text-sand font-medium">{data.dayInWuku + 1} / 7</p>
            </div>
          </div>
          <p className="text-[10px] text-sand/40 italic">
            {data.saptawara} {data.pancawara} · Wuku {data.wuku.name} · Bhatara {data.wuku.bhatara}
          </p>
          <p className="text-[10px] text-gold/50 mt-1">{t('wukuResult', 'daysToGalungan', data.galunganDistance)}</p>
        </motion.div>

        {/* Mitos & Unsur */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ...SLOW }}
          className="p-4 rounded-3xl bg-slate/40 border border-sand/5 mb-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-sand/40 mb-1">{t('wukuResult', 'element')}</p>
              <p className="text-sm text-sand/80">{data.wuku.element}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-sand/40 mb-1">{t('wukuResult', 'range')}</p>
              <p className="text-sm text-sand/80">{data.wuku.range}</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-sand/5">
            <p className="text-[10px] uppercase tracking-wider text-sand/40 mb-1">{t('wukuResult', 'mythRole')}</p>
            <p className="text-xs text-sand/70 italic leading-relaxed">{data.wuku.myth_role}</p>
          </div>
        </motion.div>

        {/* Pola Kuantum */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, ...SLOW }}
          className="p-5 rounded-3xl bg-slate/50 border border-sand/5 mb-4"
        >
          <SectionLabel icon={Sparkles}>{t('wukuResult', 'quantumPattern')}</SectionLabel>
          <p className="text-sand/80 text-sm leading-relaxed">{data.wuku.quantum_pattern}</p>
        </motion.div>

        {/* Catatan Neurosains */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, ...SLOW }}
          className="p-5 rounded-3xl bg-slate/50 border border-sage/15 mb-4"
        >
          <SectionLabel icon={Brain}>{t('wukuResult', 'neuroscienceNote')}</SectionLabel>
          <p className="text-sage/90 italic text-sm leading-relaxed">{data.wuku.neuroscience_note}</p>
        </motion.div>

        {/* Cahaya & Bayangan */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, ...SLOW }}
          className="grid grid-cols-2 gap-3 mb-4"
        >
          <div className="p-4 rounded-2xl bg-gold/8 border border-gold/20">
            <div className="flex items-center gap-2 mb-3 text-gold">
              <Sun size={14} strokeWidth={1.5} />
              <span className="text-xs uppercase tracking-wider font-medium">{t('wukuResult', 'light')}</span>
            </div>
            <ul className="space-y-1.5">
              {data.wuku.light_traits.map((trait, i) => (
                <li key={i} className="text-sand/75 text-xs leading-snug pl-3 relative">
                  <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-gold/60" />
                  {trait}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-2xl bg-obsidian/40 border border-sand/10">
            <div className="flex items-center gap-2 mb-3 text-sand/60">
              <Moon size={14} strokeWidth={1.5} />
              <span className="text-xs uppercase tracking-wider font-medium">{t('wukuResult', 'shadow')}</span>
            </div>
            <ul className="space-y-1.5">
              {data.wuku.shadow_traits.map((trait, i) => (
                <li key={i} className="text-sand/55 text-xs leading-snug pl-3 relative">
                  <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-sand/30" />
                  {trait}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bio-Kuantum Hacks */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, ...SLOW }}
          className="p-5 rounded-3xl bg-slate/50 border border-sand/5 mb-6"
        >
          <SectionLabel icon={Flame}>{t('wukuResult', 'hackTitle')}</SectionLabel>
          <div className="space-y-4">
            <HackItem icon={Wind} label={t('wukuResult', 'bayu')} text={data.wuku.bio_quantum_hacks.bayu} />
            <HackItem
              icon={MessageCircle}
              label={t('wukuResult', 'sabda')}
              text={data.wuku.bio_quantum_hacks.sabda}
            />
            <HackItem icon={Brain} label={t('wukuResult', 'idep')} text={data.wuku.bio_quantum_hacks.idep} />
          </div>
        </motion.div>

        {/* CTA ke Sumur Akasa */}
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, ...SLOW }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('akasa_from_wuku')}
          className="w-full py-4 rounded-2xl bg-sage/20 border border-sage/40 text-sage font-medium hover:bg-sage/30 transition-colors flex items-center justify-center gap-2"
        >
          <Droplets size={16} />
          {t('wukuResult', 'bringToAkasa')}
        </motion.button>
      </div>
    </motion.div>
  )
}

function HackItem({ icon: Icon, label, text }) {
  return (
    <div className="flex gap-3">
      <div className="p-2 rounded-xl bg-gold/10 h-fit">
        <Icon size={14} strokeWidth={1.5} className="text-gold" />
      </div>
      <div className="flex-1">
        <p className="text-xs uppercase tracking-wider text-gold/70 mb-1 font-medium">{label}</p>
        <p className="text-sand/75 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

// =============================================================================
// LAYAR E: SUMUR AKASA (CHAT)
// =============================================================================
function AkasaChat({ onNavigate, initialContext }) {
  const { lang } = useLanguage()
  const t = getT(lang)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t('akasa', 'welcome') },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (initialContext) {
      setInput(initialContext)
    }
  }, [initialContext])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isTyping) return

    setError(null)
    const newUserMsg = { role: 'user', content: text }
    const priorHistory = messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .slice(-10)
    setMessages((m) => [...m, newUserMsg])
    setInput('')
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: priorHistory }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || t('akasa', 'sendError'))
      }
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError(err.message)
      setMessages((m) => [...m, { role: 'assistant', content: t('akasa', 'sendError') }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <motion.div key="akasa" {...FADE_UP} className="h-[100dvh] flex flex-col">
      <div className="px-5 pt-6 pb-4 border-b border-sand/5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-sand/50 hover:text-sand transition-colors text-sm"
          >
            <ArrowLeft size={16} /> {t('akasa', 'back')}
          </button>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Droplets size={16} className="text-sage" />
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-sage"
              />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-sand/60">Sumur Akasa</span>
          </div>
        </div>
        <h1 className="font-heading text-2xl text-gold mt-3 text-center">{t('akasa', 'title')}</h1>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        {messages.map((msg, i) => (
          <ChatBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SLOW}
            className="flex justify-start"
          >
            <div className="px-5 py-3.5 rounded-3xl rounded-bl-md bg-slate/70 border border-sand/5 flex items-center gap-1.5">
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-sand/60 inline-block" />
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-sand/60 inline-block" />
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-sand/60 inline-block" />
            </div>
          </motion.div>
        )}
        {error && (
          <div className="flex items-start gap-2 text-xs text-gold/70 bg-gold/5 border border-gold/20 rounded-2xl px-4 py-3">
            <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="px-5 py-4 border-t border-sand/5 bg-obsidian/40 backdrop-blur-sm">
        <div className="flex items-end gap-2 mb-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder={t('akasa', 'placeholder')}
            className="flex-1 px-4 py-3 rounded-2xl bg-slate/60 border border-sand/10 text-sand text-sm resize-none focus:outline-none focus:border-gold/40 transition-colors max-h-32 placeholder:text-sand/30"
            disabled={isTyping}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-3 rounded-2xl bg-gold/90 text-obsidian hover:bg-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Send"
          >
            <Send size={18} strokeWidth={1.8} />
          </motion.button>
        </div>
        <p className="text-[10px] text-sand/30 text-center italic">{t('akasa', 'disclaimer')}</p>
      </div>
    </motion.div>
  )
}

function ChatBubble({ role, content, index }) {
  const { lang } = useLanguage()
  const t = getT(lang)
  const isUser = role === 'user'

  // Resonance state (hanya untuk AI messages)
  const [rippleActive, setRippleActive] = useState(false)
  const [rippleCount, setRippleCount] = useState(0)
  const [showLontar, setShowLontar] = useState(false)
  const [lontarText, setLontarText] = useState('')
  const [lontarSubmitted, setLontarSubmitted] = useState(false)

  const handleRipple = () => {
    if (rippleActive) return
    setRippleActive(true)
    setRippleCount((c) => c + 1)
    // Send async, silent
    logAIResonance({ message_content: content, type: 'ripple' })
    // Reset animation after 2s
    setTimeout(() => setRippleActive(false), 2000)
  }

  const handleLontarSubmit = () => {
    if (!lontarText.trim()) return
    logAIResonance({ message_content: content, type: 'lontar', feedback_text: lontarText })
    setLontarSubmitted(true)
    setTimeout(() => {
      setShowLontar(false)
      setLontarSubmitted(false)
      setLontarText('')
    }, 2500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SLOW}
      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} w-full`}
    >
      <div className="relative">
        {/* Ripple overlay (only for AI when rippleActive) */}
        {rippleActive && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="absolute inset-0 rounded-3xl border-2 border-sage pointer-events-none"
            style={{ zIndex: 1 }}
          />
        )}
        <div
          className={`relative max-w-[85%] px-4 py-3 rounded-3xl text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? 'bg-gold-dim/30 border border-gold/20 rounded-br-md text-sand'
              : 'bg-slate/70 border border-sand/5 rounded-bl-md text-sand/90'
          }`}
        >
          {content}
        </div>
      </div>

      {/* Resonance actions — only for AI messages */}
      {!isUser && (
        <div className="flex items-center gap-1 mt-1.5 ml-1">
          <button
            onClick={handleRipple}
            title={t('aiResonance', 'rippleHint')}
            className={`p-1.5 rounded-full transition-all ${
              rippleActive
                ? 'bg-sage/30 text-sage scale-110'
                : 'text-sand/30 hover:text-sage hover:bg-sage/10'
            }`}
          >
            <Droplet size={13} strokeWidth={1.5} fill={rippleCount > 0 ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => setShowLontar((s) => !s)}
            title={t('aiResonance', 'lontarHint')}
            className={`p-1.5 rounded-full transition-all ${
              showLontar || lontarSubmitted
                ? 'bg-gold/20 text-gold'
                : 'text-sand/30 hover:text-gold hover:bg-gold/10'
            }`}
          >
            <Scroll size={13} strokeWidth={1.5} />
          </button>
          {rippleCount > 0 && (
            <span className="text-[9px] text-sage/50 ml-1 tabular-nums">{rippleCount}</span>
          )}
        </div>
      )}

      {/* Lontar feedback form — inline, only for AI */}
      {!isUser && showLontar && !lontarSubmitted && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={SLOW}
          className="mt-2 ml-1 max-w-[85%] w-full"
        >
          <div className="p-3 rounded-2xl bg-slate/60 border border-gold/15">
            <p className="text-[10px] text-gold/70 mb-2 italic">{t('aiResonance', 'lontarPrompt')}</p>
            <textarea
              value={lontarText}
              onChange={(e) => setLontarText(e.target.value)}
              rows={2}
              autoFocus
              className="w-full px-3 py-2 rounded-xl bg-slate/80 border border-sand/10 text-sand text-xs resize-none focus:outline-none focus:border-gold/40 transition-colors"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => {
                  setShowLontar(false)
                  setLontarText('')
                }}
                className="px-3 py-1 text-[10px] text-sand/50 hover:text-sand transition-colors uppercase tracking-wider"
              >
                {t('aiResonance', 'lontarCancel')}
              </button>
              <button
                onClick={handleLontarSubmit}
                disabled={!lontarText.trim()}
                className="px-3 py-1 text-[10px] bg-gold/30 text-gold rounded-full hover:bg-gold/40 transition-colors uppercase tracking-wider disabled:opacity-30"
              >
                {t('aiResonance', 'lontarSubmit')}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Lontar submitted confirmation */}
      {!isUser && lontarSubmitted && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-1 ml-1 text-[10px] text-gold/60 italic"
        >
          {t('aiResonance', 'lontarThanks')}
        </motion.p>
      )}
    </motion.div>
  )
}

// =============================================================================
// LAYAR F: RUANG SADHANA (PILIHAN PRAKTIK) — NEW
// =============================================================================
function SadhanaMenu({ onNavigate, onStartSession, birthDate, wukuResult }) {
  const { lang } = useLanguage()
  const t = getT(lang)

  // Rekomendasi praktik berdasarkan Wuku (jika sudah ada birthDate)
  const recommendedId = useMemo(() => {
    if (!birthDate) return null
    const result = getWukuByDate(birthDate)
    return getRecommendedPracticeForWuku(result.wuku.id)
  }, [birthDate])

  const recommendedPractice = recommendedId ? getSadhanaPractice(recommendedId) : null

  const emotionalPractices = sadhanaPractices.filter((p) => p.type === 'emotional')

  // Ikon per practice
  const practiceIcons = {
    anxious: AlertCircle,
    tired: Moon,
    angry: Flame,
    sanskara: Flower,
  }

  return (
    <motion.div
      key="sadhana_menu"
      {...FADE_UP}
      className="min-h-[100dvh] flex flex-col px-6 pt-16 pb-12"
    >
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-sand/50 hover:text-sand transition-colors mb-8 self-start text-sm"
      >
        <ArrowLeft size={16} /> {t('sadhana', 'back')}
      </button>

      <div className="max-w-md w-full mx-auto flex-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={SLOWER}
          className="p-4 rounded-3xl bg-gold/10 w-fit mx-auto mb-6"
        >
          <Flower size={36} strokeWidth={1.3} className="text-gold" />
        </motion.div>

        <h1 className="font-heading text-3xl text-sand text-center mb-1">{t('sadhana', 'title')}</h1>
        <p className="text-sand/40 text-xs uppercase tracking-[0.3em] text-center mb-3">
          {t('sadhana', 'subtitle')}
        </p>
        <p className="text-sand/55 text-sm text-center mb-10 leading-relaxed">{t('sadhana', 'intro')}</p>

        {/* Rekomendasi dari Peta Sanskara */}
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gold/60 mb-3">
            {t('sadhana', 'sanskaraTitle')}
          </h2>
          {recommendedPractice ? (
            <PracticeCard
              practice={recommendedPractice}
              icon={practiceIcons[recommendedPractice.id]}
              lang={lang}
              t={t}
              isRecommended
              onClick={() => onStartSession(recommendedPractice)}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={SLOW}
              className="p-5 rounded-3xl bg-slate/40 border border-dashed border-sand/10 text-center"
            >
              <p className="text-sand/55 text-sm mb-4 leading-relaxed">{t('sadhana', 'needBirthDate')}</p>
              <button
                onClick={() => onNavigate('wuku_input')}
                className="px-5 py-2.5 rounded-2xl bg-gold/20 border border-gold/40 text-gold text-sm hover:bg-gold/30 transition-colors"
              >
                {t('sadhana', 'goToSanskara')}
              </button>
            </motion.div>
          )}
        </div>

        {/* Berdasarkan Kondisi Emosional */}
        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] text-sage/60 mb-3">
            {t('sadhana', 'emotionalTitle')}
          </h2>
          <div className="space-y-3">
            {emotionalPractices.map((p) => (
              <PracticeCard
                key={p.id}
                practice={p}
                icon={practiceIcons[p.id]}
                lang={lang}
                t={t}
                onClick={() => onStartSession(p)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PracticeCard({ practice, icon: Icon, lang, t, isRecommended, onClick }) {
  const practiceT = getT(lang)
  const practiceInfo = practiceT('sadhanaPractices', practice.id, 'name')
  const practiceDesc = practiceT('sadhanaPractices', practice.id, 'description')
  const practiceBenefits = practiceT('sadhanaPractices', practice.id, 'benefits')

  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SLOW}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="w-full text-left p-5 rounded-3xl bg-slate/60 border border-sand/5 hover:border-gold/30 transition-colors"
      style={{
        borderLeftWidth: '3px',
        borderLeftColor: practice.color,
      }}
    >
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-2xl" style={{ backgroundColor: `${practice.color}1A` }}>
          <Icon size={20} strokeWidth={1.5} style={{ color: practice.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-heading text-base text-sand">{practiceInfo}</h3>
            <span className="text-[10px] text-sand/40 uppercase tracking-wider">
              {t('sadhana', 'duration', practice.duration_minutes)}
            </span>
          </div>
          <p className="text-sand/55 text-xs leading-relaxed mb-2">{practiceDesc}</p>
          <div className="flex flex-wrap gap-1.5">
            {Array.isArray(practiceBenefits) &&
              practiceBenefits.slice(0, 2).map((b, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-sand/5 text-sand/50"
                >
                  {b}
                </span>
              ))}
          </div>
          {isRecommended && (
            <div className="mt-2">
              <span className="text-[10px] text-gold/70 uppercase tracking-wider">★ {t('sadhana', 'sanskaraTitle')}</span>
            </div>
          )}
        </div>
      </div>
    </motion.button>
  )
}

// =============================================================================
// LAYAR G: SESI SADHANA (BREATHING + 3-LAYER AUDIO) — NEW
//
// 3 audio layers diputar bersamaan (semua via <audio> element):
//   Layer 1: Ambient background (loop, 60s, per practice theme)
//   Layer 2: Binaural beats (loop, 60s, per brainwave frequency)
//   Layer 3: Voice-over (intro on start, loop every 90s, outro on session end)
//            — pre-generated via Microsoft Edge TTS (id-ID-GadisNeural, natural)
//
// Binaural beats require HEADPHONES for proper effect.
// =============================================================================
function SadhanaSession({ practice, onNavigate, lang }) {
  const t = getT(lang)
  const practiceT = getT(lang)
  const practiceName = practiceT('sadhanaPractices', practice.id, 'name')

  // Phase state
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)
  const [phaseRemaining, setPhaseRemaining] = useState(practice.breath_pattern.phases[0].duration)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isOutro, setIsOutro] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [audioMuted, setAudioMuted] = useState(false)
  const [audioError, setAudioError] = useState(null)
  const [showHeadphoneNotice, setShowHeadphoneNotice] = useState(true)

  // Ruang Resonansi — micro-feedback pasca-Sadhana state
  const sessionStartRef = useRef(Date.now())
  const [stateBefore, setStateBefore] = useState(null)
  const [stateAfter, setStateAfter] = useState(null)
  const [feedbackSkipped, setFeedbackSkipped] = useState(false)

  // Refs untuk 3 audio layers
  const ambientAudioRef = useRef(null)
  const binauralAudioRef = useRef(null)
  const voiceIntroAudioRef = useRef(null)
  const voiceLoopAudioRef = useRef(null)
  const voiceOutroAudioRef = useRef(null)
  const timerRef = useRef(null)
  const loopVoiceTimerRef = useRef(null)
  const fadeIntervalRef = useRef(null)

  const phases = practice.breath_pattern.phases
  const totalCycles = practice.breath_pattern.cycles
  const currentPhase = isOutro ? null : phases[phaseIndex]

  // ---------------------------------------------------------------------------
  // Init: start all audio layers
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const startAudio = async () => {
      try {
        // Ambient layer (subtle background)
        if (ambientAudioRef.current) {
          ambientAudioRef.current.volume = 0.35
          await ambientAudioRef.current.play()
        }
        // Binaural layer (very subtle, subliminal)
        if (binauralAudioRef.current) {
          binauralAudioRef.current.volume = 0.2
          await binauralAudioRef.current.play()
        }
        // Voice intro (dominant, natural, humanize)
        if (voiceIntroAudioRef.current) {
          voiceIntroAudioRef.current.volume = 0.95
          // Small delay so ambient+binaural settle first
          setTimeout(() => {
            voiceIntroAudioRef.current.play().catch((e) => {
              console.warn('Voice intro play failed:', e.message)
            })
          }, 1500)
        }
        setAudioError(null)
      } catch (e) {
        console.warn('Audio autoplay blocked:', e.message)
        setAudioError('audio_blocked')
      }
    }
    startAudio()

    return () => {
      // Cleanup all audio on unmount
      if (timerRef.current) clearInterval(timerRef.current)
      if (loopVoiceTimerRef.current) clearTimeout(loopVoiceTimerRef.current)
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
      ;[
        ambientAudioRef,
        binauralAudioRef,
        voiceIntroAudioRef,
        voiceLoopAudioRef,
        voiceOutroAudioRef,
      ].forEach((ref) => {
        if (ref.current) {
          ref.current.pause()
          ref.current.currentTime = 0
        }
      })
    }
  }, [practice.id])

  // ---------------------------------------------------------------------------
  // When voice intro ends → schedule periodic loop voice reminders (every 90s)
  // ---------------------------------------------------------------------------
  const handleVoiceIntroEnded = () => {
    scheduleLoopVoice()
  }

  const scheduleLoopVoice = () => {
    if (loopVoiceTimerRef.current) clearTimeout(loopVoiceTimerRef.current)
    loopVoiceTimerRef.current = setTimeout(() => {
      if (!isOutro && !isComplete && isPlaying && voiceLoopAudioRef.current) {
        voiceLoopAudioRef.current.currentTime = 0
        voiceLoopAudioRef.current.volume = 0.85
        voiceLoopAudioRef.current.play().then(() => {
          // Schedule next loop after this one ends
          voiceLoopAudioRef.current.onended = () => scheduleLoopVoice()
        }).catch(() => {
          // If play fails (e.g. paused), reschedule
          scheduleLoopVoice()
        })
      } else if (!isOutro && !isComplete) {
        // Paused — reschedule
        scheduleLoopVoice()
      }
    }, 90000) // 90 seconds between loop reminders
  }

  // ---------------------------------------------------------------------------
  // Timer for breath phases
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isPlaying || isOutro || isComplete) return

    timerRef.current = setInterval(() => {
      setPhaseRemaining((prev) => {
        if (prev > 1) return prev - 1

        // Phase selesai, lanjut ke phase berikutnya
        const nextPhaseIndex = (phaseIndex + 1) % phases.length
        if (nextPhaseIndex === 0) {
          // Satu cycle selesai
          const nextCycle = cycleCount + 1
          if (nextCycle >= totalCycles) {
            // Sesi selesai, mulai outro
            setIsOutro(true)
            triggerOutro()
            return 0
          }
          setCycleCount(nextCycle)
        }
        setPhaseIndex(nextPhaseIndex)
        return phases[nextPhaseIndex].duration
      })
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [isPlaying, phaseIndex, cycleCount, isOutro, isComplete, phases, totalCycles])

  // ---------------------------------------------------------------------------
  // Trigger outro: fade out ambient + binaural, play voice outro
  // ---------------------------------------------------------------------------
  const triggerOutro = () => {
    // Stop loop voice timer
    if (loopVoiceTimerRef.current) clearTimeout(loopVoiceTimerRef.current)
    // Stop loop voice if playing
    if (voiceLoopAudioRef.current) {
      voiceLoopAudioRef.current.pause()
      voiceLoopAudioRef.current.currentTime = 0
    }

    // Fade out ambient + binaural selama 10 detik (mulus, no cut)
    const fadeDuration = 10000
    const fadeSteps = 40
    const stepDuration = fadeDuration / fadeSteps

    const ambientAudio = ambientAudioRef.current
    const binauralAudio = binauralAudioRef.current
    const ambientStartVol = ambientAudio?.volume || 0
    const binauralStartVol = binauralAudio?.volume || 0

    let step = 0
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    fadeIntervalRef.current = setInterval(() => {
      step++
      if (ambientAudio) {
        ambientAudio.volume = Math.max(0, ambientStartVol * (1 - step / fadeSteps))
      }
      if (binauralAudio) {
        binauralAudio.volume = Math.max(0, binauralStartVol * (1 - step / fadeSteps))
      }
      if (step >= fadeSteps) {
        clearInterval(fadeIntervalRef.current)
        if (ambientAudio) ambientAudio.pause()
        if (binauralAudio) binauralAudio.pause()
        // Play voice outro (grounding)
        if (voiceOutroAudioRef.current) {
          voiceOutroAudioRef.current.volume = 0.95
          voiceOutroAudioRef.current.currentTime = 0
          voiceOutroAudioRef.current.play().catch((e) => {
            console.warn('Voice outro play failed:', e.message)
            // Still mark complete after a delay
            setTimeout(() => setIsComplete(true), 8000)
          })
        } else {
          setTimeout(() => setIsComplete(true), 5000)
        }
      }
    }, stepDuration)
  }

  // When voice outro ends → mark complete
  const handleVoiceOutroEnded = () => {
    setIsComplete(true)
  }

  // ---------------------------------------------------------------------------
  // Controls
  // ---------------------------------------------------------------------------
  const togglePause = () => {
    setIsPlaying((p) => {
      const next = !p
      // Pause/resume all audio layers
      const refs = [
        ambientAudioRef,
        binauralAudioRef,
        voiceIntroAudioRef,
        voiceLoopAudioRef,
        voiceOutroAudioRef,
      ]
      refs.forEach((ref) => {
        if (ref.current) {
          if (next) ref.current.play().catch(() => {})
          else ref.current.pause()
        }
      })
      return next
    })
  }

  const handleStop = () => {
    // Cleanup everything
    if (timerRef.current) clearInterval(timerRef.current)
    if (loopVoiceTimerRef.current) clearTimeout(loopVoiceTimerRef.current)
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    ;[
      ambientAudioRef,
      binauralAudioRef,
      voiceIntroAudioRef,
      voiceLoopAudioRef,
      voiceOutroAudioRef,
    ].forEach((ref) => {
      if (ref.current) {
        ref.current.pause()
        ref.current.currentTime = 0
      }
    })
    onNavigate('sadhana')
  }

  const toggleMute = () => {
    const newMuted = !audioMuted
    setAudioMuted(newMuted)
    ;[
      ambientAudioRef,
      binauralAudioRef,
      voiceIntroAudioRef,
      voiceLoopAudioRef,
      voiceOutroAudioRef,
    ].forEach((ref) => {
      if (ref.current) ref.current.muted = newMuted
    })
  }

  // Visual breathing animation scale berdasarkan phase
  const breathScale = useMemo(() => {
    if (isOutro || isComplete) return 1
    if (!currentPhase) return 1
    if (currentPhase.name === 'inhale') return 1.4
    if (currentPhase.name === 'exhale') return 0.8
    if (currentPhase.name === 'hold') {
      return phaseIndex > 0 && phases[phaseIndex - 1].name === 'inhale' ? 1.4 : 0.8
    }
    return 1
  }, [currentPhase, phaseIndex, phases, isOutro, isComplete])

  const phaseLabel = (() => {
    if (isOutro || isComplete) return t('sadhana', 'sessionOutro')
    if (!currentPhase) return ''
    return t('sadhana', currentPhase.name)
  })()

  // Micro-feedback states (5 options)
  const stateOptions = [
    { key: 'kacau', color: '#7B3F3F' },
    { key: 'gelisah', color: '#9B6B43' },
    { key: 'biasa', color: '#7A8B70' },
    { key: 'tenang', color: '#5A8F8A' },
    { key: 'jernih', color: '#C29B57' },
  ]

  const handleFeedbackSubmit = () => {
    const durationSec = Math.floor((Date.now() - sessionStartRef.current) / 1000)
    logSadhanaResonance({
      practice_id: practice.id,
      state_before: stateBefore,
      state_after: stateAfter,
      session_duration_sec: durationSec,
      skipped: false,
    })
    // Move to final button reveal
    setFeedbackSkipped(true) // reuse flag to mark "feedback done"
  }

  const handleFeedbackSkip = () => {
    const durationSec = Math.floor((Date.now() - sessionStartRef.current) / 1000)
    logSadhanaResonance({
      practice_id: practice.id,
      state_before: null,
      state_after: null,
      session_duration_sec: durationSec,
      skipped: true,
    })
    setFeedbackSkipped(true)
  }

  // Micro-feedback complete: both states selected OR skipped
  const feedbackDone = feedbackSkipped || (stateBefore && stateAfter)

  if (isComplete) {
    return (
      <motion.div
        key="sadhana_complete"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={SLOWER}
        className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, ...SLOWER }}
          className="p-5 rounded-full bg-gold/10 mb-6"
        >
          <Flower size={48} strokeWidth={1.2} className="text-gold" />
        </motion.div>

        {/* === RUANG RESONANSI — Micro-Feedback === */}
        {!feedbackDone ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, ...SLOW }}
            className="w-full max-w-md mb-6"
          >
            {/* Two circles side by side */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Circle 1: Before */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-sand/40 mb-2">
                  {t('resonance', 'beforeTitle')}
                </p>
                <p className="text-[10px] text-sand/50 mb-3 italic">{t('resonance', 'beforeHint')}</p>
                <div className="space-y-1.5">
                  {stateOptions.map((opt) => (
                    <button
                      key={`before-${opt.key}`}
                      onClick={() => setStateBefore(opt.key)}
                      className={`w-full px-2.5 py-1.5 rounded-full text-[10px] transition-all border ${
                        stateBefore === opt.key
                          ? 'border-2 text-sand'
                          : 'border-sand/10 text-sand/50 hover:border-sand/30'
                      }`}
                      style={stateBefore === opt.key ? { borderColor: opt.color, backgroundColor: `${opt.color}25` } : {}}
                    >
                      {t('resonance', `state_${opt.key}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Circle 2: After */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold/60 mb-2">
                  {t('resonance', 'afterTitle')}
                </p>
                <p className="text-[10px] text-sand/50 mb-3 italic">{t('resonance', 'afterHint')}</p>
                <div className="space-y-1.5">
                  {stateOptions.map((opt) => (
                    <button
                      key={`after-${opt.key}`}
                      onClick={() => setStateAfter(opt.key)}
                      disabled={!stateBefore}
                      className={`w-full px-2.5 py-1.5 rounded-full text-[10px] transition-all border disabled:opacity-30 ${
                        stateAfter === opt.key
                          ? 'border-2 text-sand'
                          : 'border-sand/10 text-sand/50 hover:border-sand/30'
                      }`}
                      style={stateAfter === opt.key ? { borderColor: opt.color, backgroundColor: `${opt.color}25` } : {}}
                    >
                      {t('resonance', `state_${opt.key}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit + Skip */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={handleFeedbackSkip}
                className="text-[10px] text-sand/40 hover:text-sand/70 uppercase tracking-[0.2em] transition-colors"
              >
                {t('resonance', 'skip')}
              </button>
              <button
                onClick={handleFeedbackSubmit}
                disabled={!stateBefore || !stateAfter}
                className="px-5 py-2 rounded-full bg-gold/30 text-gold text-[11px] uppercase tracking-[0.15em] hover:bg-gold/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ✓
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Thanks message after feedback done */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={SLOW}
              className="text-sand/60 text-xs italic mb-6"
            >
              {!feedbackSkipped || (stateBefore && stateAfter) ? t('resonance', 'thanks') : ''}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ...SLOW }}
              className="text-sand/70 text-sm leading-relaxed max-w-sm mb-8"
            >
              {t('sadhana', 'grounding')}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, ...SLOW }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('home')}
              className="px-8 py-4 rounded-3xl bg-gold/90 text-obsidian font-medium hover:bg-gold transition-colors"
            >
              {t('sadhana', 'returnTo')}
            </motion.button>
          </>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      key="sadhana_session"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={SLOW}
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center relative"
      style={{
        background: `radial-gradient(ellipse at center, ${practice.color}15 0%, transparent 70%)`,
      }}
    >
      {/* Hidden audio elements — 3 layers */}
      {/* Layer 1: Ambient background (loop) */}
      <audio ref={ambientAudioRef} src={practice.audio.ambient} loop preload="auto" />
      {/* Layer 2: Binaural beats (loop, requires headphones) */}
      <audio ref={binauralAudioRef} src={practice.audio.binaural} loop preload="auto" />
      {/* Layer 3a: Voice intro (one-shot, plays on session start) */}
      <audio
        ref={voiceIntroAudioRef}
        src={practice.audio.voice_intro}
        preload="auto"
        onEnded={handleVoiceIntroEnded}
      />
      {/* Layer 3b: Voice loop (one-shot, scheduled every 90s) */}
      <audio ref={voiceLoopAudioRef} src={practice.audio.voice_loop} preload="auto" />
      {/* Layer 3c: Voice outro (one-shot, plays on session end) */}
      <audio
        ref={voiceOutroAudioRef}
        src={practice.audio.voice_outro}
        preload="auto"
        onEnded={handleVoiceOutroEnded}
      />

      {/* Headphone notice (binaural beats require headphones) */}
      <AnimatePresence>
        {showHeadphoneNotice && !audioError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={SLOW}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-30 max-w-xs"
          >
            <div className="px-4 py-3 rounded-2xl bg-slate/90 border border-gold/30 backdrop-blur-sm">
              <p className="text-[11px] text-sand/70 leading-relaxed">
                🎧 Untuk efek binaural beats optimal, gunakan headphone.
              </p>
              <button
                onClick={() => setShowHeadphoneNotice(false)}
                className="mt-1.5 text-[10px] text-gold/70 hover:text-gold uppercase tracking-wider"
              >
                Mengerti
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <button
          onClick={handleStop}
          className="flex items-center gap-2 text-sand/50 hover:text-sand transition-colors text-sm"
        >
          <ArrowLeft size={16} /> {t('sadhana', 'back')}
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-2xl bg-slate/40 text-sand/60 hover:text-sand transition-colors"
          >
            {audioMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>

      {/* Session title */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SLOW}
        className="text-xs uppercase tracking-[0.3em] text-sand/40 mb-2"
      >
        {t('sadhana', 'sessionTitle')}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, ...SLOW }}
        className="font-heading text-2xl text-sand mb-2"
      >
        {practiceName}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, ...SLOW }}
        className="text-[10px] text-gold/60 uppercase tracking-wider mb-10"
      >
        {practice.frequency}
      </motion.p>

      {/* Breathing visual */}
      <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>
        {/* Outer glow */}
        <motion.div
          animate={{ scale: breathScale, opacity: breathScale > 1 ? 0.6 : 0.3 }}
          transition={{ duration: currentPhase?.duration || 4, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full blur-3xl"
          style={{ backgroundColor: practice.color }}
        />
        {/* Main circle */}
        <motion.div
          animate={{ scale: breathScale }}
          transition={{ duration: currentPhase?.duration || 4, ease: 'easeInOut' }}
          className="relative w-48 h-48 rounded-full border-2 flex items-center justify-center"
          style={{
            borderColor: practice.color,
            background: `radial-gradient(circle, ${practice.color}30 0%, transparent 70%)`,
          }}
        >
          {/* Inner circle */}
          <motion.div
            animate={{ scale: breathScale * 0.7 }}
            transition={{ duration: currentPhase?.duration || 4, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-full"
            style={{ backgroundColor: practice.color, opacity: 0.5 }}
          />
        </motion.div>

        {/* Phase label overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {!isOutro && (
            <>
              <motion.p
                key={phaseLabel}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={SLOW}
                className="font-heading text-xl text-sand"
              >
                {phaseLabel}
              </motion.p>
              <motion.p
                key={phaseRemaining}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-heading text-gold mt-1 tabular-nums"
              >
                {phaseRemaining}
              </motion.p>
            </>
          )}
        </div>
      </div>

      {/* Mantra (display only, not translated) */}
      {!isOutro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="mt-12 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-sand/30 mb-2">{t('sadhana', 'mantra')}</p>
          <p className="font-heading text-base text-gold/80 italic">
            {practice.id === 'sanskara' ? practice.mantra_default : practice.mantra}
          </p>
          <p className="text-[10px] text-sand/40 mt-3">
            {cycleCount + 1} / {totalCycles}
          </p>
        </motion.div>
      )}

      {/* Outro state — show grounding text */}
      {isOutro && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SLOWER}
          className="mt-12 max-w-md px-6"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/50 mb-3">
            {t('sadhana', 'sessionOutro')}
          </p>
          <p className="text-sand/70 text-sm leading-relaxed italic">{t('sadhana', 'grounding')}</p>
        </motion.div>
      )}

      {/* Bottom controls */}
      <div className="absolute bottom-8 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePause}
          disabled={isOutro}
          className="p-4 rounded-full bg-slate/60 border border-sand/10 text-sand hover:border-gold/40 transition-colors disabled:opacity-40"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStop}
          className="p-4 rounded-full bg-slate/60 border border-sand/10 text-sand hover:border-gold/40 transition-colors"
        >
          <Square size={18} />
        </motion.button>
      </div>

      {/* Audio error indicator (autoplay blocked) */}
      {audioError === 'audio_blocked' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-24 text-[10px] text-sand/40 italic max-w-xs px-4"
        >
          🔊 Tekan tombol play di bawah untuk memulai audio (browser memblokir autoplay).
        </motion.div>
      )}
    </motion.div>
  )
}


// =============================================================================
// LAYAR H: DANA PUNIA — Menjaga Api DARPANA (Donation Page)
//
// Halaman tenang untuk menjelaskan model ekonomi Dana Punia (donasi sukarela).
// Tidak ada iklan, tidak ada paywall, tidak ada paksaan.
// Link donasi: https://linktr.ee/Slegna
// =============================================================================
const DANA_PUNIA_LINK = 'https://linktr.ee/Slegna'

function DanaPunia({ onNavigate }) {
  const { lang } = useLanguage()
  const t = getT(lang)

  const handleGive = () => {
    // Buka Linktree di tab baru
    if (typeof window !== 'undefined') {
      window.open(DANA_PUNIA_LINK, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      key="dana_punia"
      {...FADE_UP}
      className="min-h-[100dvh] px-6 pt-16 pb-12"
    >
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-sand/50 hover:text-sand transition-colors mb-10 self-start text-sm"
      >
        <ArrowLeft size={16} /> {t('danaPunia', 'back')}
      </button>

      <div className="max-w-md w-full mx-auto">
        {/* Header — Flame icon (the "Api DARPANA") */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={SLOWER}
          className="flex flex-col items-center mb-10"
        >
          <motion.div
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.06, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <div className="absolute inset-0 -m-4 rounded-full bg-gold/10 blur-2xl" />
            <div className="relative p-5 rounded-full bg-gold/10">
              <FlameIcon size={44} strokeWidth={1.3} className="text-gold" />
            </div>
          </motion.div>
          <h1 className="font-heading text-3xl text-gold mt-6 mb-1 text-center">
            {t('danaPunia', 'title')}
          </h1>
          <p className="text-sand/40 text-xs uppercase tracking-[0.3em] text-center">
            {t('danaPunia', 'subtitle')}
          </p>
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...SLOW }}
          className="text-sand/80 text-sm leading-relaxed text-center mb-8"
        >
          {t('danaPunia', 'intro')}
        </motion.p>

        {/* Ask */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...SLOW }}
          className="text-sand/70 text-sm leading-relaxed text-center mb-10 italic"
        >
          {t('danaPunia', 'ask')}
        </motion.p>

        {/* Section 1: No Ads */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ...SLOW }}
          className="p-5 rounded-3xl bg-slate/40 border border-sand/5 mb-3"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-2xl bg-gold/10 mt-0.5">
              <VolumeX size={16} strokeWidth={1.5} className="text-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-base text-sand mb-1.5">
                {t('danaPunia', 'section1Title')}
              </h3>
              <p className="text-sand/60 text-xs leading-relaxed">{t('danaPunia', 'section1Body')}</p>
            </div>
          </div>
        </motion.div>

        {/* Section 2: No Paywall */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ...SLOW }}
          className="p-5 rounded-3xl bg-slate/40 border border-sand/5 mb-3"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-2xl bg-sage/10 mt-0.5">
              <Flower size={16} strokeWidth={1.5} className="text-sage" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-base text-sand mb-1.5">
                {t('danaPunia', 'section2Title')}
              </h3>
              <p className="text-sand/60 text-xs leading-relaxed">{t('danaPunia', 'section2Body')}</p>
            </div>
          </div>
        </motion.div>

        {/* Section 3: How We Sustain */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, ...SLOW }}
          className="p-5 rounded-3xl bg-slate/40 border border-sand/5 mb-3"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-2xl bg-gold/10 mt-0.5">
              <Heart size={16} strokeWidth={1.5} className="text-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-base text-sand mb-1.5">
                {t('danaPunia', 'section3Title')}
              </h3>
              <p className="text-sand/60 text-xs leading-relaxed">{t('danaPunia', 'section3Body')}</p>
            </div>
          </div>
        </motion.div>

        {/* Section 4: Three Promises */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, ...SLOW }}
          className="p-5 rounded-3xl bg-slate/50 border border-gold/15 mb-10"
        >
          <h3 className="font-heading text-base text-gold mb-4 text-center">
            {t('danaPunia', 'section4Title')}
          </h3>
          <div className="space-y-2.5">
            <PromiseItem text={t('danaPunia', 'promise1')} />
            <PromiseItem text={t('danaPunia', 'promise2')} />
            <PromiseItem text={t('danaPunia', 'promise3')} />
          </div>
        </motion.div>

        {/* Give Button — calm, not pushy */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, ...SLOW }}
          className="text-center mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={SLOW}
            onClick={handleGive}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-3xl bg-gold/90 text-obsidian font-medium hover:bg-gold transition-colors"
          >
            <Heart size={16} strokeWidth={1.8} />
            {t('danaPunia', 'giveButton')}
            <ExternalLink size={14} strokeWidth={1.8} className="opacity-70" />
          </motion.button>
          <p className="text-[10px] text-sand/40 mt-3 italic">{t('danaPunia', 'giveNote')}</p>
        </motion.div>

        {/* No pressure */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, ...SLOW }}
          className="text-sand/50 text-xs leading-relaxed text-center italic mb-10"
        >
          {t('danaPunia', 'noPressure')}
        </motion.p>

        {/* Closing quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="border-t border-sand/5 pt-8 mb-8"
        >
          <p className="text-sand/40 text-xs leading-relaxed text-center italic">
            {t('danaPunia', 'closingQuote')}
          </p>
        </motion.div>

        {/* Thanks section */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, ...SLOW }}
          className="text-center"
        >
          <p className="text-gold/70 text-xs uppercase tracking-[0.3em] mb-3">
            {t('danaPunia', 'thanksTitle')}
          </p>
          <p className="text-sand/55 text-xs leading-relaxed">{t('danaPunia', 'thanksBody')}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

function PromiseItem({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-gold/60 flex-shrink-0" />
      <p className="text-sand/75 text-sm">{text}</p>
    </div>
  )
}


// =============================================================================
// LAYAR I: RTA — Menjaga Keseimbangan Sistem (Bug Report)
// =============================================================================
function RtaImbalance({ onNavigate }) {
  const { lang } = useLanguage()
  const t = getT(lang)

  const [section, setSection] = useState('')
  const [description, setDescription] = useState('')
  const [context, setContext] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const sectionOptions = [
    { value: 'peta_sanskara', label: t('rta', 'section_peta_sanskara') },
    { value: 'ruang_sadhana', label: t('rta', 'section_ruang_sadhana') },
    { value: 'sumur_akasa', label: t('rta', 'section_sumur_akasa') },
    { value: 'lainnya', label: t('rta', 'section_lainnya') },
  ]

  const handleSubmit = async () => {
    setError(null)
    if (!section) {
      setError(t('rta', 'needSection'))
      return
    }
    if (!description.trim()) {
      setError(t('rta', 'needDescription'))
      return
    }

    setSubmitting(true)
    try {
      await submitRtaImbalance({
        section,
        description: description.trim(),
        user_context: context.trim() || null,
      })
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      key="rta"
      {...FADE_UP}
      className="min-h-[100dvh] px-6 pt-16 pb-12"
    >
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-sand/50 hover:text-sand transition-colors mb-10 self-start text-sm"
      >
        <ArrowLeft size={16} /> {t('rta', 'backHome')}
      </button>

      <div className="max-w-md w-full mx-auto">
        {/* Header — Scale icon (keseimbangan) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={SLOWER}
          className="flex flex-col items-center mb-8"
        >
          <div className="p-5 rounded-full bg-sage/10 mb-4">
            <Scale size={40} strokeWidth={1.3} className="text-sage" />
          </div>
          <h1 className="font-heading text-2xl text-sand mb-1 text-center">
            {t('rta', 'title')}
          </h1>
          <p className="text-sand/40 text-xs uppercase tracking-[0.3em] text-center">
            {t('rta', 'subtitle')}
          </p>
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...SLOW }}
          className="text-sand/65 text-xs leading-relaxed text-center mb-8 italic"
        >
          {t('rta', 'intro')}
        </motion.p>

        {submitted ? (
          /* Success screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SLOWER}
            className="text-center py-8"
          >
            <div className="p-4 rounded-full bg-sage/10 w-fit mx-auto mb-6">
              <Scale size={32} strokeWidth={1.3} className="text-sage" />
            </div>
            <p className="text-sand/80 text-sm leading-relaxed max-w-xs mx-auto mb-8">
              {t('rta', 'success')}
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 rounded-2xl bg-sage/30 text-sage font-medium hover:bg-sage/40 transition-colors text-sm"
            >
              {t('rta', 'backHome')}
            </button>
          </motion.div>
        ) : (
          /* Form */
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...SLOW }}
            className="space-y-5"
          >
            {/* Section selector */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-sand/50 mb-3">
                {t('rta', 'sectionLabel')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {sectionOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSection(opt.value)}
                    className={`px-3 py-2.5 rounded-2xl text-xs transition-all border ${
                      section === opt.value
                        ? 'border-sage bg-sage/20 text-sand'
                        : 'border-sand/10 bg-slate/30 text-sand/60 hover:border-sage/30'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-sand/50 mb-2">
                {t('rta', 'descriptionLabel')}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder={t('rta', 'descriptionPlaceholder')}
                className="w-full px-4 py-3 rounded-2xl bg-slate/60 border border-sand/10 text-sand text-sm resize-none focus:outline-none focus:border-sage/40 transition-colors placeholder:text-sand/30"
              />
            </div>

            {/* Context (optional) */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-sand/40 mb-2">
                {t('rta', 'contextLabel')}
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={2}
                placeholder={t('rta', 'contextPlaceholder')}
                className="w-full px-4 py-3 rounded-2xl bg-slate/40 border border-sand/5 text-sand text-xs resize-none focus:outline-none focus:border-sage/30 transition-colors placeholder:text-sand/30"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-[11px] text-gold/70 italic">{error}</p>
            )}

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl bg-sage/30 border border-sage/40 text-sage font-medium hover:bg-sage/40 transition-colors disabled:opacity-50"
            >
              {submitting ? t('rta', 'submitting') : t('rta', 'submit')}
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}


// =============================================================================
// LAYAR J: JEJAK EVOLUSI — The Changelog of Consciousness
// =============================================================================
function JejakEvolusi({ onNavigate }) {
  const { lang } = useLanguage()
  const t = getT(lang)
  const entries = getEvolutionEntries()

  return (
    <motion.div
      key="evolution"
      {...FADE_UP}
      className="min-h-[100dvh] px-6 pt-16 pb-12"
    >
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-sand/50 hover:text-sand transition-colors mb-10 self-start text-sm"
      >
        <ArrowLeft size={16} /> {t('rta', 'backHome')}
      </button>

      <div className="max-w-md w-full mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={SLOWER}
          className="flex flex-col items-center mb-6"
        >
          <div className="p-5 rounded-full bg-gold/10 mb-4">
            <Sparkle size={40} strokeWidth={1.3} className="text-gold" />
          </div>
          <h1 className="font-heading text-2xl text-sand mb-1 text-center">
            {t('evolution', 'title')}
          </h1>
          <p className="text-sand/40 text-xs uppercase tracking-[0.3em] text-center">
            {t('evolution', 'subtitle')}
          </p>
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...SLOW }}
          className="text-sand/65 text-xs leading-relaxed text-center mb-8 italic"
        >
          {t('evolution', 'intro')}
        </motion.p>

        {/* Timeline */}
        {entries.length === 0 ? (
          <p className="text-sand/40 text-sm text-center italic">{t('evolution', 'noEntries')}</p>
        ) : (
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gold/15" />

            <div className="space-y-6">
              {entries.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, ...SLOW }}
                  className="relative pl-10"
                >
                  {/* Dot on timeline */}
                  <div
                    className={`absolute left-2 top-2 w-3 h-3 rounded-full border-2 ${
                      entry.based_on_resonance ? 'bg-sage border-sage' : 'bg-gold border-gold'
                    }`}
                  />

                  {/* Entry card */}
                  <div className="p-4 rounded-2xl bg-slate/40 border border-sand/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-sand/40">
                        {new Date(entry.date).toLocaleDateString(lang === 'id' ? 'id-ID' : lang === 'ja' ? 'ja-JP' : lang === 'zh' ? 'zh-CN' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="text-[10px] text-gold/50 tabular-nums">v{entry.version}</span>
                    </div>
                    <h3 className="font-heading text-base text-sand mb-2">{entry.title}</h3>
                    <p className="text-sand/60 text-xs leading-relaxed mb-2">{entry.body}</p>
                    {entry.based_on_resonance && (
                      <p className="text-[10px] text-sage/60 italic flex items-center gap-1">
                        <Droplet size={9} strokeWidth={1.5} fill="currentColor" />
                        {t('evolution', 'basedOnResonance')}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}


// =============================================================================
// APP — root navigator (wrapped with LanguageProvider)
// =============================================================================
function AppInner() {
  const { lang } = useLanguage()
  const [screen, setScreen] = useState('onboarding')
  const [birthDate, setBirthDate] = useState('')
  const [akasaSeed, setAkasaSeed] = useState(null)
  const [activePractice, setActivePractice] = useState(null)

  const navigate = (target) => setScreen(target)

  const handleAnalyze = (dateStr) => {
    setBirthDate(dateStr)
    setScreen('wuku_result')
  }

  const handleGoToAkasaFromWuku = () => {
    const result = getWukuByDate(birthDate)
    const w = result.wuku
    setAkasaSeed(
      `Aku lahir pada ${birthDate}, yang menurut Pawukon Bali jatuh pada ${result.saptawaraTranslated} ${result.pancawara} Wuku ${w.name} (${w.order}/30). Wuku-ku bhatara-nya ${w.bhatara}, dengan archetype "${w.archetype}". Bayanganku yang paling sering muncul adalah: "${w.shadow_traits[0]}". Bagaimana aku bisa mengolah pola ini dalam hidup sehari-hari?`,
    )
    setScreen('akasa')
  }

  const handleStartSadhanaSession = (practice) => {
    setActivePractice(practice)
    setScreen('sadhana_session')
  }

  return (
    <div className="min-h-[100dvh] w-full bg-obsidian">
      <AnimatePresence mode="wait">
        {screen === 'onboarding' && <Onboarding key="o" onEnter={() => navigate('home')} />}

        {screen === 'home' && <Home key="h" onNavigate={navigate} />}

        {screen === 'wuku_input' && (
          <WukuInput key="wi" onNavigate={navigate} onAnalyze={handleAnalyze} />
        )}

        {screen === 'wuku_result' && (
          <WukuResult
            key="wr"
            onNavigate={(target) => (target === 'akasa_from_wuku' ? handleGoToAkasaFromWuku() : navigate(target))}
            dateString={birthDate}
          />
        )}

        {screen === 'akasa' && (
          <AkasaChat key="a" onNavigate={navigate} initialContext={akasaSeed} />
        )}

        {screen === 'sadhana' && (
          <SadhanaMenu
            key="sm"
            onNavigate={navigate}
            onStartSession={handleStartSadhanaSession}
            birthDate={birthDate}
          />
        )}

        {screen === 'sadhana_session' && activePractice && (
          <SadhanaSession
            key="ss"
            practice={activePractice}
            onNavigate={navigate}
            lang={lang}
          />
        )}

        {screen === 'dana_punia' && <DanaPunia key="dp" onNavigate={navigate} />}

        {screen === 'rta' && <RtaImbalance key="rta" onNavigate={navigate} />}

        {screen === 'evolution' && <JejakEvolusi key="evo" onNavigate={navigate} />}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  )
}
