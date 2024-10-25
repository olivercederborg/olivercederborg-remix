import type { NextConfig } from 'next'

import createJiti from 'jiti'
import { fileURLToPath } from 'node:url'

const jiti = createJiti(fileURLToPath(import.meta.url))

jiti('./src/lib/env')

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default nextConfig
