import React from 'react'
import { clsx } from 'clsx'

export function cn(...args: any[]) {
  return clsx(args)
}

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('bg-card rounded-2xl shadow-soft', props.className)} />
}

export function Button({ variant = 'default', className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default'|'secondary'|'outline'|'danger', children?: React.ReactNode }) {
  const base = 'inline-flex items-center justify-center gap-2 px-4 h-11 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 hover:scale-105'
  const variants: Record<string, string> = {
    default: 'bg-primary text-slate-900 hover:bg-golden shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-white hover:opacity-90 shadow-md',
    outline: 'border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300',
    danger: 'bg-danger-strong text-white hover:opacity-90 shadow-md'
  }
  
  if (props['as-child' as keyof typeof props]) {
    return React.cloneElement(children as React.ReactElement, {
      className: cn(base, variants[variant], className)
    })
  }
  
  return <button {...props} className={cn(base, variants[variant], className)}>{children}</button>
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('w-full h-11 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring', props.className)} />
}

export function Badge({ color = 'default', className, ...props }: React.HTMLAttributes<HTMLSpanElement> & { color?: 'default'|'verified'|'warning'|'info' }) {
  const styles: Record<string, string> = {
    default: 'bg-pastelYellow text-slate-900 border border-yellow-200',
    verified: 'bg-primary text-slate-900 shadow-sm border border-yellow-300',
    warning: 'bg-warning text-slate-900 border border-orange-200',
    info: 'bg-skyBlue text-slate-900 border border-blue-200',
  }
  return <span {...props} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all', styles[color], className)} />
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-xl bg-accent', className)} />
}
