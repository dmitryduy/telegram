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
        choices: ['components', 'pages', 'global']
      },
      {
        type: 'input',
        name: 'util',
        message: 'What is the util name',
      },
    ];
    return inquirer
      .prompt(questions)
      .then(answers => {
        const {componentName, util, dir} = answers;
        let absPath = null;

        if (dir === 'global') {
          absPath = `src/utils`;
        } else {
          absPath = `src/${dir}/${capitalize(componentName)}/${capitalize(componentName)}.utils`;
        }
        return {absPath, util};
      });
  }
};