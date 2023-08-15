'use client'

import { AnimatedLetters, AnimatedText } from '@components/animated-text'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

export function SideProjectsShell({ children }: { children: ReactNode }) {
  return (
    <main className='container py-40'>
      <motion.article
        variants={{
          hidden: { transition: { staggerChildren: 0.25, delayChildren: 0.25 } },
          visible: { transition: { staggerChildren: 0.25, delayChildren: 0.25 } },
        }}
        initial='hidden'
        whileInView='visible'
        exit='hidden'
        viewport={{ once: true }}
      >
        <AnimatePresence>
          <AnimatedLetters
            key='title'
            as='h1'
            text='Side Projects'
            className='text-4xl font-medium lg:text-5xl'
            textVariants={{
              hidden: { transition: { staggerChildren: 0.015 } },
              visible: { transition: { staggerChildren: 0.015 } },
            }}
            letterVariants={{
              hidden: { opacity: 0, y: 75 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.5 },
              },
            }}
          />
          <AnimatedText
            key='text'
            as='p'
            className='mt-6 text-lg font-light leading-relaxed text-dark-400 dark:text-dark-200 md:w-3/5'
            text='This is where I keep my side projects. You will find stuff like web and mobile apps, automation projects and Neovim plugins.'
          />
        </AnimatePresence>
      </motion.article>

      <motion.section
        variants={{
          visible: { transition: { staggerChildren: 0.25 } },
        }}
        initial='hidden'
        whileInView='visible'
        exit='hidden'
        viewport={{ once: true }}
        className='relative grid flex-1 grid-cols-12 gap-y-12 md:gap-x-8 md:gap-y-16 lg:gap-x-16 mt-16'
      >
        {children}
      </motion.section>
    </main>
  )
}
