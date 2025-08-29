import BackButton from './BackButton'

interface PageHeaderProps {
  title: string
  showBackButton?: boolean
  onBack?: () => void
  children?: React.ReactNode
  className?: string
}

export default function PageHeader({ 
  title, 
  showBackButton = true, 
  onBack, 
  children, 
  className = '' 
}: PageHeaderProps) {
  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-3">
        {showBackButton && <BackButton onClick={onBack} />}
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h1>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  )
}
