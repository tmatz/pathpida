import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

export const parseQueryFromTS = (output: string, file: string, suffix: number) => {
  const fileData = fs.readFileSync(file, 'utf8')
  const typeName = ['Query', 'OptionalQuery'].find(type =>
    new RegExp(`export (interface ${type} ?{|type ${type} ?=)`).test(fileData)
  )

  if (!typeName) return

  const importPath = path
    .relative(output, file)
    .replace(/\\/g, '/')
    .replace(/(\/index)?\.tsx?$/, '')

  const importName = `${typeName}${suffix !== -1 ? suffix : `_${hash(importPath)}`}`

  return {
    importName,
    importString: `import type { ${typeName} as ${importName} } from '${importPath}'`
  }
}

function hash(str: string): string {
  return crypto.createHash('sha1').update(str).digest('hex')
}
