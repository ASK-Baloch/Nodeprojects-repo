import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep=()=>{
    return new Promise((resolve, reject) => {
      setTimeout(resolve,1500);
    })
  }
  
   async function welcome() {
    const title=chalkAnimation.rainbow(`Let the todo list Begin
     _________________
    | _______________ |
    ||.-----___-----.||
    |||_____________|||
    ||.-----___-----.||
    |||_____________|||
    ||.-----___-----.||
    |||_____________|||
    ||.-----___-----.||
    |||             |||
    |||_____________|||
    ''===============''
    `);
 
    await sleep();
    title.stop();
  }

  
 await welcome();

let todos: { name: any; completed: boolean; }[] = [];

async function main() {
  const choices = [
    { name: 'Add a todo', value: 'add' },
    { name: 'Remove a todo', value: 'remove' },
    { name: 'Toggle a todo', value: 'toggle' },
    { name: 'Quit', value: 'quit' },
  ];

  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices,
    });

    if (action === 'quit') {
      break;
    }

    switch (action) {
      case 'add': {
        const { name } = await inquirer.prompt({
          type: 'input',
          name: 'name',
          message: 'What is the name of the todo?',
        });

        todos.push({ name, completed: false });

        console.log(`Added "${name}" to the list of todos.`);
        break;
      }

      case 'remove': {
        const { name } = await inquirer.prompt({
          type: 'list',
          name: 'name',
          message: 'Which todo do you want to remove?',
          choices: todos.map(todo => ({ name: todo.name, value: todo })),
        });

        todos.splice(todos.indexOf(name), 1);

        console.log(`Removed "${name.name}" from the list of todos.`);
        break;
      }

      case 'toggle': {
        const { name } = await inquirer.prompt({
          type: 'list',
          name: 'name',
          message: 'Which todo do you want to toggle?',
          choices: todos.map(todo => ({ name: todo.name, value: todo })),
        });

        name.completed = !name.completed;

        console.log(`Toggled "${name.name}" to ${name.completed ? 'completed' : 'not completed'}.`);
        break;
      }
    }
  }
  console.log('Goodbye!');
}

async function startAgain(){
    do{
    await  main();
    
  var doAgain = await inquirer
      .prompt({
        type:"input",
        name:"restart",
        message:"Do you want to restart your APP ? press y to Continue or n to End "
  })
  }while((doAgain.restart.toLowerCase() == "y" || doAgain.restart.toLowerCase() == "yes"))
}


startAgain();

