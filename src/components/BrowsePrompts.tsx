import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useChat, type Prompt } from '../context/ChatContext'
import { PromptModal } from './PromptModal'

type Template = { id: string; title: string; description: string; prompt: string; tags?: string[] }

const TEMPLATES: Template[] = [
  { id: 't1', title: 'Create human-like content', description: 'Craft engaging, human-like writing.', prompt: 'You are an expert writer who crafts engaging content about {{topic}}.', tags: ['Content Creation'] },
  { id: 't2', title: 'Copywriter', description: 'Viral advertising copywriter with track record.', prompt: 'Write viral ad copy for {{product}} targeted at {{audience}}.', tags: ['Marketing'] },
  { id: 't3', title: 'Generate Content Ideas', description: 'Develop a series of content ideas.', prompt: 'Brainstorm 10 content ideas about {{theme}} for {{platform}}.', tags: ['Content Strategy'] },
  { id: 't4', title: 'Create Social Media Content', description: 'Social media strategist template.', prompt: 'Create a social media calendar for {{brand}} for {{month}}.', tags: ['Social Media'] },
  { id: 't5', title: 'Write Email Marketing', description: 'Email marketing copy for announcements.', prompt: 'Write a promotional email for {{product}} launching on {{date}}.', tags: ['Marketing'] },
]

export const BrowsePrompts: FC = () => {
  const { addPrompt, setPromptPage } = useChat()
  const [q, setQ] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [multi, setMulti] = useState(false)
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [modal, setModal] = useState<Template | null>(null)

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return TEMPLATES
    return TEMPLATES.filter(t => t.title.toLowerCase().includes(s))
  }, [q])

  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 backdrop-blur border-b border-gray-800">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <h2 className="text-lg font-semibold">Browse Prompts</h2>
          <div className="flex items-center gap-2">
            <button className={`pill ${multi ? 'ring-2 ring-blue-500' : ''}`} onClick={() => setMulti(!multi)}>
              Select multiple
            </button>
            <button className="pill" onClick={() => setPromptPage('library')}>Back to Library</button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-3xl mb-4">
          <div className="relative">
            <input className="input" placeholder="Search prompts…" value={q} onChange={e => setQ(e.target.value)} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map(t => (
            <div
              key={t.id}
              className={`rounded-2xl border ${selected[t.id] ? 'border-blue-600' : 'border-gray-800'} bg-gradient-to-br from-gray-900/70 to-gray-950/70 p-4 cursor-pointer hover:bg-gray-900/80 shadow`}
              onClick={() => setModal(t)}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{t.title}</div>
                <div className="flex items-center gap-2">
                  <button
                    className="rounded-md p-2 bg-gray-800 text-gray-100 hover:bg-gray-700 active:scale-95"
                    title="Open details"
                    onClick={(e) => { e.stopPropagation(); setModal(t) }}
                  >Details</button>
                  <button
                    className="rounded-md p-2 bg-green-600 text-white hover:bg-green-500 active:scale-95"
                    title="Add to library"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (multi) {
                        setSelected(s => ({ ...s, [t.id]: !s[t.id] }))
                      } else {
                        addPrompt({ id: '', title: t.title, description: t.description, prompt: t.prompt, tags: t.tags ?? [] })
                        setPromptPage('library')
                      }
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {t.tags && t.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {t.tags.map((tag, i) => (
                    <span className="tag" key={i}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {multi && (
          <div className="flex justify-end mt-4">
            <button
              className="pill bg-green-600 text-white border-green-500"
              onClick={() => {
                Object.keys(selected).forEach(id => {
                  if (selected[id]) {
                    const t = filtered.find(x => x.id === id)
                    if (t) addPrompt({ id: '', title: t.title, description: t.description, prompt: t.prompt, tags: t.tags ?? [] })
                  }
                })
                setSelected({})
                setMulti(false)
                setPromptPage('library')
              }}
            >Add selected</button>
          </div>
        )}
      </div>
      {modal && (
        <PromptModal prompt={{ id: modal.id, title: modal.title, description: modal.description, prompt: modal.prompt }} onClose={() => setModal(null)} mode="add" />
      )}
    </div>
  )
}
