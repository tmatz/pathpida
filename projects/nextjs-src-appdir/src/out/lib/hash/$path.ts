import type { Query as Query_eb9e3dae7a2db78a9ac13bbcdbc67ef0f0a2137fe52105ff68d4b5e47f06f0d3 } from '../../../app/page'
import type { OptionalQuery as OptionalQuery_cb2ac802ce6e8b4b7ad4c6745282ffeffe935163f6c8c025c23a5258c2bfd2fb } from '../../../app/(group1)/[pid]/page'
import type { Query as Query_7e21494cdf08d3c45572a3703bcd8fb01ae899716d5d7a8600c78a09d86b9c5f } from '../../../app/(group1)/blog/[...slug]/page'

export const pagesPath = {
  "%E6%97%A5%E6%9C%AC%E8%AA%9E": {
    $url: (url?: { hash?: string }) => ({ pathname: '/%E6%97%A5%E6%9C%AC%E8%AA%9E' as const, hash: url?.hash })
  },
  _pid: (pid: string | number) => ({
    $url: (url?: { query?: OptionalQuery_cb2ac802ce6e8b4b7ad4c6745282ffeffe935163f6c8c025c23a5258c2bfd2fb, hash?: string }) => ({ pathname: '/[pid]' as const, query: { pid, ...url?.query }, hash: url?.hash })
  }),
  "blog": {
    _slug: (slug: string[]) => ({
      $url: (url: { query: Query_7e21494cdf08d3c45572a3703bcd8fb01ae899716d5d7a8600c78a09d86b9c5f, hash?: string }) => ({ pathname: '/blog/[...slug]' as const, query: { slug, ...url.query }, hash: url.hash })
    }),
    "hoge": {
      _fuga: (fuga?: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/blog/hoge/[[...fuga]]' as const, query: { fuga }, hash: url?.hash })
      })
    }
  },
  "aaa": {
    _bbb: (bbb: string[]) => ({
      "ccc": {
        $url: (url?: { hash?: string }) => ({ pathname: '/aaa/[...bbb]/ccc' as const, query: { bbb }, hash: url?.hash })
      }
    }),
  },
  "x": {
    _y: (y: string | number) => ({
      "z": {
        $url: (url?: { hash?: string }) => ({ pathname: '/x/[y]/z' as const, query: { y }, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/x/[y]' as const, query: { y }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/x' as const, hash: url?.hash })
  },
  _a: (a: string | number) => ({
    "b": {
      _c: (c: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/[a]/b/[...c]' as const, query: { a, c }, hash: url?.hash })
      })
    }
  }),
  $url: (url: { query: Query_eb9e3dae7a2db78a9ac13bbcdbc67ef0f0a2137fe52105ff68d4b5e47f06f0d3, hash?: string }) => ({ pathname: '/' as const, query: url.query, hash: url.hash })
}

export type PagesPath = typeof pagesPath
