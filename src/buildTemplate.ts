import path from 'path'
import { createNuxtTemplate } from './createNuxtTemplate'
import { createStaticTemplate } from './createStaticTemplate'
import type { Config } from './getConfig'
import { createNextTemplate } from './nextjs/createNextTemplate'

let prevPagesText = ''
let prevStaticText = ''

export const resetCache = () => {
  prevPagesText = ''
  prevStaticText = ''
}

export default (
  {
    type,
    input,
    staticDir,
    output,
    ignorePath,
    suffix,
    trailingSlash,
    basepath,
    pageExtensions,
    appDir
  }: Config,
  mode?: 'pages' | 'static'
) => {
  const emptyPathRegExp = /\n.+{\n+ +}.*/

  if (mode !== 'static') {
    let text = ''

    switch (type) {
      case 'nextjs':
        text = createNextTemplate(input, output, ignorePath, suffix, appDir, pageExtensions)
        break
      case 'nuxtjs':
        text = createNuxtTemplate(input, output, ignorePath, suffix, trailingSlash)
        break
    }

    while (emptyPathRegExp.test(text)) {
      text = text.replace(emptyPathRegExp, '')
    }

    prevPagesText = text
  }

  if (staticDir && mode !== 'pages') {
    let text = createStaticTemplate(staticDir, basepath, ignorePath, suffix)

    while (emptyPathRegExp.test(text)) {
      text = text.replace(emptyPathRegExp, '')
    }

    prevStaticText = text
  }

  return {
    text: `${prevPagesText}${prevStaticText}${
      type === 'nuxtjs'
        ? `
declare module 'vue/types/vue' {
  interface Vue {
    $pagesPath: PagesPath${prevStaticText ? '\n    $staticPath: StaticPath' : ''}
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $pagesPath: PagesPath${prevStaticText ? '\n    $staticPath: StaticPath' : ''}
  }

  interface Context {
    $pagesPath: PagesPath${prevStaticText ? '\n    $staticPath: StaticPath' : ''}
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $pagesPath: PagesPath${prevStaticText ? '\n    $staticPath: StaticPath' : ''}
  }
}

const pathPlugin: Plugin = (_, inject) => {
  inject('pagesPath', pagesPath)${prevStaticText ? "\n  inject('staticPath', staticPath)" : ''}
}

export default pathPlugin
`
        : ''
    }`,
    filePath: path.posix.join(output, '$path.ts')
  }
}
