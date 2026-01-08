import React from 'react'
import { useChat } from '../context/ChatContext'
import type { Model } from '../utils/mock'

const models: Model[] = ['GPT-4', 'GPT-3.5', 'Claude', 'Local Model']

export const ModelSelector: React.FC = () => {
  const { selectedModel, setSelectedModel } = useChat()
  return (
    <div className="flex flex-wrap gap-2">
      {models.map(m => (
        <button
          key={m}
          className={`pill ${selectedModel === m ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => setSelectedModel(m)}
        >
          {m}
        </button>
      ))}
    </div>
  )
}
