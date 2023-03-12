#!user/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const starting = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.neon("lets start calculation"); //start 
    await starting();
    rainbowTitle.stop();
    console.log(chalk.rgb(18, 189, 227)(`
   _____________________
  |  _________________  |
  | | JO           0. | |
  | |_________________| |
  |  ___ ___ ___   ___  |
  | | 7 | 8 | 9 | | + | |
  | |___|___|___| |___| |
  | | 4 | 5 | 6 | | - | |
  | |___|___|___| |___| |
  | | 1 | 2 | 3 | | x | |
  | |___|___|___| |___| |
  | | . | 0 | = | | / | |
  | |___|___|___| |___| |
  |_____________________|
  `));
}
await welcome();
async function askQuestion() {
    let answers = await inquirer
        .prompt([
        /* Pass your questions in here */
        {
            type: "list",
            name: "operator",
            message: "which operation do you want to perform? \n",
            choices: ["Addition", "Subtraction", "Multiplication", "Division", "Power"]
        },
        {
            type: "number",
            name: "num1",
            message: chalk.gray("Enter first number : "),
        },
        {
            type: "number",
            name: "num2",
            message: chalk.gray("Enter second number : "),
        }
    ]);
    if (answers.operator == "Addition") {
        console.log(chalk.greenBright(`${answers.num1} + ${answers.num2} = ${answers.num1 + answers.num2}`));
    }
    else if (answers.operator == "Subtraction") {
        console.log(chalk.greenBright(`${answers.num1} - ${answers.num2} = ${answers.num1 - answers.num2}`));
    }
    else if (answers.operator == "Multiplication") {
        console.log(chalk.greenBright(`${answers.num1} * ${answers.num2} = ${answers.num1 * answers.num2}`));
    }
    else if (answers.operator == "Division") {
        console.log(chalk.greenBright(`${answers.num1} / ${answers.num2} = ${answers.num1 / answers.num2}`));
    }
    else if (answers.operator == "Power") {
        console.log(chalk.greenBright(`${answers.num1} ^ ${answers.num2} = ${answers.num1 ** answers.num2}`));
    }
}
;
async function startAgain() {
    do {
        await askQuestion();
        var doAgain = await inquirer
            .prompt({
            type: "input",
            name: "restart",
            message: "Do you want to restart your calulation ? press y or n "
        });
    } while ((doAgain.restart.toLowerCase() == "y" || doAgain.restart.toLowerCase() == "yes"));
}
startAgain();
