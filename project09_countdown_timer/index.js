#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
let count = 0;
const wait = (ms = 2000) => new Promise((e) => setTimeout(e, ms));
async function welcome() {
    const gameTitle = chalkAnimation.rainbow(" WElCOME to COUNTDOWN TIMER ");
    await wait();
    gameTitle.stop();
    console.log(`${chalk.magentaBright(`WAIT AND HAVE FUN `)}`);
}
await welcome();
console.log(`${chalk.whiteBright(`
:::===== :::====  :::  === :::  === :::= === :::==== :::====  :::====  :::  ===  === :::= ===
:::      :::  === :::  === :::  === :::===== :::==== :::  === :::  === :::  ===  === :::=====
===      ===  === ===  === ===  === ========   ===   ===  === ===  === ===  ===  === ========
===      ===  === ===  === ===  === === ====   ===   ===  === ===  ===  ===========  === ====
 =======  ======   ======   ======  ===  ===   ===   =======   ======    ==== ====   ===  ===
`)}`);
async function futureTime() {
    return inquirer
        .prompt([
        {
            type: 'input',
            name: 'date',
            message: 'Enter a future date in  (YYYY-MM-DD HH:mm:ss):',
            validate: (input) => {
                const isValid = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(input);
                return isValid || 'Please enter a valid date in the format YYYY-MM-DD HH:mm:ss';
            },
        },
    ])
        .then((answers) => new Date(answers.date));
}
async function startCountdown() {
    const futureDate = await futureTime();
    const interval = setInterval(() => {
        const now = new Date();
        const difference = Math.round((futureDate.getTime() - now.getTime()) / 1000);
        if (difference <= 0) {
            clearInterval(interval);
            console.log(`${chalk.redBright(` Countdown has ended`)}`);
        }
        else if (difference > 86400) {
            const days = Math.floor(difference / 86400);
            console.log(`${days} day${days !== 1 ? 's' : ''}left `);
        }
        else {
            console.log(`${chalk.greenBright(`${difference} seconds left to end `)}`);
        }
    }, 1000);
}
await startCountdown();
// async function startAgain(){
//   do{
//   var doAgain = await inquirer
//       .prompt({
//         type:"input",
//         name:"restart",
//         message:"Do you want to restart your calulation ? press y or n "
//   })
// }while((doAgain.restart.toLowerCase() == "y" || doAgain.restart.toLowerCase() == "yes"))
// }
// await startAgain();
