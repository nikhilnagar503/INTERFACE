import type { FC } from 'react'
import { useChat } from '../context/ChatContext'
import { MessageSquare, BookOpen, Zap, FileText, Keyboard, Sparkles } from 'lucide-react'

export const ChatEmpty: FC = () => {
  const { createNewChat, setPromptPage, addUserMessage } = useChat() as any

  const starters = [
    'Give me 3 ideas to improve productivity this week.',
    'Summarize this text I will paste next.',
    'Write a friendly email to request a status update.',
  ]

  return (
    <div className="flex flex-col items-center text-center py-16">
      <h3 className="text-2xl font-semibold">Start a conversation</h3>
      <p className="text-gray-400 mt-2">Type a message below, or use a quick starter to begin.</p>

      <div className="mt-6 flex items-center gap-3">
        <button className="pressable px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white inline-flex items-center gap-2" onClick={createNewChat}><MessageSquare className="w-4 h-4" /> New Chat</button>
        <button className="pressable px-5 py-3 rounded-2xl bg-white/95 text-gray-900 inline-flex items-center gap-2" onClick={() => setPromptPage('browse')}><BookOpen className="w-4 h-4" /> Browse prompts</button>
      </div>

      {/* Starter chips */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {starters.map((s, i) => (
          <button key={i} className="pill" onClick={() => addUserMessage(s)}>{s}</button>
        ))}
      </div>

      {/* Decorative feature tiles */}
      <div className="mt-8 grid sm:grid-cols-2 gap-4 w-full max-w-3xl">
        <div className="rounded-2xl border border-gray-800 bg-gray-900/60 px-4 py-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center"><Zap className="w-5 h-5" /></div>
          <div className="text-base">Quick actions</div>
        </div>
        <div className="rounded-2xl border border-gray-800 bg-gray-900/60 px-4 py-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center"><Sparkles className="w-5 h-5" /></div>
          <div className="text-base">Model switching</div>
        </div>
        <div className="rounded-2xl border border-gray-800 bg-gray-900/60 px-4 py-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center"><FileText className="w-5 h-5" /></div>
          <div className="text-base">Markdown support</div>
        </div>
        <div className="rounded-2xl border border-gray-800 bg-gray-900/60 px-4 py-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center"><Keyboard className="w-5 h-5" /></div>
          <div className="text-base">Keyboard shortcuts</div>
        </div>
      </div>
    </div>
  )
}

export default ChatEmpty
