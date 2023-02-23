#! /usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
const RandomNumberGenerator = () => {
    let randomNumber = Math.round(Math.random() * 10);
    return randomNumber;
};
let randomNumber = RandomNumberGenerator();
let count = 0;
const wait = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const gameTitle = chalkAnimation.rainbow(' Let the Game begin');
    await wait();
    gameTitle.stop();
    console.log(chalk.rgb(18, 189, 227)(`
    ___.                                                      .__                                               
    ____  __ __  _____\_ |__   ___________          ____  __ __   ____   ______ _____|__| ____    ____           _________    _____   ____  
   /    \|  |  \/     \| __ \_/ __ \_  __ \       / ___ \|  |  \_/ __ \ /  ___//  ___/  |/    \  / ___\       /  ___\__  \  /     \_/ __ \ 
  |   |  \  |  /  Y Y  \ \_\ \  ___/|  | \/      / /_/  >  |  /\  ___/ \___ \ \___ \|  |   |  \/ /_/  >      / /_/  > __ \|  Y Y  \  ___/ 
  |___|  /____/|__|_|  /___  /\___  >__|         \___  /|____/  \___  >____  >____  >__|___|  /\___  /       \___  (____  /__|_|  /\___  >
       \/            \/    \/     \/            /_____/             \/     \/     \/        \//_____/       /_____/     \/      \/     \/ 
    `));
    console.log(`
    ${` "HOW TO PLAY" `}
    ${` GUESS NUMBER BETWEEN 0 AND 10 :) 
     YOU WILL BE HAVING 3 TRIALS
    IF YOU GUESS CORRECTLY WITHIN 3 TRAILS`} ${'YOU WILL BE A WINNER!'}`);
}
async function askagain(count, randomNumber) {
    const ask = await inquirer.prompt({
        name: 'ask',
        type: 'input',
        message: 'Play Again? press Y or N for End the Game!:',
        default() {
            return 'Y';
        }
    });
    const asked = ask.ask;
    if (asked === 'y' || asked === 'Y')
        guessGame();
    else {
        console.log(`${`Good Bye :) !`}`);
        process.exit(0);
    }
}
async function guessGame() {
    const number = await inquirer.prompt({
        name: 'number',
        type: 'input',
        message: 'Guess Number :',
        //     default() {
        //     return 'Number';
        // }
    });
    const guessNumber = parseInt(number.number);
    // console.log(guessNumber)
    if (!isNaN(guessNumber)) {
        checkNumber(guessNumber);
    }
    else {
        console.log(`${'Not a number'}`);
        askagain(count);
    }
}
async function checkNumber(number) {
    // const spinner = createSpinner('comparing answer...').start()
    // await wait(1000)
    if (number === randomNumber) {
        console.log(` Woah! You guess it Right! ${number}`);
        askagain(count = 0, randomNumber = RandomNumberGenerator());
    }
    else {
        count++;
        if (count === 3) {
            console.log(` You lose! :( \n  Number was ${randomNumber} :( `);
            askagain(count = 0, randomNumber = RandomNumberGenerator());
        }
        else {
            console.log(`${'Try Again :)'}`);
            guessGame();
        }
    }
}
await welcome();
await guessGame();
