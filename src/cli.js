import arg from 'arg'
import inquirer from 'inquirer'
import {createReadme} from './index'

const parseArgsToOptions = rawArgs => {
  const args = arg(
    {
      '--shwilliam': Boolean,
      '--me': Boolean,
    },
    {
      argv: rawArgs.slice(1),
    },
  )
  return {
    isMe: args['--shwilliam'] || args['--me'] || false,
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
    {
      type: 'checkbox',
      name: 'compat',
      message: "Please specify this project's compatibility?",
      choices: ['Firefox', 'Chrome', 'Opera', 'Edge', 'IE'],
    },
  ]

  if (!options.isMe) {
    questions.push({
      type: 'input',
      name: 'bmc',
      message: 'Buy Me a Coffee url?',
    })
    questions.push({
      type: 'input',
      name: 'username',
      message: 'GitHub username?',
    })
  }

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
