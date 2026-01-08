import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { Cpu, Search, Factory, Sparkles, Sliders, Info, RefreshCw, Check } from 'lucide-react'
import { useChat } from '../context/ChatContext'

type Provider = 'OpenAI' | 'Anthropic' | 'Google'

type SimpleModel = {
  id: string
  name: string
  provider: Provider
  context: number // tokens
  enabled: boolean
}

const INITIAL: SimpleModel[] = [
  { id: 'gpt-5.2', name: 'GPT-5.2', provider: 'OpenAI', context: 400_000, enabled: true },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', context: 128_000, enabled: true },
  { id: 'claude-35-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', context: 200_000, enabled: true },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', context: 200_000, enabled: false },
  { id: 'gemini-2-pro', name: 'Gemini 2.0 Pro', provider: 'Google', context: 100_000, enabled: true },
  { id: 'gemini-2-flash', name: 'Gemini 2.0 Flash', provider: 'Google', context: 1_000_000, enabled: false },
]

const fmtCtx = (t: number) => (t >= 1_000_000 ? `${Math.round(t / 1_000_000)}M` : `${Math.round(t / 1_000)}K`)

export const ModelStudio: FC = () => {
  const { selectedModel, setSelectedModel } = useChat()

  const [models, setModels] = useState<SimpleModel[]>(INITIAL)
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string>(models[0].id)
  const [defaultId, setDefaultId] = useState<string>(models[0].id)

  // Settings state (page-local)
  const [systemInstruction, setSystemInstruction] = useState('You are a helpful AI assistant.')
  const [stream, setStream] = useState(true)
  const [reasoning, setReasoning] = useState(false)
  const [background, setBackground] = useState(false)
  const [temperature, setTemperature] = useState<'Low' | 'Medium' | 'High'>('Medium')
  const [topP] = useState('Default (0.9)')

  const filtered = useMemo(() => models.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.provider.toLowerCase().includes(search.toLowerCase())), [models, search])
  const selected = filtered.find(m => m.id === selectedId) || filtered[0] || models[0]

  const toggleEnabled = (id: string) => setModels(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m))
  const setAsDefault = (m: SimpleModel) => {
    if (!m.enabled) return
    setDefaultId(m.id)
    setSelectedModel(m.name as any)
  }

  const resetInstruction = () => setSystemInstruction('You are a helpful AI assistant.')

  return (
    <div className="h-full w-full grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-4 p-4">
      {/* Left: Model List */}
      <div className="rounded-2xl bg-gradient-to-br from-gray-900/70 to-gray-950/70 backdrop-blur-md border border-gray-800 overflow-hidden flex flex-col shadow-lg">
        <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <div>
            <div className="text-lg font-semibold">Models</div>
            <div className="text-sm text-gray-400">Manage available AI models</div>
          </div>
        </div>
        <div className="p-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search models…" className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-800 text-gray-200 placeholder:text-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map(m => (
            <button key={m.id} onClick={() => setSelectedId(m.id)} className={`w-full text-left px-4 py-3 border-t border-gray-800 flex items-center justify-between hover:bg-gray-800/60 ${selected?.id===m.id? 'bg-gray-800/70 ring-1 ring-indigo-500':''}`}>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border border-gray-700 flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {m.name}
                    <span className={`text-[10px] px-2 py-1 rounded-full border ${m.provider==='OpenAI'?'border-cyan-500/50 text-cyan-300':m.provider==='Anthropic'?'border-violet-500/50 text-violet-300':'border-amber-500/50 text-amber-300'}`}>{m.provider}</span>
                  </div>
                  <div className="text-xs text-gray-400">Context {fmtCtx(m.context)}</div>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleEnabled(m.id) }} className={`pressable relative inline-flex items-center w-12 h-6 rounded-full ${m.enabled? 'bg-indigo-600':'bg-gray-700'} border border-gray-700`} aria-label="Toggle">
                <span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${m.enabled? 'translate-x-6':''}`}></span>
              </button>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Model Settings */}
      <div className="rounded-2xl bg-gradient-to-br from-gray-900/70 to-gray-950/70 backdrop-blur-md border border-gray-800 p-4 shadow-lg">
        {selected && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold flex items-center gap-2"><Factory className="w-5 h-5 text-gray-400" /> {selected.name}</div>
              {defaultId === selected.id && (
                <span className="text-xs px-2 py-1 rounded-full bg-indigo-600 text-white">Default model</span>
              )}
            </div>

            {/* Basic Info */}
            <div className="rounded-xl border border-gray-800 p-3 bg-gray-900/40">
              <div className="text-sm font-medium mb-2 flex items-center gap-2"><Info className="w-4 h-4 text-gray-400" /> Basic Info</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
                <div><span className="text-gray-500">Model ID:</span> {selected.id}</div>
                <div><span className="text-gray-500">Provider:</span> {selected.provider}</div>
                <div><span className="text-gray-500">Context length:</span> {fmtCtx(selected.context)}</div>
              </div>
              <div className="mt-3">
                <button disabled={!selected.enabled} onClick={() => setAsDefault(selected)} className={`pressable px-3 py-2 rounded-xl ${selected.enabled? 'bg-indigo-600 hover:bg-indigo-500 text-white':'bg-gray-800 text-gray-500 border border-gray-700'}`}>Set as default</button>
              </div>
            </div>

            {/* System Instruction */}
            <div className="rounded-xl border border-gray-800 p-3 bg-gray-900/40">
              <div className="text-sm font-medium mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4 text-indigo-400" /> System Instruction</div>
              <textarea value={systemInstruction} onChange={e => setSystemInstruction(e.target.value)} className="w-full h-28 resize-y px-3 py-2 rounded-xl bg-gray-800 text-gray-200 border border-gray-700" />
              <button onClick={resetInstruction} className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Reset to default</button>
            </div>

            {/* Behavior Settings */}
            <div className="rounded-xl border border-gray-800 p-3 space-y-3 bg-gray-900/40">
              <div className="text-sm font-medium flex items-center gap-2"><Sliders className="w-4 h-4 text-gray-400" /> Behavior Settings</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">Stream responses</div>
                  <div className="text-xs text-gray-500">Send tokens as they are generated</div>
                </div>
                <button onClick={() => setStream(v => !v)} className={`pressable relative inline-flex items-center w-12 h-6 rounded-full ${stream? 'bg-indigo-600':'bg-gray-700'} border border-gray-700`} aria-label="Toggle">
                  <span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${stream? 'translate-x-6':''}`}></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">Enable reasoning mode</div>
                  <div className="text-xs text-gray-500">Use more deliberate thinking when needed</div>
                </div>
                <button onClick={() => setReasoning(v => !v)} className={`pressable relative inline-flex items-center w-12 h-6 rounded-full ${reasoning? 'bg-indigo-600':'bg-gray-700'} border border-gray-700`} aria-label="Toggle">
                  <span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${reasoning? 'translate-x-6':''}`}></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">Enable background mode</div>
                  <div className="text-xs text-gray-500">Continue processing after sending</div>
                </div>
                <button onClick={() => setBackground(v => !v)} className={`pressable relative inline-flex items-center w-12 h-6 rounded-full ${background? 'bg-indigo-600':'bg-gray-700'} border border-gray-700`} aria-label="Toggle">
                  <span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${background? 'translate-x-6':''}`}></span>
                </button>
              </div>
            </div>

            {/* Generation Controls */}
            <div className="rounded-xl border border-gray-800 p-3 grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-900/40">
              <div>
                <div className="text-sm font-medium mb-1">Temperature</div>
                <select value={temperature} onChange={e => setTemperature(e.target.value as any)} className="w-full px-3 py-2 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-indigo-500">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Top-P</div>
                <div className="relative">
                  <input value={topP} readOnly className="w-full pl-8 px-3 py-2 rounded-xl bg-gray-800 text-gray-400 border border-gray-700" />
                  <Info className="w-4 h-4 text-gray-400 absolute left-2 top-2.5" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModelStudio
