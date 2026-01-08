export type Role = 'user' | 'assistant'
export type Message = { id: string; role: Role; content: string; createdAt: number }
export type Chat = { id: string; title: string; messages: Message[]; lastUpdated: number }
// Expanded catalog for Model Studio (UI-only)
export type Model =
  | 'GPT-5.2'
  | 'GPT-4o'
  | 'GPT-4'
  | 'GPT-3.5'
  | 'Claude 3.5 Sonnet'
  | 'Claude 3 Opus'
  | 'Gemini 2.0 Pro'
  | 'Gemini 2.0 Flash'
  | 'Local Model'

export const initialChats: Chat[] = [
  {
    id: 'chat-1',
    title: 'New Chat',
    lastUpdated: Date.now(),
    messages: [],
  },
]
