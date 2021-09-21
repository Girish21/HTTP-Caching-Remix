import * as React from 'react'
import type { LoaderFunction, MetaFunction } from 'remix'
import { useRouteData } from 'remix'
import { bundleMd } from '~/utils/md.server'
import { getMDXComponent } from 'mdx-bundler/client'

export let meta: MetaFunction = () => {
  return {
    title: 'HTTP Caching',
    description: 'Introduction to HTTP Caching',
    'og:title': 'HTTP Caching',
    'og:og:description':
      'Introduction to HTTP Caching and how caching works in web applications',
    'og:type': 'article',
    'og:url': 'https://divine-brook-5249.fly.dev/',
    'og:image': 'https://divine-brook-5249.fly.dev/favicon.svg',
  }
}

export let loader: LoaderFunction = async () => {
  return { content: await bundleMd() }
}

export default function Index() {
  let data = useRouteData<{ content: { code: string } }>()

  const Component = React.useMemo(() => getMDXComponent(data.content.code), [])

  return (
    <main>
      <section className='m-8 grid grid-cols-8 lg:grid-cols-12'>
        <article className='col-[1/-1] sm:col-start-2 sm:col-end-8 lg:col-start-4 lg:col-end-10 dark:text-gray-50 prose-xl'>
          <Component />
        </article>
      </section>
    </main>
  )
}
