#! /usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation'

const wait = (ms = 2000) => new Promise((r)=> setTimeout(r,ms))
async function welcome(){
    const gameTitle= chalkAnimation.rainbow('Let the Transactions begin')
    await wait()
    gameTitle.stop()
    console.log(chalk.rgb(18, 189, 227)(`A T  M `))
}
 await welcome()

class ATM {
  private balance:number;
  private authenticatedUser: { id: number, pin: number } | null;

  constructor(initialBalance: number) {
    this.balance = Math.round(Math.random()*10000) ;
    this.authenticatedUser = null;
  }


 public  async login(): Promise<void> {
 
    const answers = await inquirer.prompt([
      {type:"list",name:"operations",message:"which operation do you want to perform",choices:["checkBalance","deposit","withDraw"]},
      { type: 'number', name: 'userId', message: 'Enter your user ID:' },
      { type: 'number', name: 'userPin', message: 'Enter your user PIN:' },
      {type:"number",name:"amount",message:"Enter your Amount"}
    ]);

    // Generate random user data
    // const randomUserData = this.generateRandomUserData();
    // console.log(randomUserData)

    // Check if provided user id and pin match the generated user data
    let amount:number=  answers.amount;
    let myATM = new ATM (amount);
    // this.balance=answers.amount
     
    if (answers.userId && answers.userPin){
      this.authenticatedUser;
      console.log('Login successful.');
    } else {
      console.log(' Please User, Enter ID or PIN.');
    }
    
   amount ;
  if(answers.operations == "checkBalance"){
    if (this.authenticatedUser!) {
     
}
      console.log(`Current balance is $${this.balance}.`);
      }
  amount;
  if(answers.operations == "deposit"){
      if (!this.authenticatedUser!) {
      
  }
        this.balance += amount;
        console.log(`Deposited $${amount}. New balance is $${this.balance}.`) 
      }
      
  amount;
  if(answers.operations == "withDraw"){
        if (!this.authenticatedUser!) {
        
}
        if (amount > this.balance) {
          console.log(`Insufficient funds. Current balance is $${this.balance}.`);
    } else {
      this.balance -= amount;
      console.log(`Withdrew $${amount}. New balance is $${this.balance}.`);
    }}
  }
 
  }

  async function startAgain(){
    do{
    const myATM = new ATM(10000)
    await  myATM.login()
  var doAgain = await inquirer
      .prompt({
        type:"input",
        name:"restart",
        message:"Do you want to restart your calulation ? press y or n "
  })
  }while((doAgain.restart.toLowerCase() == "y" || doAgain.restart.toLowerCase() == "yes"))
}


startAgain();
export{}

