import { desc } from 'drizzle-orm'

import { db } from '~/db'
import { guestbook } from '~/db/schema'

export async function getGuestbookEntries() {
  return db
    .select()
    .from(guestbook)
    .limit(50)
    .orderBy(desc(guestbook.createdAt))
}
