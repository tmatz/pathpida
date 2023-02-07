import fs from 'fs'
import { SuffixMethod } from './getConfig'
import { getImportPath } from './getImportPath'
import { makeSuffix } from './makeSuffix'

export const parseQueryFromTS = (
  output: string,
  file: string,
  suffix: SuffixMethod,
  index: number
) => {
  const fileData = fs.readFileSync(file, 'utf8')
  const typeName = ['Query', 'OptionalQuery'].find(type =>
    new RegExp(`export (interface ${type} ?{|type ${type} ?=)`).test(fileData)
  )

  if (!typeName) return

  const importPath = getImportPath(output, file)

  const importName = `${typeName}${makeSuffix(suffix, index, importPath)}`

  return {
    importName,
    importString: `import type { ${typeName} as ${importName} } from '${importPath}'`
  }
}
