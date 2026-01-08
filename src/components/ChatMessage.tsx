import type { FC } from 'react'
import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import type { Message } from '../utils/mock'

export const ChatMessage: FC<{ msg: Message }> = ({ msg }: { msg: Message }) => {
  const align = useMemo(() => msg.role === 'user' ? 'items-end' : 'items-start', [msg.role])
  const bubble = msg.role === 'user' ? 'chat-bubble chat-bubble-user' : 'chat-bubble chat-bubble-assistant'
  return (
    <div className={`flex ${align} w-full`}
      aria-live="polite" aria-atomic="true">
      <div className={`${bubble} max-w-[80%] whitespace-pre-wrap`}
        role={msg.role === 'user' ? 'note' : 'article'}>
        <ReactMarkdown>{msg.content}</ReactMarkdown>
      </div>
    </div>
  )
}
