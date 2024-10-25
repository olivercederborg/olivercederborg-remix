import type { Variants } from 'framer-motion'

export const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: 0.1, ease: 'backOut' },
  },
}

export const defaultVariantsNoDelay: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'backOut' },
  },
}
