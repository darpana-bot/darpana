// =============================================================================
// DARPANA — Language Context
// Global state untuk bahasa aktif + persist ke localStorage
// =============================================================================
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const LanguageContext = createContext({
  lang: 'id',
  setLang: () => {},
})

const STORAGE_KEY = 'darpana-lang'

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' && window.localStorage?.getItem(STORAGE_KEY)
      return saved || 'id'
    } catch {
      return 'id'
    }
  })

  const setLang = useCallback((newLang) => {
    setLangState(newLang)
    try {
      window.localStorage?.setItem(STORAGE_KEY, newLang)
    } catch {
      // ignore storage errors
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
