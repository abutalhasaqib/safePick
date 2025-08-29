import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from './primitives'

interface BackButtonProps {
  label?: string
  onClick?: () => void
  className?: string
}

export default function BackButton({ label, onClick, className = '' }: BackButtonProps) {
  const navigate = useNavigate()
  
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(-1)
    }
  }
  
  return (
    <Button 
      variant="outline" 
      onClick={handleClick}
      className={`px-3 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 ${className}`}
    >
      <ArrowLeft size={16} />
      {label || 'Back'}
    </Button>
  )
}
