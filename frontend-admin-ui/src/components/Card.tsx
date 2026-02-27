

import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}
export default function Card({ children, className = '', hoverable = true, padding = 'md' }: CardProps) {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  return (
    <div className={`
      bg-white rounded-2xl shadow-lg border border-gray-100
      transition-all duration-300
      ${hoverable ? 'hover:shadow-xl hover:-translate-y-1' : ''}
      ${paddingClasses[padding]}
      ${className}
    `}>
      {children}
    </div>
  )
}

// export default function Card({ children, className = '' }: CardProps) {
//   return (
//     <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
//       {children}
//     </div>
//   )
// }



