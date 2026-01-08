import type { FC } from 'react'
import { Cpu, MessageSquare, Library, Settings, User, Wrench } from 'lucide-react'
import { useChat, type Section } from '../context/ChatContext'
import clsx from 'clsx'
import { useState } from 'react'
import { ProfileModal } from './ProfileModal'

const navItems: { key: Section; icon: React.ComponentType<any> }[] = [
  { key: 'Chat', icon: MessageSquare },
  { key: 'Prompts', icon: Library },
  { key: 'Models', icon: Cpu },
  { key: 'Tools', icon: Wrench },
  { key: 'Settings', icon: Settings },
]

export const PrimarySidebar: FC = () => {
  const { section, setSection, sidebarStyle, appTheme } = useChat()
  const wide = sidebarStyle === 'Standard'
  const compact = sidebarStyle === 'Compact'
  const [profileOpen, setProfileOpen] = useState(false)
  const isLight = appTheme === 'Light'

  return (
    <aside className={`${compact ? 'w-12' : wide ? 'w-48' : 'w-12 sm:w-14 lg:w-40'} h-full ${isLight ? 'bg-gradient-to-b from-gray-50 to-gray-100 border-gray-300' : 'bg-gradient-to-b from-gray-950 to-gray-900 border-gray-800'} flex flex-col items-center p-2 gap-2`}>
      <div className="text-sm font-semibold">LLM</div>
      {navItems.map(({ key, icon: Icon }) => (
        <button
          key={key}
          className={clsx(
            `w-full ${wide ? 'flex-row justify-start' : 'flex-col'} flex items-center gap-1 px-2 py-3 rounded-lg ${isLight ? 'hover:bg-gray-200/60' : 'hover:bg-gray-800/60'} transition-colors pressable`,
            section === key ? (isLight ? 'bg-gray-200 text-gray-900 ring-1 ring-indigo-400' : 'bg-gray-800 text-white ring-1 ring-indigo-500') : (isLight ? 'text-gray-700' : 'text-gray-300')
          )}
          onClick={() => setSection(key)}
          aria-label={key}
        >
          <Icon className="w-5 h-5" />
          {!compact && <span className="text-xs ml-1">{key}</span>}
        </button>
      ))}
      <div className="mt-auto w-full flex justify-center">
        <button className={`w-10 h-10 rounded-md ${isLight ? 'bg-gray-200 text-gray-800 border border-gray-300 hover:bg-gray-300' : 'bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700'} flex items-center justify-center pressable`} aria-label="Profile" onClick={() => setProfileOpen(true)}>
          <User className="w-5 h-5" />
        </button>
      </div>
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </aside>
  )
}
