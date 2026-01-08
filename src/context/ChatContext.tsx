import type { FC, ReactNode } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import { initialChats, type Chat, type Message, type Model } from '../utils/mock'

export type Section = 'Chat' | 'Prompts' | 'Models' | 'Tools' | 'Settings'
export type Prompt = { id: string; title: string; description: string; prompt: string; favorite?: boolean; tags?: string[] }
export type PromptPage = 'library' | 'add' | 'browse'

interface ChatState {
  section: Section
  setSection: (s: Section) => void

  chats: Chat[]
  activeChatId: string
  setActiveChatId: (id: string) => void
  createNewChat: () => void
  addUserMessage: (content: string) => void

  searchQuery: string
  setSearchQuery: (q: string) => void

  selectedModel: Model
  setSelectedModel: (m: Model) => void

  criticalThinking: boolean
  setCriticalThinking: (v: boolean) => void
  backgroundMode: boolean
  setBackgroundMode: (v: boolean) => void

  historyOpen: boolean
  setHistoryOpen: (v: boolean) => void

  pluginsEnabled: boolean
  setPluginsEnabled: (v: boolean) => void

  compactMode: boolean
  setCompactMode: (v: boolean) => void

  // Prompts
  prompts: Prompt[]
  addPrompt: (p: Prompt) => void
  updatePrompt: (p: Prompt) => void
  removePrompt: (id: string) => void
  toggleFavorite: (id: string) => void
  promptPage: PromptPage
  setPromptPage: (p: PromptPage) => void

  // Settings
  appTheme: 'Dark' | 'Light'
  setAppTheme: (t: 'Dark' | 'Light') => void
  fontSize: 'Small' | 'Medium'
  setFontSize: (s: 'Small' | 'Medium') => void
  sidebarStyle: 'Default' | 'Compact' | 'Standard'
  setSidebarStyle: (s: 'Default' | 'Compact' | 'Standard') => void
  streaming: boolean
  setStreaming: (v: boolean) => void
  soundNotifications: boolean
  setSoundNotifications: (v: boolean) => void
  apiKeys: { openai: string; anthropic: string; google: string; groq: string }
  setApiKeys: (k: { openai: string; anthropic: string; google: string; groq: string }) => void
  voiceProvider: 'Web API (Free)'
  setVoiceProvider: (p: 'Web API (Free)') => void
  voiceAutoStart: boolean
  setVoiceAutoStart: (v: boolean) => void
  voiceAutoSend: boolean
  setVoiceAutoSend: (v: boolean) => void

  // Auth / Profile
  isAuthenticated: boolean
  user: { name: string; username: string; avatarUrl: string } | null
  signIn: (u: { username: string; name?: string; avatarUrl?: string }) => void
  signUp: (u: { name: string; username: string; avatarUrl: string }) => void
  signOut: () => void
}

const ChatContext = createContext<ChatState | null>(null)

export const useChat = () => {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('ChatContext missing')
  return ctx
}

