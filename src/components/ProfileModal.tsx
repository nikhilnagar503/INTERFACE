import type { FC } from 'react'
import { useState } from 'react'
import { useChat } from '../context/ChatContext'

export const ProfileModal: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { apiKeys, isAuthenticated, user, signIn, signUp, signOut } = useChat()
  const [tab, setTab] = useState<'profile'|'signin'|'signup'>(isAuthenticated ? 'profile' : 'signin')
  const [name, setName] = useState(user?.name || '')
  const [username, setUsername] = useState(user?.username || '')
  const [avatar, setAvatar] = useState(user?.avatarUrl || 'https://avatars.githubusercontent.com/u/9919?s=200&v=4')
  const [password, setPassword] = useState('')

  if (!open) return null

  const mask = (k: string) => k ? `${k.slice(0,3)}••••${k.slice(-3)}` : 'Not set'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-gray-800 bg-gray-950 p-5 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={avatar} alt="avatar" className="w-12 h-12 rounded-full border border-gray-700 object-cover" />
            <div>
              <div className="text-lg font-semibold">{isAuthenticated ? 'Profile' : (tab==='signin' ? 'Sign In' : 'Sign Up')}</div>
              <div className="text-xs text-gray-400">{isAuthenticated ? 'Update your info' : 'Access your account'}</div>
            </div>
          </div>
          {!isAuthenticated && (
            <div className="pill">
              <button className={`text-sm ${tab==='signin' ? 'text-blue-400' : ''}`} onClick={()=>setTab('signin')}>Sign In</button>
              <span className="mx-1 text-gray-500">•</span>
              <button className={`text-sm ${tab==='signup' ? 'text-blue-400' : ''}`} onClick={()=>setTab('signup')}>Sign Up</button>
            </div>
          )}
        </div>

        {isAuthenticated && tab==='profile' ? (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Name</label>
              <input className="input w-full" value={name} onChange={e=>setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Username</label>
              <input className="input w-full" value={username} onChange={e=>setUsername(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Picture URL</label>
              <input className="input w-full" value={avatar} onChange={e=>setAvatar(e.target.value)} />
            </div>
            <div className="panel p-3">
              <div className="font-medium mb-2">API Keys Summary</div>
              <div className="text-sm text-gray-300 space-y-1">
                <div>OpenAI: {mask(apiKeys.openai)}</div>
                <div>Anthropic: {mask(apiKeys.anthropic)}</div>
                <div>Google: {mask(apiKeys.google)}</div>
                <div>Groq: {mask(apiKeys.groq)}</div>
              </div>
            </div>
          </div>
        ) : tab==='signin' ? (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Username</label>
              <input className="input w-full" value={username} onChange={e=>setUsername(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <input className="input w-full" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Name</label>
              <input className="input w-full" value={name} onChange={e=>setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Username</label>
              <input className="input w-full" value={username} onChange={e=>setUsername(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Picture URL</label>
              <input className="input w-full" value={avatar} onChange={e=>setAvatar(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <input className="input w-full" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
          </div>
        )}

        <div className="mt-5 flex justify-between gap-2">
          <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700" onClick={onClose}>Close</button>
          {isAuthenticated ? (
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white" onClick={()=>{ /* save locally */ onClose() }}>Save</button>
              <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white" onClick={()=>{ signOut(); setTab('signin'); onClose() }}>Sign Out</button>
            </div>
          ) : tab==='signin' ? (
            <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white" onClick={()=>{ signIn({ username }); setTab('profile'); onClose() }}>Sign In</button>
          ) : (
            <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white" onClick={()=>{ signUp({ name, username, avatarUrl: avatar }); setTab('profile'); onClose() }}>Sign Up</button>
          )}
        </div>
      </div>
    </div>
  )
}
