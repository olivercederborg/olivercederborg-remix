'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import { defaultVariantsNoDelay } from '~/components/motion.variants'

export function MeCard() {
  return (
    <motion.div
      variants={defaultVariantsNoDelay}
      whileHover={{ scale: 1.05 }}
      className="card-border relative col-span-4 row-span-3 overflow-hidden rounded-xl md:col-span-2 md:row-span-3"
    >
      <Image
        alt="Oliver Cederborg"
        src="/assets/oliver-cederborg-portrait.jpg"
        height={300}
        width={300}
        className="h-full object-cover grayscale-[0.35] filter"
        priority
      />
    </motion.div>
  )
}
