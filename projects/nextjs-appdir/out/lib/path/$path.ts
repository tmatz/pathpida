import type { Query as Query___$__$__$app$page } from '../../../app/page'
import type { OptionalQuery as OptionalQuery___$__$__$app$_group1_$_pid_$page } from '../../../app/(group1)/[pid]/page'
import type { Query as Query___$__$__$app$_group1_$blog$____slug_$page } from '../../../app/(group1)/blog/[...slug]/page'
import type { OptionalQuery as OptionalQuery___$__$__$pages$children$_pid_ } from '../../../pages/children/[pid]'
import type { Query as Query___$__$__$pages$children$blog$____slug_ } from '../../../pages/children/blog/[...slug]'

export const pagesPath = {
  "%E6%97%A5%E6%9C%AC%E8%AA%9E": {
    $url: (url?: { hash?: string }) => ({ pathname: '/%E6%97%A5%E6%9C%AC%E8%AA%9E' as const, hash: url?.hash })
  },
  _pid: (pid: string | number) => ({
    $url: (url?: { query?: OptionalQuery___$__$__$app$_group1_$_pid_$page, hash?: string }) => ({ pathname: '/[pid]' as const, query: { pid, ...url?.query }, hash: url?.hash })
  }),
  "blog": {
    _slug: (slug: string[]) => ({
      $url: (url: { query: Query___$__$__$app$_group1_$blog$____slug_$page, hash?: string }) => ({ pathname: '/blog/[...slug]' as const, query: { slug, ...url.query }, hash: url.hash })
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
  $url: (url: { query: Query___$__$__$app$page, hash?: string }) => ({ pathname: '/' as const, query: url.query, hash: url.hash }),
  "children": {
    "%E6%97%A5%E6%9C%AC%E8%AA%9E": {
      $url: (url?: { hash?: string }) => ({ pathname: '/children/%E6%97%A5%E6%9C%AC%E8%AA%9E' as const, hash: url?.hash })
    },
    _a: (a: string | number) => ({
      "b": {
        _c: (c: string[]) => ({
          $url: (url?: { hash?: string }) => ({ pathname: '/children/[a]/b/[...c]' as const, query: { a, c }, hash: url?.hash })
        })
      }
    }),
    _pid: (pid: string | number) => ({
      $url: (url?: { query?: OptionalQuery___$__$__$pages$children$_pid_, hash?: string }) => ({ pathname: '/children/[pid]' as const, query: { pid, ...url?.query }, hash: url?.hash })
    }),
    "aaa": {
      _bbb: (bbb: string[]) => ({
        "ccc": {
          $url: (url?: { hash?: string }) => ({ pathname: '/children/aaa/[...bbb]/ccc' as const, query: { bbb }, hash: url?.hash })
        }
      }),
      "api": {
        "samples": {
          $url: (url?: { hash?: string }) => ({ pathname: '/children/aaa/api/samples' as const, hash: url?.hash })
        }
      }
    },
    "api": {
      "users": {
        $url: (url?: { hash?: string }) => ({ pathname: '/children/api/users' as const, hash: url?.hash })
      }
    },
    "blog": {
      _slug: (slug: string[]) => ({
        $url: (url: { query: Query___$__$__$pages$children$blog$____slug_, hash?: string }) => ({ pathname: '/children/blog/[...slug]' as const, query: { slug, ...url.query }, hash: url.hash })
      }),
      "hoge": {
        _fuga: (fuga?: string[]) => ({
          $url: (url?: { hash?: string }) => ({ pathname: '/children/blog/hoge/[[...fuga]]' as const, query: { fuga }, hash: url?.hash })
        })
      }
    },
    "x": {
      _y: (y: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/children/x/[y]' as const, query: { y }, hash: url?.hash }),
        "z": {
          $url: (url?: { hash?: string }) => ({ pathname: '/children/x/[y]/z' as const, query: { y }, hash: url?.hash })
        }
      })
    }
  }
}

export type PagesPath = typeof pagesPath
