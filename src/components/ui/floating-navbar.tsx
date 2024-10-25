'use client'

import Link from 'next/link'
import * as React from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

import type { NavItem } from '~/components/layouts/header'

import { cn } from '~/lib/utils'
import { ThemeToggle } from '~/components/theme-toggle'
import { MobileNavigation } from '~/components/mobile-navigation'

export function FloatingNav({
  navItems,
  className,
}: {
  navItems: NavItem[]
  className?: string
}) {
  const pathname = usePathname()

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.35,
        delay: 0.25,
        ease: 'backOut',
      }}
      className={cn(
        'fixed inset-x-4 top-5 z-[49] mx-auto flex max-w-2xl items-center justify-between overflow-hidden rounded-full border border-neutral-950 border-opacity-[0.03] bg-neutral-50/75 px-3 py-2 filter backdrop-blur-xl dark:border-white/5 dark:bg-neutral-900/75',
        className,
      )}
    >
      <div className="hidden md:flex">
        {navItems.map((navItem, idx: number) => {
          const isActive = pathname === navItem.link
          return (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                'relative flex h-8 items-center px-4 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300',
              )}
            >
              <span
                className={cn('hidden text-sm sm:block')}
                style={{
                  textShadow: isActive
                    ? '1px 1px 12px rgba(255,255,255,0.4)'
                    : '',
                }}
              >
                <span className="mr-px text-neutral-400">/</span>
                {navItem.name.toLowerCase()}
              </span>

              {isActive && (
                <>
                  <motion.span
                    transition={{
                      ease: 'backInOut',
                      duration: 0.45,
                    }}
                    layoutId="active-nav-glow"
                    className="absolute inset-x-0 top-0 mx-auto hidden h-16 w-10 rounded-full bg-neutral-200/50 blur-[32px] dark:bg-white/75 sm:flex"
                  />
                  <motion.span
                    transition={{
                      ease: 'backInOut',
                      duration: 0.35,
                    }}
                    layoutId="active-nav"
                    className="absolute inset-x-0 inset-y-0 z-[-1] hidden rounded-full bg-neutral-200/50 dark:bg-neutral-700 sm:flex"
                  />
                </>
              )}
            </Link>
          )
        })}
      </div>
      <div className="md:hidden">
        <MobileNavigation navItems={navItems} />
      </div>

      <ThemeToggle />
    </motion.div>
  )
}
