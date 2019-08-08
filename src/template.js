const check = bool => (bool ? '✅' : '❌')

export default ({
  name,
  desc = '',
  username,
  slug,
  npmName,
  compat,
  bmc,
  badges,
}) => `# ${name}

> ${desc}

${badges ? `
${badges.includes('downloads')
    ? `![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hy/${npmName})`
    : ''
}
${
  badges.includes('size')
    ? `![Zipped package size](https://img.shields.io/bundlephobia/min/${npmName})`
    : ''
}
${
  badges.includes('version')
    ? `![npm version](https://img.shields.io/npm/v/${npmName})`
    : ''
}

---
` : ''}

## Installation

\`\`\`shell
$ npm i ${npmName}
\`\`\`

---

## Usage

\`\`\`js
console.log('✨')
\`\`\`

---

${
  compat
    ? `## Browser compatibility

|   Firefox   |   Chrome   |   Opera    |    Edge    |     IE     |
| :---------: | :--------: | :--------: | :--------: | :--------: |
| ${check(compat.includes('Firefox'))} | ${check(
        compat.includes('Chrome'),
      )} | ${check(compat.includes('Opera'))} | ${check(
        compat.includes('Edge'),
      )} | ${check(compat.includes('IE'))} |

---`
    : ''
}
## Contributing

This project is open to and encourages contributions! Feel free to discuss any bug fixes/features in the [issues](https://github.com/${username}/${slug}/issues). If you wish to work on this project:

1. Fork [this project](https://github.com/${username}/${slug})
2. Create a branch (\`git checkout -b new-branch\`)
3. Commit your changes (\`git commit -am 'add new feature'\`)
4. Push to the branch (\`git push origin new-branch\`)
5. [Submit a pull request!](https://github.com/${username}/${slug}/pull/new/master)

${
  bmc
    ? '<style>.bmc-button img{width: 27px !important;margin-bottom: 1px !important;box-shadow: none !important;border: none !important;vertical-align: middle !important;}.bmc-button{line-height: 36px !important;height:37px !important;text-decoration: none !important;display:inline-flex !important;color:#ffffff !important;background-color:#FF813F !important;border-radius: 3px !important;border: 1px solid transparent !important;padding: 0px 9px !important;font-size: 17px !important;letter-spacing:-0.08px !important;box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;margin: 0 auto !important;font-family:\'Lato\', sans-serif !important;-webkit-box-sizing: border-box !important;box-sizing: border-box !important;-o-transition: 0.3s all linear !important;-webkit-transition: 0.3s all linear !important;-moz-transition: 0.3s all linear !important;-ms-transition: 0.3s all linear !important;transition: 0.3s all linear !important;}.bmc-button:hover, .bmc-button:active, .bmc-button:focus {-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;text-decoration: none !important;box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;opacity: 0.85 !important;color:#ffffff !important;}</style><link href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet"><a class="bmc-button" target="_blank" href="${bmc}"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">Buy me a coffee</span></a>'
    : ''
}
`
