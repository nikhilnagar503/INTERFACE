import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { useChat } from '../context/ChatContext'
import { KeyRound, SlidersHorizontal, MonitorCog, Mic, User } from 'lucide-react'

const SectionButton: FC<{label: string; icon: any; active: boolean; onClick: () => void}> = ({label, icon: Icon, active, onClick}) => (
  <button
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${active ? 'bg-gray-800 text-white ring-1 ring-indigo-500' : 'text-gray-300 hover:bg-gray-800/60'}`}
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm">{label}</span>
  </button>
)

export const SettingsPage: FC = () => {
  const {
    appTheme, setAppTheme,
    fontSize, setFontSize,
    sidebarStyle, setSidebarStyle,
    streaming, setStreaming,
    soundNotifications, setSoundNotifications,
    apiKeys, setApiKeys,
    voiceProvider, setVoiceProvider,
    voiceAutoStart, setVoiceAutoStart,
    voiceAutoSend, setVoiceAutoSend,
  } = useChat()

  const [tab, setTab] = useState<'api'|'general'|'appearance'|'voice'>('api')
  const [editing, setEditing] = useState<{openai:boolean; anthropic:boolean; google:boolean; groq:boolean}>({
    openai: !apiKeys.openai,
    anthropic: !apiKeys.anthropic,
    google: !apiKeys.google,
    groq: !apiKeys.groq
  })
  const [tmpKeys, setTmpKeys] = useState(apiKeys)
  useEffect(()=>{ setTmpKeys(apiKeys) }, [apiKeys])

  return (
    <div className="h-full grid grid-cols-[220px_1fr]">
      {/* Left nav */}
      <aside className="border-r border-gray-800 p-3 flex flex-col gap-2 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="text-xs uppercase tracking-wide text-gray-400 px-1">Settings</div>
        <SectionButton label="API Keys" icon={KeyRound} active={tab==='api'} onClick={() => setTab('api')} />
        <SectionButton label="General" icon={SlidersHorizontal} active={tab==='general'} onClick={() => setTab('general')} />
        <SectionButton label="Appearance" icon={MonitorCog} active={tab==='appearance'} onClick={() => setTab('appearance')} />
        <SectionButton label="Voice Input" icon={Mic} active={tab==='voice'} onClick={() => setTab('voice')} />
        <div className="mt-auto px-1 text-xs text-gray-500">Profile available from sidebar</div>
      </aside>

      {/* Right content */}
      <div className="p-6 space-y-6">
        {tab === 'api' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">API Keys</h2>
            {/* OpenAI */}
            <div className="panel p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">OpenAI API Key</label>
                  <span className="tag text-xs">{apiKeys.openai ? `Saved: ${apiKeys.openai.slice(0,3)}••••${apiKeys.openai.slice(-3)}` : 'Not set'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">Get API key here</a>
                  {!editing.openai ? (
                    <button className="pill" onClick={()=>setEditing({...editing, openai:true})}>Change Key</button>
                  ) : (
                    <button className="pill bg-blue-600 text-white" onClick={()=>{ setApiKeys({...apiKeys, openai: tmpKeys.openai}); setEditing({...editing, openai:false}) }}>Save</button>
                  )}
                </div>
              </div>
              <input className="input w-full" type="password" placeholder="sk-..." value={tmpKeys.openai} onChange={e=>setTmpKeys({...tmpKeys, openai: e.target.value})} disabled={!editing.openai} />
            </div>
            {/* Anthropic */}
            <div className="panel p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">Anthropic API Key</label>
                  <span className="tag text-xs">{apiKeys.anthropic ? `Saved: ${apiKeys.anthropic.slice(0,3)}••••${apiKeys.anthropic.slice(-3)}` : 'Not set'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <a href="https://console.anthropic.com/login?selectAccount=true&returnTo=%2Fsettings%2Fkeys%3F" target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">Get API key here</a>
                  {!editing.anthropic ? (
                    <button className="pill" onClick={()=>setEditing({...editing, anthropic:true})}>Change Key</button>
                  ) : (
                    <button className="pill bg-blue-600 text-white" onClick={()=>{ setApiKeys({...apiKeys, anthropic: tmpKeys.anthropic}); setEditing({...editing, anthropic:false}) }}>Save</button>
                  )}
                </div>
              </div>
              <input className="input w-full" type="password" placeholder="sk-ant-..." value={tmpKeys.anthropic} onChange={e=>setTmpKeys({...tmpKeys, anthropic: e.target.value})} disabled={!editing.anthropic} />
            </div>
            {/* Google */}
            <div className="panel p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">Google Gemini API Key</label>
                  <span className="tag text-xs">{apiKeys.google ? `Saved: ${apiKeys.google.slice(0,3)}••••${apiKeys.google.slice(-3)}` : 'Not set'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <a href="https://aistudio.google.com/app/api-keys" target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">Get API key here</a>
                  {!editing.google ? (
                    <button className="pill" onClick={()=>setEditing({...editing, google:true})}>Change Key</button>
                  ) : (
                    <button className="pill bg-blue-600 text-white" onClick={()=>{ setApiKeys({...apiKeys, google: tmpKeys.google}); setEditing({...editing, google:false}) }}>Save</button>
                  )}
                </div>
              </div>
              <input className="input w-full" type="password" placeholder="AIza..." value={tmpKeys.google} onChange={e=>setTmpKeys({...tmpKeys, google: e.target.value})} disabled={!editing.google} />
            </div>
            {/* Groq */}
            <div className="panel p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">Groq API Key</label>
                  <span className="tag text-xs">{apiKeys.groq ? `Saved: ${apiKeys.groq.slice(0,3)}••••${apiKeys.groq.slice(-3)}` : 'Not set'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">Get API key here</a>
                  {!editing.groq ? (
                    <button className="pill" onClick={()=>setEditing({...editing, groq:true})}>Change Key</button>
                  ) : (
                    <button className="pill bg-blue-600 text-white" onClick={()=>{ setApiKeys({...apiKeys, groq: tmpKeys.groq}); setEditing({...editing, groq:false}) }}>Save</button>
                  )}
                </div>
              </div>
              <input className="input w-full" type="password" placeholder="gsk_..." value={tmpKeys.groq} onChange={e=>setTmpKeys({...tmpKeys, groq: e.target.value})} disabled={!editing.groq} />
            </div>
          </div>
        )}

        {tab === 'general' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">General</h2>
            <div className="panel flex items-center justify-between">
              <div>
                <div className="font-medium">Stream AI responses</div>
                <div className="text-sm text-gray-400">Typing animation on responses</div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only" checked={streaming} onChange={e=>setStreaming(e.target.checked)} />
                <span className={`toggle ${streaming ? 'bg-blue-600' : 'bg-gray-700'}`}> <span className={`toggle-thumb ${streaming ? 'translate-x-5' : ''}`} /> </span>
              </label>
            </div>
            <div className="panel flex items-center justify-between">
              <div>
                <div className="font-medium">Sound notifications</div>
                <div className="text-sm text-gray-400">Play sound when response arrives</div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only" checked={soundNotifications} onChange={e=>setSoundNotifications(e.target.checked)} />
                <span className={`toggle ${soundNotifications ? 'bg-blue-600' : 'bg-gray-700'}`}> <span className={`toggle-thumb ${soundNotifications ? 'translate-x-5' : ''}`} /> </span>
              </label>
            </div>
          </div>
        )}

        {tab === 'appearance' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Appearance</h2>
            <div className="panel">
              <label className="block text-sm text-gray-300 mb-1">App theme</label>
              <select className="input w-full" value={appTheme} onChange={e=>setAppTheme(e.target.value as any)}>
                <option>Dark</option>
                <option>Light</option>
              </select>
            </div>
            <div className="panel">
              <label className="block text-sm text-gray-300 mb-1">Font size</label>
              <select className="input w-full" value={fontSize} onChange={e=>setFontSize(e.target.value as any)}>
                <option>Small</option>
                <option>Medium</option>
              </select>
            </div>
            <div className="panel">
              <label className="block text-sm text-gray-300 mb-1">Sidebar style</label>
              <select className="input w-full" value={sidebarStyle} onChange={e=>setSidebarStyle(e.target.value as any)}>
                <option>Default</option>
                <option>Compact</option>
                <option>Standard</option>
              </select>
            </div>
          </div>
        )}

        {tab === 'voice' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Voice Input</h2>
            <div className="panel">
              <label className="block text-sm text-gray-300 mb-1">Speech-to-Text Provider</label>
              <select className="input w-full" value={voiceProvider} onChange={e=>setVoiceProvider(e.target.value as any)}>
                <option>Web API (Free)</option>
              </select>
            </div>
            <div className="panel flex items-center justify-between">
              <div>
                <div className="font-medium">Auto start recording when open</div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only" checked={voiceAutoStart} onChange={e=>setVoiceAutoStart(e.target.checked)} />
                <span className={`toggle ${voiceAutoStart ? 'bg-blue-600' : 'bg-gray-700'}`}> <span className={`toggle-thumb ${voiceAutoStart ? 'translate-x-5' : ''}`} /> </span>
              </label>
            </div>
            <div className="panel flex items-center justify-between">
              <div>
                <div className="font-medium">Auto send message after speaking</div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only" checked={voiceAutoSend} onChange={e=>setVoiceAutoSend(e.target.checked)} />
                <span className={`toggle ${voiceAutoSend ? 'bg-blue-600' : 'bg-gray-700'}`}> <span className={`toggle-thumb ${voiceAutoSend ? 'translate-x-5' : ''}`} /> </span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
