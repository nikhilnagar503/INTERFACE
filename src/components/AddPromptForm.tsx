import type { FC } from 'react'
import { useState } from 'react'
import { useChat } from '../context/ChatContext'

export const AddPromptForm: FC = () => {
  const { addPrompt, setPromptPage } = useChat()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [prompt, setPrompt] = useState('')
  const [tags, setTags] = useState('')

  const save = () => {
    if (!title.trim() || !prompt.trim()) return
    const tagList = tags.split(',').map(t => t.trim()).filter(Boolean)
    addPrompt({ id: '', title: title.trim(), description: description.trim(), prompt: prompt.trim(), tags: tagList })
    setPromptPage('library')
  }

  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 backdrop-blur border-b border-gray-800">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <h2 className="text-lg font-semibold">Add Prompt</h2>
          <div className="flex items-center gap-2">
            <button className="pill" onClick={() => setPromptPage('library')}>Cancel</button>
            <button className="pill bg-blue-600 text-white border-blue-500" onClick={save}>Add Prompt</button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full p-4 space-y-4">
        <div>
          <label className="block text-sm mb-1">Title*</label>
          <input className="input" placeholder="Prompt title" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Tags</label>
          <input className="input" placeholder="Comma-separated, e.g. Philosophy, Writing" value={tags} onChange={e => setTags(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea className="input min-h-[80px]" placeholder="Describe what the prompt does" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Prompt*</label>
          <textarea className="input min-h-[160px]" placeholder="Enter your prompt template" value={prompt} onChange={e => setPrompt(e.target.value)} />
        </div>
      </div>
    </div>
  )
}
