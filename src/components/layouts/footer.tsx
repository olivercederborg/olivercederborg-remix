import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-neutral-200 py-4 dark:border-neutral-900">
      <p className="text-sm font-light text-neutral-600 dark:text-neutral-400">
        ©
        {' '}
        {new Date().getFullYear()}
      </p>
      <a
        href="https://github.com/olivercederborg/olivercederborg.com"
        target="_blank"
        className="flex items-center gap-2 text-sm text-neutral-700 hover:opacity-75 dark:text-neutral-50"
      >
        <Github size={14} />
        {' '}
        olivercederborg.com
      </a>
    </footer>
  )
}
