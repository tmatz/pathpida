import type { Plugin } from '@nuxt/types'

type Query___$__$__$pages = { hoge: string }

type OptionalQuery___$__$__$pages$_pid = { hoge: string }

type Query___$__$__$pages$blog$_slug = {
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
    $url: (url?: { query?: OptionalQuery___$__$__$pages$_pid, hash?: string }) => ({ path: `${pid !== undefined ? `/${pid}` : ''}/`, query: url?.query as any, hash: url?.hash })
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
      $url: (url: { query: Query___$__$__$pages$blog$_slug, hash?: string }) => ({ path: `/blog${slug !== undefined ? `/${slug}` : ''}/`, query: url.query as any, hash: url.hash })
    })
  },
  $url: (url: { query: Query___$__$__$pages, hash?: string }) => ({ path: '/', query: url.query as any, hash: url.hash })
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
