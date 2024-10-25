'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import { Dribbble } from '~/components/icons/dribbble'
import { DribbbleType } from '~/components/icons/dribbble-type'
import { defaultVariantsNoDelay } from '~/components/motion.variants'

export function DribbbleCard() {
  const MotionLink = motion(Link)
  return (
    <MotionLink
      href="https://dribbble.com/oliver"
      target="_blank"
      title="Dribbble profile"
      variants={defaultVariantsNoDelay}
      whileHover={{ scale: 1.05 }}
      className="card-border relative col-span-2 row-span-1 flex items-center justify-center gap-x-2 overflow-hidden rounded-xl bg-[#FF8EDD] text-white md:col-span-2 md:col-start-4 md:row-span-1"
    >
      <Dribbble className="h-6 text-white md:hidden" />
      <DribbbleType className="hidden md:block" />
    </MotionLink>
  )
}
