import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { useChat, type Prompt } from '../context/ChatContext'

export const PromptModal: FC<{ prompt: Prompt; onClose: () => void; mode?: 'edit' | 'add' }>=({ prompt, onClose, mode='edit' }) => {
  const { updatePrompt, addPrompt } = useChat()
  const [title, setTitle] = useState(prompt.title)
  const [description, setDescription] = useState(prompt.description)
  const [body, setBody] = useState(prompt.prompt)
  const [tags, setTags] = useState<string>((prompt.tags ?? []).join(', '))

  useEffect(() => {
    setTitle(prompt.title)
    setDescription(prompt.description)
    setBody(prompt.prompt)
  }, [prompt])

  const save = () => {
    if (!title.trim() || !body.trim()) return
    const tagList = tags.split(',').map(t => t.trim()).filter(Boolean)
    if (mode === 'edit') {
      updatePrompt({ id: prompt.id, title: title.trim(), description: description.trim(), prompt: body.trim(), tags: tagList })
    } else {
      addPrompt({ id: '', title: title.trim(), description: description.trim(), prompt: body.trim(), tags: tagList })
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-950 to-gray-900 shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <h3 className="text-lg font-semibold">{mode === 'edit' ? 'Edit Prompt' : 'Add Prompt'}</h3>
          <button className="pill" onClick={onClose}>Close</button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm mb-1">Title*</label>
            <input className="input" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Tags</label>
            <input className="input" value={tags} onChange={e => setTags(e.target.value)} placeholder="Comma-separated" />
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea className="input min-h-[80px]" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Prompt*</label>
            <textarea className="input min-h-[160px]" value={body} onChange={e => setBody(e.target.value)} />
          </div>
        </div>
        <div className="flex justify-end gap-2 px-4 pb-4">
          <button className="pill" onClick={onClose}>Cancel</button>
          <button className="pill bg-blue-600 text-white border-blue-500" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  )
}
