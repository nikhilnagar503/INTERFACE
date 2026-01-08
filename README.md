# LLM Chat Interface (Frontend Only)

Modern, responsive React (Vite) + Tailwind CSS UI for an LLM chatbot — inspired by ChatGPT/TypingMind. No backend; all interactions are mocked.

## Features
- Dark mode first, polished SaaS UI
- Three sections: Primary Sidebar, Chat History, Main Chat Area
- Model selector (pill-style)
- User/Assistant bubbles with Markdown rendering
- Sticky, multi-line input with icons and Send
- Searchable chat history with collapse/expand
- Mock replies based on selected model and toggles

## Tech
- React 18 + Vite
- Tailwind CSS
- lucide-react icons
- react-markdown for message formatting

## Quick Start

```bash
# From the project root
npm install
npm run dev
```

Open the local URL shown by Vite. The app is UI-only; no real API calls.

## Structure
- `src/components` — UI components
- `src/context/ChatContext.tsx` — app state, mock interactions
- `src/utils/mock.ts` — initial chats & types

## Notes
- Keyboard: Enter to send, Shift+Enter for newline
- Toggling Critical Thinking/Background only affects mock text
