import type { Plugin } from '@nuxt/types'

type Query_f45e456f277c9df56903afe963aacd39411f348519aba9af9942672c8ca6f58a = { hoge: string }

type OptionalQuery_92da08ddb082f4ce672d013cd628bd33f19552c2fc584081319c6ed3d28cc641 = { hoge: string }

type Query_299ea4d81e3b9c21b408451999103362b03cfbc7a218d427f66c1b9f57a83c09 = {
  hoge: string
  fuga: {
    a: number
    b: { c: string }[]
  }
}

export const pagesPath = {
  _a: (a: string | number) => ({
    b: {
      _c: (c?: string | number) => ({
        $url: (url?: { hash?: string }) => ({ path: `/${a}/b${c !== undefined ? `/${c}` : ''}/`, hash: url?.hash })
      })
    }
  }),
  _pid: (pid?: string | number) => ({
    $url: (url?: { query?: OptionalQuery_92da08ddb082f4ce672d013cd628bd33f19552c2fc584081319c6ed3d28cc641, hash?: string }) => ({ path: `${pid !== undefined ? `/${pid}` : ''}/`, query: url?.query as any, hash: url?.hash })
  }),
  aaa: {
    _bbb: (bbb: string | number) => ({
      ccc: {
        $url: (url?: { hash?: string }) => ({ path: `/aaa/${bbb}/ccc/`, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ path: `/aaa/${bbb}/`, hash: url?.hash })
    })
  },
  blog: {
    _slug: (slug?: string | number) => ({
      $url: (url: { query: Query_299ea4d81e3b9c21b408451999103362b03cfbc7a218d427f66c1b9f57a83c09, hash?: string }) => ({ path: `/blog${slug !== undefined ? `/${slug}` : ''}/`, query: url.query as any, hash: url.hash })
    })
  },
  $url: (url: { query: Query_f45e456f277c9df56903afe963aacd39411f348519aba9af9942672c8ca6f58a, hash?: string }) => ({ path: '/', query: url.query as any, hash: url.hash })
}

export type PagesPath = typeof pagesPath

declare module 'vue/types/vue' {
  interface Vue {
    $pagesPath: PagesPath
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $pagesPath: PagesPath
  }

  interface Context {
    $pagesPath: PagesPath
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $pagesPath: PagesPath
  }
}

const pathPlugin: Plugin = (_, inject) => {
  inject('pagesPath', pagesPath)
}

export default pathPlugin
