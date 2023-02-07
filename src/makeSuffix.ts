import crypto from 'crypto'
import { SuffixMethod } from './getConfig'

export function makeSuffix(method: SuffixMethod, index: number, importPath: string): string {
  switch (method) {
    case 'number':
      return `${index}`
    case 'path':
      return `_${importPath.replace(/[^A-Za-z0-9_$]/g, c => (c === '/' ? '$' : '_'))}`
    case 'hash':
      return `_${crypto.createHash('sha256').update(importPath).digest('hex')}`
  }
}
