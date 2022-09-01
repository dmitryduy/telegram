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
      },
      {
        type: 'input',
        name: 'tag',
        message: 'Where is the tag name(Optional div)',
        initial: 'div'
      },
      {
        type: 'confirm',
        name: 'isConstant',
        message: 'Is create constants file?',
      },
      {
        type: 'confirm',
        name: 'isTypings',
        message: 'Is create typings file?',
      },
    ];
    return inquirer
      .prompt(questions)
      .then(answers => {
        const {dir, componentName} = answers;

        const absPath = `src/${dir}/${capitalize(componentName)}`;
        return {...answers, componentName: capitalize(componentName), absPath};
      });
  }
};