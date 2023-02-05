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

  const importName = `${typeName}${makeSuffix(suffix, importPath)}`

  return {
    importName,
    importString: `import type { ${typeName} as ${importName} } from '${importPath}'`
  }
}

function makeSuffix(suffix: number, importPath: string): string {
  if (suffix !== -1) {
    return `${suffix}`
  }
  return `_${importPath.replace(/[^A-Za-z0-9_$]/g, c => (c === '/' ? '$' : '_'))}`
}
