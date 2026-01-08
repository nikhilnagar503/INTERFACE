import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, FileText, Mic, Paperclip, Plus, Send, Layers, Lightbulb, Timer, Sidebar } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import type { Model } from '../utils/mock'

export const ChatInput: FC = () => {
  const { addUserMessage, selectedModel, setSelectedModel, pluginsEnabled, setPluginsEnabled, compactMode, setCompactMode, appTheme } = useChat()
  const [value, setValue] = useState('')
  const taRef = useRef<HTMLTextAreaElement | null>(null)
  const [modelOpen, setModelOpen] = useState(false)
  const isLight = appTheme === 'Light'

  useEffect(() => {
    const ta = taRef.current
    if (!ta) return
    ta.style.height = '0px'
    ta.style.height = Math.min(180, ta.scrollHeight) + 'px'
  }, [value])

  // Global shortcut: press '/' to focus input
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/') {
        // Avoid typing the '/'
        e.preventDefault()
        taRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const send = () => {
    const v = value.trim()
    if (!v) return
    addUserMessage(v)
    setValue('')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className={`sticky bottom-0 ${isLight ? 'bg-gray-100/90 border-gray-300' : 'bg-gray-950/90 border-gray-800'} backdrop-blur border-t`}>
      <div className="max-w-4xl mx-auto p-3">
        <div className={`${isLight ? 'bg-white border-gray-300' : 'bg-[#060b1a] border-gray-800/60'} rounded-2xl p-3 shadow-soft border`}>
          {/* Top row: model chip + plugin/icon toggles + hint */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  className="pill bg-gray-900/70 text-gray-100"
                  onClick={() => setModelOpen((v: boolean) => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={modelOpen}
                >
                  <span className="font-medium">{selectedModel}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {modelOpen && (
                  <div className="absolute z-20 mt-2 w-44 rounded-xl border border-gray-800 bg-gray-950 shadow-soft">
                    {(['GPT-4','GPT-3.5','Claude','Local Model'] as Model[]).map(m => (
                      <button
                        key={m}
                        role="option"
                        className={`w-full text-left px-3 py-2 hover:bg-gray-800 ${selectedModel === m ? 'text-blue-400' : 'text-gray-200'}`}
                        onClick={() => { setSelectedModel(m); setModelOpen(false) }}
                      >{m}</button>
                    ))}
                  </div>
                )}
              </div>
              <button
                className={`rounded-md p-2 ${pluginsEnabled ? 'bg-blue-600 text-white' : isLight ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-gray-900 text-gray-300'} transition-colors`}
                onClick={() => setPluginsEnabled(!pluginsEnabled)}
                aria-pressed={pluginsEnabled}
                aria-label="Plugins"
              >
                <Layers className="w-5 h-5" />
              </button>
              <button
                className={`rounded-md p-2 ${compactMode ? 'bg-blue-600 text-white' : isLight ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-gray-900 text-gray-300'} transition-colors`}
                onClick={() => setCompactMode(!compactMode)}
                aria-pressed={compactMode}
                aria-label="Toggle compact mode"
                title="Toggle compact mode"
              >
                <Sidebar className="w-5 h-5" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-gray-300">
                <Lightbulb className="w-5 h-5" />
                <Timer className="w-5 h-5" />
              </div>
            </div>
            <div className="text-sm text-gray-400">Press "/" to focus input</div>
          </div>


          {/* Main row: icons + textarea + send */}
          <div className="flex items-end gap-3">
            <div className="flex items-center gap-2 text-gray-300 px-1">
              <button className="icon-btn" aria-label="Add"><Plus className="w-5 h-5" /></button>
              <button className="icon-btn" aria-label="Attach"><Paperclip className="w-5 h-5" /></button>
              <button className="icon-btn" aria-label="Document"><FileText className="w-5 h-5" /></button>
              <button className="icon-btn" aria-label="Voice"><Mic className="w-5 h-5" /></button>
            </div>
            <textarea
              ref={taRef}
              className="flex-1 bg-transparent outline-none resize-none text-sm min-h-[48px] max-h-[180px]"
              placeholder="Type your message…"
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button onClick={send} className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 flex items-center gap-2 pressable" aria-label="Send">
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
        </div>
        <div className="text-xs text-gray-400 px-1 pt-2">Enter: send · Shift+Enter: newline</div>
      </div>
    </div>
  )
}
