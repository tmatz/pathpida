import type { Query as Query_f45e456f277c9df56903afe963aacd39411f348519aba9af9942672c8ca6f58a } from '../../../pages'
import type { OptionalQuery as OptionalQuery_47d4de55f77bafadf07167a01197b994af8bf25098f37ba7dbe048e896898f5f } from '../../../pages/[pid]'
import type { Query as Query_1c2a5aabaf0ddb769a972593d313de14b3c665bf5f39da6b5cf587d80951217f } from '../../../pages/blog/[...slug]'

export const pagesPath = {
  _a: (a: string | number) => ({
    "b": {
      _c: (c: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/[a]/b/[...c]' as const, query: { a, c }, hash: url?.hash })
      })
    }
  }),
  _pid: (pid: string | number) => ({
    $url: (url?: { query?: OptionalQuery_47d4de55f77bafadf07167a01197b994af8bf25098f37ba7dbe048e896898f5f, hash?: string }) => ({ pathname: '/[pid]' as const, query: { pid, ...url?.query }, hash: url?.hash })
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
      $url: (url: { query: Query_1c2a5aabaf0ddb769a972593d313de14b3c665bf5f39da6b5cf587d80951217f, hash?: string }) => ({ pathname: '/blog/[...slug]' as const, query: { slug, ...url.query }, hash: url.hash })
    }),
    "hoge": {
      _fuga: (fuga?: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/blog/hoge/[[...fuga]]' as const, query: { fuga }, hash: url?.hash })
      })
    }
  },
  $url: (url: { query: Query_f45e456f277c9df56903afe963aacd39411f348519aba9af9942672c8ca6f58a, hash?: string }) => ({ pathname: '/' as const, query: url.query, hash: url.hash })
}

export type PagesPath = typeof pagesPath
