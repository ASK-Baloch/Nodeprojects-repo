#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { type } from "os";

let count = 0;
const wait = (ms = 2000) => new Promise((e) => setTimeout(e, ms));
async function welcome() {
  const gameTitle = chalkAnimation.rainbow(" WElCOME to  PERSONALITY CONSOLE APP");
  await wait();
  gameTitle.stop();
  console.log(`${chalk.magentaBright(`KNOW ABOUT YOURSELF AND HAVE FUN`)}`);
}
await welcome();
console.log(
  `${chalk.whiteBright(`
:::===== :::====  :::= === :::===  :::====  :::      :::=====      :::====  :::====  :::==== 
:::      :::  === :::===== :::     :::  === :::      :::           :::  === :::  === :::  ===
===      ===  === ========  =====  ===  === ===      ======        ======== =======  ======= 
===      ===  === === ====     === ===  === ===      ===           ===  === ===      ===     
 =======  ======  ===  === ======   ======  ======== ========      ===  === ===      ===     
`)}`
);

export class Person {
    protected personality: string = "Mystery";

    async AskQuestion() {
        const subjects = await inquirer.prompt([{
            name: "options",
            type: "number",
            message: `ENTER 1 if you are a very talkative person and have all the traits like seeking, engaging in and enjoying social interactions and 
ENTER 2 if you are a very silent person and have traits like avoid social situations, reserved  and  withdrawn in social settings`,
        //     choices:[1,2],
        validate: (input) => {
            const num = parseInt(input);
            if (isNaN(num)) {
              console.log(`
              Please enter a valid number (1 or 2)
              
              
              `);
              return this.AskQuestion();             
            }
            if (num !== 1 && num !== 2) {
              console.log(`
              Please enter either 1 or 2
              
              
              `);
              return this.AskQuestion(); 
            }
            return true;
          },
        }])
        if (subjects.options === 1) {
            this.personality = (chalk.greenBright( ` extrovert,congrats ${studentinfo.studentname}, you are good at communication `));
        } else if (subjects.options === 2) {
            this.personality = (chalk.redBright( `introvert,aww just work on communication skills  ${studentinfo.studentname} `));
        }
    }
    getPersonality() {
        return this.personality
    }

}

class Student extends Person {
    private _name: string = "";

    get accessName() {
        return this._name;
    }
    set accessName(_name) {
        this._name = _name;
    }
}

let studentData = new Student;
let studentinfo = await inquirer.prompt([{
    name: "studentname",
    type: "input",
    message: "Hey Student whats your name ! "
}])

let repeat = false;


async function findPersonality() {
    do {
     await studentData.AskQuestion();
     console.log(chalk.gray(`\t Your personality is ${studentData.getPersonality()}\n`));
     repeat = await Repeat()
    } while (repeat === true)
}

async function Repeat() {
    let again = await inquirer.prompt([{
        name: "repeat",
        type: "confirm",
        message: "Do you want to restart your test ? press y or n "
    }]);
     return again.repeat === true ? true : false
}

findPersonality()