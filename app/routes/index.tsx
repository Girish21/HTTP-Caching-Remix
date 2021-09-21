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
    'og:image':
      'https://res.cloudinary.com/dhtwxe58j/image/upload/v1632239439/HTTP-Caching/images_wug2en.jpg',
  }
}

export let loader: LoaderFunction = async () => {
  return { content: await bundleMd() }
}

export default function Index() {
  let data = useRouteData<{ content: { code: string } }>()

  const Component = React.useMemo(() => getMDXComponent(data.content.code), [])

  return (
    <main className='max-w-[min(75ch,90%)] pt-8 mx-auto'>
      <section className='grid grid-cols-8 lg:grid-cols-12'>
        <article className='col-[1/-1] sm:col-[2/-2] prose lg:prose-xl'>
          <Component />
        </article>
      </section>
    </main>
  )
}
