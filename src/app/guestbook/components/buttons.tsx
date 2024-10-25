'use client'

import { Github } from 'lucide-react'
import { signIn, signOut } from 'next-auth/react'

import { Button } from '~/components/ui/button'

export function SignIn() {
  return (
    <Button onClick={async () => signIn('github')}>
      <Github className="mr-2 h-4 w-4" />
      {' '}
      log in with github
    </Button>
  )
}

export function SignOut() {
  return (
    <Button variant="outline" onClick={async () => signOut()}>
      log out
    </Button>
  )
}
