import type { FC } from 'react'

export const Toggle: FC<{ checked: boolean; onChange: (v: boolean) => void; className?: string }> = ({ checked, onChange, className }) => (
  <button onClick={() => onChange(!checked)} className={`pressable toggle ${checked? 'bg-indigo-600':'bg-gray-700'} ${className||''}`} aria-label="Toggle">
    <span className={`toggle-thumb ${checked? 'translate-x-6':''}`}></span>
  </button>
)
