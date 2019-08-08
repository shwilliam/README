import chalk from 'chalk'
import fs from 'fs'
import {promisify} from 'util'
import makeReadmeContent from './template'

const makeFile = async (filename, content) =>
  fs.writeFile(`./${filename}`, content, e => e && console.error(e))

export const createReadme = async opts => {
  await makeFile(
    'README.md',
    makeReadmeContent({
      ...opts,
      targetDir: process.cwd(),
    }),
  )

  console.log(chalk.green.bold('DONE'))

  return 1
}
