'use client'

import { motion } from 'framer-motion'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '~/lib/utils'
import { defaultVariants } from '~/components/motion.variants'

interface HeadingProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
  hasMotion?: boolean
}

export function Heading({
  children,
  className,
  asChild,
  hasMotion = true,
  ...props
}: HeadingProps) {
  const BaseComp = asChild ? Slot : 'h1'
  const Comp = hasMotion ? motion(BaseComp) : BaseComp
  return (
    <Comp
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={defaultVariants}
      className={cn(
        'text-2xl font-medium leading-relaxed dark:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
