import { Octokit as createOctokit } from '@octokit/rest'
import { throttling } from '@octokit/plugin-throttling'
import { getEnvironmentVar } from './misc'

const Octokit = createOctokit.plugin(throttling)

type ThrottleOptions = {
  method: string
  url: string
  request: { retryCount: number }
}

declare global {
  var githubApp: createOctokit
}

let app: createOctokit

if (process.env.NODE_ENV === 'production') {
  app = new Octokit({
    auth: getEnvironmentVar('GITHUB_TOKEN'),
    throttle: {
      onRateLimit: (retryAfter: number, options: ThrottleOptions) => {
        console.warn(
          `Request quota exhausted for request ${options.method} ${options.url}. Retrying after ${retryAfter} seconds.`,
        )

        return true
      },
      onAbuseLimit: (_: number, options: ThrottleOptions) => {
        console.warn(
          `Abuse detected for request ${options.method} ${options.url}`,
        )
      },
    },
  })
} else {
  if (!globalThis.githubApp) {
    globalThis.githubApp = new Octokit({
      auth: getEnvironmentVar('GITHUB_TOKEN'),
      throttle: {
        onRateLimit: (retryAfter: number, options: ThrottleOptions) => {
          console.warn(
            `Request quota exhausted for request ${options.method} ${options.url}. Retrying after ${retryAfter} seconds.`,
          )

          return true
        },
        onAbuseLimit: (_: number, options: ThrottleOptions) => {
          console.warn(
            `Abuse detected for request ${options.method} ${options.url}`,
          )
        },
      },
    })
  }
  app = globalThis.githubApp
}

export default app
