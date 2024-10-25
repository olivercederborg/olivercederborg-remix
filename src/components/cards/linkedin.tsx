'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { LinkedinIcon } from 'lucide-react'

import { defaultVariantsNoDelay } from '~/components/motion.variants'

export function LinkedInCard() {
  const MotionLink = motion(Link)
  return (
    <MotionLink
      href="https://linkedin.com/in/olivercederborg"
      target="_blank"
      title="Linkedin profile"
      variants={defaultVariantsNoDelay}
      whileHover={{ scale: 1.05 }}
      className="card-border relative col-span-2 row-span-1 flex items-center justify-center gap-x-2 overflow-hidden rounded-xl bg-[#0077B5] text-white dark:bg-[#0077B5] md:col-span-1 md:col-start-3 md:row-span-1 md:row-start-3"
    >
      <LinkedinIcon size={24} />
    </MotionLink>
  )
}
