import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { Globe, Image, Calculator, Code2, BarChart2, FileText, Mail, Plus } from 'lucide-react'

type ToolCategory = 'Installed Tools' | 'Available Tools' | 'AI Capabilities' | 'Integrations'

type ToolItem = {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  installed: boolean
  category: 'AI Capabilities' | 'Integrations'
}

const INITIAL_TOOLS: ToolItem[] = [
  { id: 'web-search', name: 'Web Search', description: 'Search the web for facts', icon: Globe, installed: true, category: 'AI Capabilities' },
  { id: 'image-gen', name: 'Image Generator', description: 'Create images from text', icon: Image, installed: false, category: 'AI Capabilities' },
  { id: 'calculator', name: 'Calculator', description: 'Accurate math and units', icon: Calculator, installed: true, category: 'AI Capabilities' },
  { id: 'code-runner', name: 'Code Runner', description: 'Execute small code snippets', icon: Code2, installed: false, category: 'AI Capabilities' },
  { id: 'chart-builder', name: 'Chart Builder', description: 'Visualize data quickly', icon: BarChart2, installed: false, category: 'Integrations' },
  { id: 'file-reader', name: 'File Reader', description: 'Read local files safely', icon: FileText, installed: true, category: 'Integrations' },
  { id: 'email-sender', name: 'Email Sender', description: 'Draft and send emails', icon: Mail, installed: false, category: 'Integrations' },
]

export const ToolsPage: FC = () => {
  const [tools, setTools] = useState<ToolItem[]>(INITIAL_TOOLS)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ToolCategory>('Installed Tools')

  const filtered = useMemo(() => {
    let list = tools.filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
    if (category === 'Installed Tools') list = list.filter(t => t.installed)
    if (category === 'Available Tools') list = list.filter(t => !t.installed)
    if (category === 'AI Capabilities') list = list.filter(t => t.category === 'AI Capabilities')
    if (category === 'Integrations') list = list.filter(t => t.category === 'Integrations')
    return list
  }, [tools, search, category])

  const addCustom = () => {
    const id = `custom-${Math.random().toString(36).slice(2, 8)}`
    setTools(prev => [{ id, name: 'Custom Tool', description: 'Your custom capability', icon: Code2, installed: true, category: 'Integrations' }, ...prev])
  }

  const install = (id: string) => setTools(prev => prev.map(t => t.id === id ? { ...t, installed: true } : t))

  const categories: ToolCategory[] = ['Installed Tools', 'Available Tools', 'AI Capabilities', 'Integrations']

  return (
    <div className="h-full w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 p-4">
      {/* Left: Categories */}
      <div className="panel overflow-hidden">
        <div className="p-3 border-b border-gray-800">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tools…" className="input" />
        </div>
        <div className="py-2">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`w-full text-left px-4 py-2 hover:bg-gray-800/60 ${category===c? 'bg-gray-800 text-white':''}`}>
              <span className="text-sm">{c}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Gallery */}
      <div className="panel p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">Tools</div>
            <div className="text-sm text-gray-400">Enhance your AI with additional capabilities</div>
          </div>
          <button className="pressable px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white" onClick={addCustom}><Plus className="w-4 h-4" /> Add Tool</button>
        </div>

        {/* Minimal content; no extra filters to keep it simple */}

        {/* Cards */}
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(t => {
            const Icon = t.icon
            return (
              <div key={t.id} className="card p-4 hover:bg-gray-900/70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-gray-300" />
                    </div>
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-xs text-gray-400">{t.description}</div>
                    </div>
                  </div>
                  {t.installed ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-700 text-white">Active</span>
                  ) : (
                    <button className="pressable px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white" onClick={() => install(t.id)}>Install</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ToolsPage
