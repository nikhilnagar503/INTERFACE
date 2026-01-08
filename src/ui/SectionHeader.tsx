import type { FC, ReactNode } from 'react'

export const SectionHeader: FC<{ icon?: ReactNode; title: string; subtitle?: string; className?: string }> = ({ icon, title, subtitle, className }) => (
  <div className={`flex items-center gap-2 ${className||''}`}>
    {icon}
    <div>
      <div className="text-lg font-semibold">{title}</div>
      {subtitle && <div className="text-sm text-gray-400">{subtitle}</div>}
    </div>
  </div>
)
