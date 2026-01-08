import type { FC, ReactNode } from 'react'

export const Card: FC<{ className?: string; children: ReactNode }> = ({ className, children }) => (
  <div className={`card ${className||''}`}>{children}</div>
)
