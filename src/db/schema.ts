import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const guestbook = pgTable('guestbook', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  body: text('body').notNull(),
  createdBy: text('createdBy').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})

export type SelectGuestbook = typeof guestbook.$inferSelect
export type InsertGuestbook = typeof guestbook.$inferInsert
