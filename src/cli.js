import arg from 'arg'
import inquirer from 'inquirer'
import {createReadme} from './index'

const parseArgsToOptions = rawArgs => {
  const args = arg(
    {
      '--shwilliam': Boolean,
      '--me': Boolean,
      '--bmc': Boolean,
      '--badges': Boolean,
      '--browsers': Boolean,
    },
    {
      argv: rawArgs.slice(1),
    },
  )
  return {
    isMe: args['--shwilliam'] || args['--me'] || false,
    hasCoffee: args['--bmc'] || false,
    hasBadges: args['--badges'] || false,
    hasBrowsers: args['--browsers'] || false,
  }
}

const promptForOptions = async options => {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Project name?',
    },
    {
      type: 'input',
      name: 'desc',
      message: 'Project description?',
    },
    {
      type: 'input',
      name: 'slug',
      message: 'GitHub project slug?',
    },
    {
      type: 'input',
      name: 'npmName',
      message: 'NPM name?',
    },
  ]

  if (options.hasBrowsers)
    questions.push({
      type: 'checkbox',
      name: 'compat',
      message: "Please specify this project's compatibility?",
      choices: ['Firefox', 'Chrome', 'Opera', 'Edge', 'IE'],
    })

  if (!options.isMe) {
    questions.unshift({
      type: 'input',
      name: 'username',
      message: 'GitHub username?',
    })

    if (options.hasCoffee) {
      questions.push({
        type: 'input',
        name: 'bmc',
        message: 'Buy Me a Coffee url?',
      })
    }
  }

  if (options.hasBadges)
    questions.push({
      type: 'checkbox',
      name: 'badges',
      message: 'Please specify which badges you would like?',
      choices: ['size', 'version', 'downloads'],
    })

  const answers = await inquirer.prompt(questions)

  if (options.isMe) {
    answers.bmc = 'https://www.buymeacoffee.com/shwilliam'
    answers.username = 'shwilliam'
  }

  return answers
}

export const cli = async args => {
  const options = await promptForOptions(parseArgsToOptions(args))
  await createReadme(options)
}
