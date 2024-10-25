'use server'

import type { Session } from 'next-auth'

import { Resend } from 'resend'
import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { differenceInHours } from 'date-fns'

import { db } from '~/db'
import { env } from '~/lib/env'
import { auth } from '~/lib/auth'
import { guestbook } from '~/db/schema'

async function getSession(): Promise<Session> {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  return session
}

async function hasSignedToday(email: string) {
  const now = new Date()

  if (email === 'hey@olivercederborg.com') {
    return { hasSigned: false }
  }

  const lastSignage = await db
    .select()
    .from(guestbook)
    .where(eq(guestbook.email, email))
    .orderBy(desc(guestbook.createdAt))
    .limit(1)

  if (!lastSignage.length) {
    return { hasSigned: false }
  }

  const hoursSinceLastSignage = differenceInHours(
    now,
    lastSignage[0].createdAt,
  )

  if (lastSignage.length && hoursSinceLastSignage < 24) {
    const hoursToSignAgain = 24 - hoursSinceLastSignage

    return { hasSigned: true, hoursToSignAgain }
  }

  return { hasSigned: false }
}

const resend = new Resend(env.RESEND_API_KEY)

export async function saveGuestbookEntry(formData: FormData) {
  const session = await getSession()
  if (!session.user)
    throw new Error('Unauthorized')

  const email = session.user.email as string
  const createdBy = session.user.name || email || 'Anonymous'

  const { hasSigned, hoursToSignAgain } = await hasSignedToday(email)

  if (hasSigned) {
    return {
      success: false,
      message: `You can sign again in ${hoursToSignAgain} hours.`,
    }
  }

  const entry = formData.get('entry')?.toString() || ''
  const body = entry.slice(0, 500).trim()

  if (!body) {
    return {
      success: false,
      message: 'Entry cannot be empty',
    }
  }

  try {
    await db.insert(guestbook).values({
      createdBy,
      email,
      body,
    })

    await resend.emails.send({
      from: `Guestbook <guestbook@olivercederborg.com>`,
      to: ['hey@olivercederborg.com'],
      subject: 'Guestbook Entry',
      text: `From: ${createdBy}\nEntry: ${body}`,
    })
  }
  catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'An error occurred while saving your entry',
    }
  }

  revalidatePath('/guestbook')
  return { success: true, message: 'Your entry has been saved' }
}
