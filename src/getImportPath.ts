import path from 'path'

export function getImportPath(from: string, to: string) {
  return path
    .relative(from, to)
    .replace(/\\/g, '/')
    .replace(/(\/index)?\.(tsx|ts|vue)?$/, '')
}
