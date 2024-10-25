'use server'

import { octokit } from '~/lib/octokit'

export async function getGithubStats() {
  const gql = String.raw
  const { user } = await octokit.graphql<{
    user: {
      repositoriesContributedTo: { totalCount: number }
      pullRequests: { totalCount: number }
      openIssues: { totalCount: number }
      closedIssues: { totalCount: number }
      followers: { totalCount: number }
      repositories: {
        totalCount: number
        nodes: {
          stargazers: { totalCount: number }
        }[]
        pageInfo: {
          hasNextPage: boolean
          endCursor: string | null
        }
      }
    }
  }>(
    gql`
         query ($login: String!) {
            user(login: $login) {
               pullRequests(first: 1) {
                  totalCount
               }
               openIssues: issues(states: OPEN) {
                  totalCount
               }
               closedIssues: issues(states: CLOSED) {
                  totalCount
               }
               followers {
                  totalCount
               }
               repositories(ownerAffiliations: OWNER, first: 100) {
                  totalCount
                  nodes {
                     stargazers {
                        totalCount
                     }
                  }
                  pageInfo {
                     hasNextPage
                     endCursor
                  }
               }
            }
         }
      `,
    { login: 'olivercederborg' },
  )
  return {
    issues: user.closedIssues.totalCount + user.openIssues.totalCount,
    prs: user.pullRequests.totalCount,
    followers: user.followers.totalCount,
    stars: user.repositories.nodes.reduce(
      (totalStars, repo) => totalStars + repo.stargazers.totalCount,
      0,
    ),
  }
}

export async function getGithubContributions() {
  const gql = String.raw
  const { user } = await octokit.graphql<{
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: {
            contributionDays: {
              color: string
              contributionCount: number
              date: string
            }[]
          }[]
        }
      }
    }
  }>(
    gql`
         query ($login: String!) {
            user(login: $login) {
               contributionsCollection {
                  contributionCalendar {
                     totalContributions
                     weeks {
                        contributionDays {
                           color
                           contributionCount
                           date
                        }
                     }
                  }
               }
            }
         }
      `,
    { login: 'olivercederborg' },
  )

  const weeklyContributions
      = user.contributionsCollection.contributionCalendar.weeks

  // find the day with the highest contribution count.
  let maxContributionDay = { contributionCount: 0, date: '', color: '' }

  for (const week of weeklyContributions) {
    for (const day of week.contributionDays) {
      if (day.contributionCount > maxContributionDay.contributionCount) {
        maxContributionDay = day
      }
    }
  }
  const latestContributions = weeklyContributions.slice(-11)
  const totalContributions
      = user.contributionsCollection.contributionCalendar.totalContributions
  return {
    totalContributions,
    latestContributions,
    maxContributionDay,
  }
}
