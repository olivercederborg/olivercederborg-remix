import { Motion } from '~/components/motion'
import { MeCard } from '~/components/cards/me'
import { TimeCard } from '~/components/cards/time'
import { DribbbleCard } from '~/components/cards/dribbble'
import { LinkedInCard } from '~/components/cards/linkedin'
import { LocationCard } from '~/components/cards/location'
import { GithubStatsCard } from '~/components/cards/github'
import { getGithubContributions, getGithubStats } from '~/app/actions'

export async function Cards() {
  const { followers, stars } = await getGithubStats()
  const contributions = await getGithubContributions()

  return (
    <Motion
      asChild
      animate="visible"
      variants={{
        visible: {
          transition: { delayChildren: 0.25, staggerChildren: 0.1 },
        },
      }}
    >
      <section className="mt-8 grid grid-cols-8 grid-rows-5 gap-4 md:grid-cols-7 md:grid-rows-3">
        <MeCard />
        <GithubStatsCard
          followers={followers}
          stars={stars}
          contributions={contributions}
        />
        <DribbbleCard />
        <LocationCard />
        <LinkedInCard />
        <TimeCard />
      </section>
    </Motion>
  )
}
