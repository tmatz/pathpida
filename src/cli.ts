import minimist from 'minimist'
import build from './buildTemplate'
import getConfig, { SuffixMethod } from './getConfig'
import watch from './watchInputDir'
import write from './writeRouteFile'

const last = <T>(value: T | T[] | undefined): T | undefined => {
  return value == null ? undefined : Array.isArray(value) ? value.slice(-1)[0] : value
}

const parseSuffix = (arg: any): SuffixMethod => {
  const value = last<SuffixMethod>(arg)
  const suffixes: SuffixMethod[] = ['number', 'path', 'hash']
  if (value && !suffixes.includes(value)) {
    console.error(`ERROR: unexpected value of --suffix option.`)
    process.exit(1)
  }
  return value || 'number'
}

export const run = async (args: string[]) => {
  const argv = minimist(args, {
    string: ['version', 'watch', 'enableStatic', 'output', 'ignorePath', 'suffix'],
    alias: { v: 'version', w: 'watch', s: 'enableStatic', o: 'output', p: 'ignorePath' }
  })
  const suffix = parseSuffix(argv.suffix)

  argv.version !== undefined
    ? console.log(`v${require('../package.json').version}`)
    : argv.watch !== undefined
    ? await (async () => {
        const config = await getConfig(
          argv.enableStatic !== undefined,
          argv.output,
          argv.ignorePath,
          suffix
        )
        write(build(config))

        if (config.type === 'nextjs') {
          config.input && watch(config.input, () => write(build(config, 'pages')))
          config.appDir && watch(config.appDir.input, () => write(build(config, 'pages')))
        } else {
          watch(config.input, () => write(build(config, 'pages')))
        }

        config.staticDir && watch(config.staticDir, () => write(build(config, 'static')))
      })()
    : write(
        build(
          await getConfig(argv.enableStatic !== undefined, argv.output, argv.ignorePath, suffix)
        )
      )
}
