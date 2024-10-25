'use client'

import type { MotionProps } from 'framer-motion'

import { motion } from 'framer-motion'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '~/lib/utils'
import { defaultVariants } from '~/components/motion.variants'

type TextProps = {
  children: React.ReactNode
  className?: string
  asChild?: boolean
  hasMotion?: boolean
} & MotionProps

export function Text({
  children,
  className,
  asChild,
  hasMotion = true,
  ...props
}: TextProps) {
  const BaseComp = asChild ? Slot : 'p'
  const Comp = hasMotion ? motion(BaseComp) : BaseComp
  return (
    <Comp
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={defaultVariants}
      className={cn('text-base font-normal leading-relaxed', className)}
    >
      {children}
    </Comp>
  )
}
