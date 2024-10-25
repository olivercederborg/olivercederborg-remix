'use client'

import type { HTMLMotionProps } from 'framer-motion'

import { motion } from 'framer-motion'

import { cn } from '~/lib/utils'

interface WorkShellProps extends HTMLMotionProps<'div'> {
  className?: string
}

export function WorkShell({ children, className, ...props }: WorkShellProps) {
  return (
    <motion.div
      className={cn(
        'prose prose-neutral mt-8 max-w-full text-pretty dark:prose-invert',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
