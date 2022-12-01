const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

module.exports = {
  prompt: ({inquirer}) => {
    const questions = [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the component name?'
      },
      {
        type: 'select',
        name: 'dir',
        message: 'Where is the directory?',
        choices: ['components', 'pages', 'shared', 'global']
      },
      {
        type: 'input',
        name: 'hook',
        message: 'What is the hook name',
      },
    ];
    return inquirer
      .prompt(questions)
      .then(answers => {
        const {componentName, hook, dir} = answers;
        if (!hook.startsWith('use')) {
          throw new Error('hook name must start with "new"');
        }
        let absPath = null;

        if (dir === 'global') {
          absPath = `src/hooks`;
        } else {
          absPath = `src/${dir}/${capitalize(componentName)}/${capitalize(componentName)}.hook`;
        }
        return {absPath, hook};
      });
  }
};