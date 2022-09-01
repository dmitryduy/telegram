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
        choices: ['components', 'pages']
      }
    ];
    return inquirer
      .prompt(questions)
      .then(answers => {
        const {componentName, dir} = answers;

        const absPath = `src/${dir}/${capitalize(componentName)}/${capitalize(componentName)}.i18n`;
        return {componentName: capitalize(componentName), absPath};
      });
  }
};