import preStyled from '@girish_kumar/md-utils/styles.css'
import { Outlet } from 'react-router-dom'
import type { LinksFunction, MetaFunction } from 'remix'
import { Links, LiveReload, Meta } from 'remix'
import stylesUrl from './styles/index.css'

export let links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: stylesUrl },
    { rel: 'stylesheet', href: preStyled },
    { rel: 'icon', href: '/favicon.svg' },
    {
      rel: 'preload',
      as: 'font',
      type: 'font/ttf',
      crossOrigin: 'anonymous',
      href: '/fonts/Poppins-Regular.ttf',
    },
    {
      rel: 'preload',
      as: 'font',
      type: 'font/ttf',
      crossOrigin: 'anonymous',
      href: '/fonts/Poppins-Medium.ttf',
    },
  ]
}

export const meta: MetaFunction = () => {
  return {
    viewport: 'width=device-width, initial-scale=1.0',
    'color-scheme': 'dark',
  }
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='dark'>
      <head>
        <meta charSet='utf-8' />
        <Meta />
        <Links />
      </head>
      <body className='bg-gray-900'>
        {children}

        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  )
}
