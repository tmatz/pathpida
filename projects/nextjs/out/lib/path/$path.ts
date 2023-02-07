import type { Query as Query___$__$__$pages } from '../../../pages'
import type { OptionalQuery as OptionalQuery___$__$__$pages$_pid_ } from '../../../pages/[pid]'
import type { Query as Query___$__$__$pages$blog$____slug_ } from '../../../pages/blog/[...slug]'

export const pagesPath = {
  "%E6%97%A5%E6%9C%AC%E8%AA%9E": {
    $url: (url?: { hash?: string }) => ({ pathname: '/%E6%97%A5%E6%9C%AC%E8%AA%9E' as const, hash: url?.hash })
  },
  _a: (a: string | number) => ({
    "b": {
      _c: (c: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/[a]/b/[...c]' as const, query: { a, c }, hash: url?.hash })
      })
    }
  }),
  _pid: (pid: string | number) => ({
    $url: (url?: { query?: OptionalQuery___$__$__$pages$_pid_, hash?: string }) => ({ pathname: '/[pid]' as const, query: { pid, ...url?.query }, hash: url?.hash })
  }),
  "aaa": {
    _bbb: (bbb: string[]) => ({
      "ccc": {
        $url: (url?: { hash?: string }) => ({ pathname: '/aaa/[...bbb]/ccc' as const, query: { bbb }, hash: url?.hash })
      }
    }),
    "api": {
      "samples": {
        $url: (url?: { hash?: string }) => ({ pathname: '/aaa/api/samples' as const, hash: url?.hash })
      }
    }
  },
  "blog": {
    _slug: (slug: string[]) => ({
      $url: (url: { query: Query___$__$__$pages$blog$____slug_, hash?: string }) => ({ pathname: '/blog/[...slug]' as const, query: { slug, ...url.query }, hash: url.hash })
    }),
    "hoge": {
      _fuga: (fuga?: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/blog/hoge/[[...fuga]]' as const, query: { fuga }, hash: url?.hash })
      })
    }
  },
  "x": {
    $url: (url?: { hash?: string }) => ({ pathname: '/x' as const, hash: url?.hash }),
    _y: (y: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/x/[y]' as const, query: { y }, hash: url?.hash }),
      "z": {
        $url: (url?: { hash?: string }) => ({ pathname: '/x/[y]/z' as const, query: { y }, hash: url?.hash })
      }
    })
  },
  $url: (url: { query: Query___$__$__$pages, hash?: string }) => ({ pathname: '/' as const, query: url.query, hash: url.hash })
}

export type PagesPath = typeof pagesPath
