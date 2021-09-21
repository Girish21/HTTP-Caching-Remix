import { bundleMDX } from 'mdx-bundler'
import { downloadReadme } from './github.server'
import {
  remarkCodeBlockShiki,
  rehypeRemovePreWrapper,
} from '@girish_kumar/md-utils'

const bundleMd = async () => {
  const md = await downloadReadme()
  const { default: gfm } = await import('remark-gfm')
  const { default: remarkSlug } = await import('remark-slug')
  const { default: remarkAutolinkHeading } = await import(
    'remark-autolink-headings'
  )

  return bundleMDX(md, {
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkSlug,
        gfm,
        [remarkAutolinkHeading, { behavior: 'wrap' }],
        remarkCodeBlockShiki,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeRemovePreWrapper,
      ]

      return options
    },
  })
}

export { bundleMd }
