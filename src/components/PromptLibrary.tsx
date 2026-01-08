import type { FC } from 'react'
import { useState } from 'react'
import { Plus, BookOpen, Star, Copy, Pencil, Trash, List, Braces, Tag as TagIcon } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import { PromptModal } from './PromptModal'

export const PromptLibrary: FC = () => {
  const { prompts, removePrompt, setPromptPage, toggleFavorite } = useChat()
  const [modalId, setModalId] = useState<string | null>(null)
  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 backdrop-blur border-b border-gray-800">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <div>
            <h2 className="text-lg font-semibold">Prompt Library</h2>
            <p className="text-sm text-gray-400">Prompts are ready-made messages you can customize and use whenever you talk to AI.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="pill bg-blue-600 text-white border-blue-500" onClick={() => setPromptPage('add')}><Plus className="w-4 h-4" /> Add Prompt</button>
            <button className="pill" onClick={() => setPromptPage('browse')}><BookOpen className="w-4 h-4" /> Browse prompts</button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {prompts.length === 0 ? (
          <div className="flex flex-col items-center text-center py-16">
            <h3 className="text-2xl font-semibold">No prompts yet</h3>
            <p className="text-gray-400 mt-2">Save your frequently used prompts for quick access and reuse</p>
            <div className="mt-6 flex items-center gap-3">
              <button className="pressable px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white" onClick={() => setPromptPage('add')}>Create new prompt</button>
              <button className="pressable px-5 py-3 rounded-2xl bg-white/95 text-gray-900" onClick={() => setPromptPage('browse')}>Browse prompts</button>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 gap-4 w-full max-w-3xl">
              <div className="rounded-2xl border border-gray-800 bg-gray-900/60 px-4 py-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center"><List className="w-5 h-5" /></div>
                <div className="text-base">Reusable Prompts</div>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/60 px-4 py-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center"><Braces className="w-5 h-5" /></div>
                <div className="text-base">Variables Support</div>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/60 px-4 py-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center"><TagIcon className="w-5 h-5" /></div>
                <div className="text-base">Organize with Tags</div>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/60 px-4 py-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center"><Star className="w-5 h-5" /></div>
                <div className="text-base">Quick Favorites</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prompts.map(p => (
              <div
                key={p.id}
                className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/70 to-gray-950/70 p-4 cursor-pointer hover:bg-gray-900/80 shadow"
                onClick={() => setModalId(p.id)}
                role="button"
                tabIndex={0}
              >
                <div className="font-medium mb-2">{p.title}</div>
                {p.tags && p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {p.tags.map((t, i) => (
                      <span key={i} className="tag">{t}</span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      className={`icon-btn ${p.favorite ? 'text-yellow-300' : ''}`}
                      title={p.favorite ? 'Unfavorite' : 'Favorite'}
                      aria-label={p.favorite ? 'Unfavorite' : 'Favorite'}
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(p.id) }}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      className="icon-btn"
                      title="Copy prompt"
                      aria-label="Copy prompt"
                      onClick={(e) => { e.stopPropagation(); navigator.clipboard?.writeText(p.prompt) }}
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      className="icon-btn"
                      title="Edit"
                      aria-label="Edit"
                      onClick={(e) => { e.stopPropagation(); setModalId(p.id) }}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="icon-btn"
                      title="Delete"
                      aria-label="Delete"
                      onClick={(e) => { e.stopPropagation(); removePrompt(p.id) }}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="pill">Use now</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {modalId && (
        <PromptModal prompt={prompts.find(x => x.id === modalId)!} onClose={() => setModalId(null)} mode="edit" />
      )}
    </div>
  )
}
