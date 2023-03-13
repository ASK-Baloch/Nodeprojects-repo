#! /usr/bin/env node


import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
// import { type } from "os";
// import { get } from "http";

let count = 0;
const wait = (ms = 10000) => new Promise((e) => setTimeout(e, ms));
async function welcome() {
  const gameTitle = chalkAnimation.pulse("WElCOME to  YOUR PERSONAL BANK CONSOLE APP");
  await wait();
  gameTitle.stop();
  console.log(`${chalk.magentaBright(`HAVE FUN `)}`);
}
await welcome();
console.log(
  `${chalk.bgWhiteBright.blueBright(`
  :::====  :::====  :::= === :::  ===      :::====  :::====  :::==== 
  :::  === :::  === :::===== ::: ===       :::  === :::  === :::  ===
  =======  ======== ======== ======        ======== =======  ======= 
  ===  === ===  === === ==== === ===       ===  === ===      ===     
  =======  ===  === ===  === ===  ===      ===  === ===      ===     
`)}`
);

class BankAccount {
  private firstName: string;
  private lastName: string;
  private gender: string;
  private age: number;
  private accountId: number;
  private balance: number;

  constructor(firstName: string, lastName: string, gender: string, age: number, accountId: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.accountId = accountId;
    this.balance = 0;
  }

  credit(amount: number) {
    this.balance += amount;
    console.log(`money credited successful. New balance is ${this.balance}`);
  }

  debit(amount: number) {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`money debited successful. New balance is ${this.balance}`);
    } else {
      console.log(`Insufficient funds. Current balance is ${this.balance}`);
    }
  }

  getBalance() {
    console.log(`Current balance is ${this.balance}`);
  }

  printAccountInfo() {
    console.log(`Account ID: ${this.accountId}`);
    console.log(`Name: ${this.firstName} ${this.lastName}`);
    console.log(`Gender: ${this.gender}`);
    console.log(`Age: ${this.age}`);
    console.log(`Balance: ${this.balance}`);
  }
}

async function createAccount() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'firstName', message: 'Enter your first name:' },
    { type: 'input', name: 'lastName', message: 'Enter your last name:' },
    { type: 'list', name: 'gender', message: 'Select your gender:', choices: ['Male', 'Female', 'Other'] },
    { type: 'input', name: 'age', message: 'Enter your age:', validate: value => !isNaN(parseInt(value)) },
    { type: 'input', name: 'accountId', message: 'Enter your account ID:', validate: value => !isNaN(parseInt(value)) },
  ]);

  const account = new BankAccount(
    answers.firstName,
    answers.lastName,
    answers.gender,
    parseInt(answers.age),
    parseInt(answers.accountId),
  );

  console.log('Account created successfully!');
  account.printAccountInfo();
  return account;
}

async function run(this: any) {
  console.log('Welcome to the bank app!');
  const account = await createAccount();

  while (true) {
    const answers = await inquirer.prompt([
      { type: 'list', name: 'action', message: chalk.greenBright(`What would you like to do?`), choices: ['Credit', 'debit', 'Check balance', 'Exit'] },
    ]);

    if (answers.action === 'Credit') {
      const creditAnswers = await inquirer.prompt([
        { type: 'input', name: 'amount', message: chalk.redBright('Enter the amount to credit:'), validate: value => !isNaN(parseFloat(value)) },
      ]);
      account.credit(parseFloat(creditAnswers.amount));
    } else if (answers.action === 'debit') {
      const debitAnswers = await inquirer.prompt([
        { type: 'input', name: 'amount', message:chalk.cyanBright('Enter the amount to debit:'), validate: value => !isNaN(parseFloat(value)) },
      ]);
      account.debit(parseFloat(debitAnswers.amount));
    } else if (answers.action === 'Check balance') {
      account.getBalance();
    } else if (answers.action === 'Exit') {
      console.log(`${chalk.yellow.italic(`GOODBYE:)`)}`)
      break;
    }else {
      console.log(chalk.red("Invalid choice. Please choose 1, 2, or 3."));
      this.showMainMenu();
    }
  }
}
  run();