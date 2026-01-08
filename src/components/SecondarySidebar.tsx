import type { FC } from 'react'
import { useMemo } from 'react'
import { ChevronLeft, ChevronRight, Plus, Search, User } from 'lucide-react'
import { useChat } from '../context/ChatContext'


export const SecondarySidebar: FC = () => {
  const { chats, activeChatId, setActiveChatId, createNewChat, searchQuery, setSearchQuery, historyOpen, setHistoryOpen, appTheme } = useChat()

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return chats
    return chats.filter((c) => c.title.toLowerCase().includes(q))
  }, [searchQuery, chats])

  const isLight = appTheme === 'Light'
  return (
    <aside className={`h-full ${isLight ? 'bg-gradient-to-b from-gray-50 to-gray-100 border-gray-300' : 'bg-gradient-to-b from-gray-950 to-gray-900 border-gray-800'} transition-[width] duration-200 ${historyOpen ? 'w-64' : 'w-10'}`}>
      <div className="h-full flex flex-col">
        <div className={`flex items-center justify-between p-3 border-b ${isLight ? 'border-gray-300' : 'border-gray-800'}`}>
          {historyOpen ? (
            <button className="pill" onClick={createNewChat}><Plus className="w-4 h-4" /> New Chat</button>
          ) : (
            <button className="mx-auto" onClick={createNewChat} aria-label="New Chat"><Plus className="w-5 h-5" /></button>
          )}
          <div className="flex items-center gap-2">
            {historyOpen && (
              <button className="icon-btn" aria-label="Profile"><User className="w-5 h-5" /></button>
            )}
            <button className="icon-btn" onClick={() => setHistoryOpen(!historyOpen)} aria-label="Toggle history">
              {historyOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {historyOpen && (
          <div className={`p-3 border-b ${isLight ? 'border-gray-300' : 'border-gray-800'}`}>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                className="input pl-9"
                placeholder="Search chats"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          {filtered.map((c) => (
            <button
              key={c.id}
              className={`w-full text-left px-4 py-3 border-b ${isLight ? 'border-gray-200 hover:bg-gray-100' : 'border-gray-900 hover:bg-gray-900/60'} ${activeChatId === c.id ? (isLight ? 'bg-gray-200 ring-1 ring-indigo-400' : 'bg-gray-800 ring-1 ring-indigo-500') : ''}`}
              onClick={() => setActiveChatId(c.id)}
            >
              <div className="text-sm font-medium">{c.title}</div>
              <div className={`text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Updated {new Date(c.lastUpdated).toLocaleString()}</div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
