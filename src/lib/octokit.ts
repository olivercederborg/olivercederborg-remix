import { Octokit } from 'octokit'

import { env } from '~/lib/env'

export const octokit = new Octokit({ auth: env.GITHUB_TOKEN })
