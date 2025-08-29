import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setDark(mq.matches)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])

  return (
    <button aria-label="Toggle theme" onClick={() => setDark(v => !v)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
