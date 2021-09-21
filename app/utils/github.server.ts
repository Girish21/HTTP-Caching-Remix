import octokit from './octokit.server'

const downloadReadme = async () => {
  const { data } = await octokit.request('GET /repos/{owner}/{repo}/readme', {
    owner: 'Girish21',
    repo: 'HTTP-Caching',
  })

  const encoding = data.encoding as Parameters<typeof Buffer.from>['1']
  return Buffer.from(data.content, encoding).toString()
}

export { downloadReadme }
