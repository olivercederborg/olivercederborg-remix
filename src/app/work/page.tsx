import { Heading } from '~/components/heading'
import { Jobs } from '~/app/work/components/jobs'
import { WorkShell } from '~/app/work/components/work-shell'
import { defaultVariants } from '~/components/motion.variants'

export const metadata = {
  title: 'Work - Oliver Cederborg',
  description:
      'Learn more about my work experience and what I\'m currently working on.',
}

export default async function WorkPage() {
  return (
    <section>
      <Heading className="mb-1 mt-0">My work experience</Heading>

      <WorkShell
        initial="hidden"
        animate="visible"
        variants={defaultVariants}
      >
        <p>
          Learn more about my work experience, my focus areas, and what
          I&apos;m currently working on.
        </p>
        <Jobs />
      </WorkShell>
    </section>
  )
}
