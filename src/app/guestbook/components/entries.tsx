'use client'

import { differenceInDays } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'

import type { SelectGuestbook } from '~/app/db/schema'

import { cn } from '~/lib/utils'
import { defaultVariantsNoDelay } from '~/components/motion.variants'

interface EntriesProps {
  entries: SelectGuestbook[]
}

export function Entries({ entries }: EntriesProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.15,
            },
          },
        }}
        className="mt-16 flex flex-col space-y-3 border-t border-white/5 py-8"
      >
        {entries.map(entry => (
          <Entry key={entry.id} entry={entry} />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

interface EntryProps {
  entry: SelectGuestbook
  className?: string
}
export function Entry({ entry, className }: EntryProps) {
  const { email, body, createdBy, createdAt } = entry
  const isAuthor = email === 'hey@olivercederborg.com'
  const daysSinceEntry = differenceInDays(new Date(), createdAt)
  const timeSinceEntry
      = daysSinceEntry > 1
        ? `${daysSinceEntry} days ago`
        : daysSinceEntry === 1
          ? 'yesterday'
          : 'today'

  return (
    <motion.div
      variants={defaultVariantsNoDelay}
      className={cn(
        'flex flex-col flex-wrap items-start self-start text-pretty break-all rounded-xl border bg-neutral-200/10 px-3 py-2 text-sm leading-6 dark:border-white/5 dark:bg-neutral-900/10',
        {
          'items-end self-end bg-neutral-700/10 dark:bg-neutral-400/10':
                  isAuthor,
        },
        className,
      )}
    >
      <p className="flex flex-col">
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {createdBy}
          {' '}
          —
          {timeSinceEntry}
        </span>
        <span>{body}</span>
      </p>
    </motion.div>
  )
}