export const ChatProvider: FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  const [section, setSection] = useState<Section>('Chat')
  const [chats, setChats] = useState<Chat[]>(initialChats)
  const [activeChatId, setActiveChatId] = useState<string>(initialChats[0]?.id ?? 'chat-1')
  const [searchQuery, setSearchQuery] = useState('')

  const [selectedModel, setSelectedModel] = useState<Model>('GPT-4')
  const [criticalThinking, setCriticalThinking] = useState(false)
  const [backgroundMode, setBackgroundMode] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(true)
  const [pluginsEnabled, setPluginsEnabled] = useState(false)
  const [compactMode, setCompactMode] = useState(false)
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [promptPage, setPromptPage] = useState<PromptPage>('library')

  // Settings state
  const [appTheme, setAppTheme] = useState<'Dark' | 'Light'>('Dark')
  const [fontSize, setFontSize] = useState<'Small' | 'Medium'>('Small')
  const [sidebarStyle, setSidebarStyle] = useState<'Default' | 'Compact' | 'Standard'>('Default')
  const [streaming, setStreaming] = useState(true)
  const [soundNotifications, setSoundNotifications] = useState(true)
  const [apiKeys, setApiKeys] = useState<{ openai: string; anthropic: string; google: string; groq: string }>({ openai: '', anthropic: '', google: '', groq: '' })
  const [voiceProvider, setVoiceProvider] = useState<'Web API (Free)'>('Web API (Free)')
  const [voiceAutoStart, setVoiceAutoStart] = useState(false)
  const [voiceAutoSend, setVoiceAutoSend] = useState(false)

  // Auth state (UI-only)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; username: string; avatarUrl: string } | null>(null)

  const createNewChat = () => {
    const id = `chat-${Math.random().toString(36).slice(2, 8)}`
    const newChat: Chat = { id, title: 'New Chat', lastUpdated: Date.now(), messages: [] }
    setChats((prev: Chat[]) => [newChat, ...prev])
    setActiveChatId(id)
  }

  const addUserMessage = (content: string) => {
    const userMsg: Message = {
      id: `m-${Math.random().toString(36).slice(2, 10)}`,
      role: 'user',
      content,
      createdAt: Date.now(),
    }
    setChats((prev: Chat[]) => prev.map((c: Chat) => c.id === activeChatId ? { ...c, messages: [...c.messages, userMsg], lastUpdated: Date.now(), title: c.title === 'New Chat' && content ? content.slice(0, 24) : c.title } : c))

    // Mock assistant reply
    const assistant: Message = {
      id: `m-${Math.random().toString(36).slice(2, 10)}`,
      role: 'assistant',
      content: `Mock response from ${selectedModel}. Critical: ${criticalThinking ? 'on' : 'off'}. Background: ${backgroundMode ? 'on' : 'off'}.\n\n(No backend, UI-only.)`,
      createdAt: Date.now() + 400,
    }
    setTimeout(() => {
      setChats((prev: Chat[]) => prev.map((c: Chat) => c.id === activeChatId ? { ...c, messages: [...c.messages, assistant], lastUpdated: Date.now() } : c))
    }, 400)
  }

  const addPrompt = (p: Prompt) => {
    setPrompts((prev: Prompt[]) => [{ ...p, id: p.id || `p-${Math.random().toString(36).slice(2, 8)}`, favorite: p.favorite ?? false, tags: p.tags ?? [] }, ...prev])
  }
  const updatePrompt = (p: Prompt) => {
    setPrompts((prev: Prompt[]) => prev.map((x: Prompt) => (x.id === p.id ? { ...x, ...p } : x)))
  }
  const removePrompt = (id: string) => {
    setPrompts((prev: Prompt[]) => prev.filter((x: Prompt) => x.id !== id))
  }
  const toggleFavorite = (id: string) => {
    setPrompts((prev: Prompt[]) => prev.map((x: Prompt) => (x.id === id ? { ...x, favorite: !x.favorite } : x)))
  }

  // Mock auth handlers
  const signIn = (u: { username: string; name?: string; avatarUrl?: string }) => {
    setIsAuthenticated(true)
    setUser({ name: u.name || 'User', username: u.username, avatarUrl: u.avatarUrl || 'https://avatars.githubusercontent.com/u/9919?s=200&v=4' })
  }
  const signUp = (u: { name: string; username: string; avatarUrl: string }) => {
    setIsAuthenticated(true)
    setUser({ name: u.name, username: u.username, avatarUrl: u.avatarUrl })
  }
  const signOut = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = useMemo<ChatState>(() => ({
    section, setSection,
    chats, activeChatId, setActiveChatId, createNewChat, addUserMessage,
    searchQuery, setSearchQuery,
    selectedModel, setSelectedModel,
    criticalThinking, setCriticalThinking,
    backgroundMode, setBackgroundMode,
    historyOpen, setHistoryOpen,
    pluginsEnabled, setPluginsEnabled,
    compactMode, setCompactMode,
    prompts, addPrompt, updatePrompt, removePrompt, toggleFavorite,
    promptPage, setPromptPage,
    appTheme, setAppTheme,
    fontSize, setFontSize,
    sidebarStyle, setSidebarStyle,
    streaming, setStreaming,
    soundNotifications, setSoundNotifications,
    apiKeys, setApiKeys,
    voiceProvider, setVoiceProvider,
    voiceAutoStart, setVoiceAutoStart,
    voiceAutoSend, setVoiceAutoSend,
    isAuthenticated, user, signIn, signUp, signOut,
  }), [
    section, chats, activeChatId, searchQuery, selectedModel,
    criticalThinking, backgroundMode, historyOpen, pluginsEnabled,
    compactMode, prompts, promptPage,
    appTheme, fontSize, sidebarStyle,
    streaming, soundNotifications,
    apiKeys, voiceProvider, voiceAutoStart, voiceAutoSend,
    isAuthenticated, user
  ])
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
