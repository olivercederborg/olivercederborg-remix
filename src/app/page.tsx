import Link from 'next/link'

import { Text } from '~/components/text'
import { Cards } from '~/components/cards'
import { Heading } from '~/components/heading'

export default function Home() {
  return (
    <section>
      <Heading>Hi, I&apos;m Oliver ✌️</Heading>

      <section className="prose prose-neutral mt-8 max-w-full dark:prose-invert">
        <Text>
          I&apos;m a developer with a passion for building beautiful and
          functional applications. I currently
          {' '}
          <Link href="/work">
            <span className="text-neutral-400">/</span>
            work
          </Link>
          {' '}
          as a full-stack developer at
          {' '}
          <a href="https://hifranklin.com">Franklin</a>
          {' '}
          - a fintech
          startup, building a banking solution for e-commerce.
        </Text>
      </section>

      <Cards />
    </section>
  )
}

export const revalidate = 3600
