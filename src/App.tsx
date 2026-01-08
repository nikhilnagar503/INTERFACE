import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import { ChatProvider, useChat } from './context/ChatContext'
import { PrimarySidebar } from './components/PrimarySidebar'
import { SecondarySidebar } from './components/SecondarySidebar'
import { ChatMessage } from './components/ChatMessage'
import { ChatInput } from './components/ChatInput'
import { PromptLibrary } from './components/PromptLibrary'
import { AddPromptForm } from './components/AddPromptForm'
import { BrowsePrompts } from './components/BrowsePrompts'
import { ModelStudio } from './components/ModelStudio'
import { ToolsPage } from './components/ToolsPage'
import { SettingsPage } from './components/SettingsPage'
// Removed ChatEmpty usage to always show chat box

const ChatArea: FC = () => {
  const { chats, activeChatId, addUserMessage } = useChat()
  const chat = chats.find(c => c.id === activeChatId)
  const scroller = useRef<HTMLDivElement | null>(null)
  const suggestions = [
    'Summarize this page clearly',
    'Brainstorm 5 ideas with pros/cons',
    "Explain like I'm 5",
    'Write a concise email reply',
    'Generate test cases for this code'
  ]

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [chat?.messages])

  return (
    <div className="flex-1 h-full flex flex-col">
      <div ref={scroller} className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-3">
        {chat && chat.messages.length > 0 ? (
          chat.messages.map(m => <ChatMessage key={m.id} msg={m} />)
        ) : (
          <div className="grid place-items-center py-10">
            <div className="text-center max-w-xl w-full">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => addUserMessage(s)}
                    className="pill bg-gray-900/70 hover:bg-gray-800 text-gray-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <ChatInput />
    </div>
  )
}

const Layout: FC = () => {
  const { compactMode, section, promptPage, chats, activeChatId, fontSize, appTheme } = useChat()
  const chat = chats.find(c => c.id === activeChatId)
  if (compactMode) {
    return (
      <div className={`h-full ${fontSize === 'Small' ? 'text-sm' : 'text-base'} ${appTheme === 'Light' ? 'theme-light bg-gray-50 text-gray-900' : 'theme-dark bg-gray-950 text-gray-100'}`}>
        {section === 'Chat' && <ChatArea />}
        {section === 'Prompts' && (
          promptPage === 'library' ? <PromptLibrary /> : promptPage === 'add' ? <AddPromptForm /> : <BrowsePrompts />
        )}
        {section === 'Models' && <ModelStudio />}
        {section === 'Tools' && <ToolsPage />}
        {section === 'Settings' && <SettingsPage />}
      </div>
    )
  }
  return (
    <div className={`h-full grid grid-cols-[auto_auto_1fr] ${fontSize === 'Small' ? 'text-sm' : 'text-base'} ${appTheme === 'Light' ? 'theme-light bg-gray-50 text-gray-900' : 'theme-dark bg-gray-950 text-gray-100'}`}>
      <PrimarySidebar />
      {section === 'Chat' ? <SecondarySidebar /> : <div className="w-0" />}
      <div className="relative">
        {section === 'Chat' && (
          <div className="flex-1 h-full flex flex-col">
            <ChatArea />
          </div>
        )}
        {section === 'Prompts' && (
          promptPage === 'library' ? <PromptLibrary /> : promptPage === 'add' ? <AddPromptForm /> : <BrowsePrompts />
        )}
        {section === 'Models' && <ModelStudio />}
        {section === 'Tools' && <ToolsPage />}
        {section === 'Settings' && <SettingsPage />}
      </div>
    </div>
  )
}

const App: FC = () => {
  return (
    <ChatProvider>
      <Layout />
    </ChatProvider>
  )
}

export default App
