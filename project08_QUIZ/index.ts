#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
// import { run } from "node:test";


let count = 0;
const wait = (ms = 2000) => new Promise((e) => setTimeout(e, ms));
async function welcome() {
  const gameTitle = chalkAnimation.rainbow(
    " WElCOME to QUIZ ");
  await wait();
  gameTitle.stop();
  console.log(`${chalk.magentaBright(`PLAY AND HAVE FUN `)}`)
  
}
await welcome()
console.log(`${chalk.whiteBright(`
    ._ 
(|L||/_
 |      
`)}`)
interface Question {
  type: 'list'; 
  name: string; 
  message: string; 
  choices: string[];
}

const questions: Question[] = [
  {
    type:"list",
    name:"option1",
    message:"what was the first president of america",
    choices:["John Adams","George Washington","Aaron Burr George Clinton","James Madison"]
  },
  {
    type:"list",
    name:"option2",
    message:"who  was the first man to walk on moon",
    choices:["Alan L.","Edwin Buzz Aldrin Jr","Neil Armstrong","Alan Shepard"]
  },{
    type:"list",
    name:"option3",
    message:"how many books are there in this world",
    choices:["129,864,880 books","105,582,900","115,900,588","130,550,210"]
  },
  {
    type:"list",
    name:"option4",
    message:"how many muslims countries are there in the world",
    choices:["30","39","23","50"]
  },
  {
    type:"list",
    name:"option5",
    message:"How many time zones are there in Russia?",
    choices:["4","11","8","9"]
  }
];

const correctAnswers:any = {
  option1:"George Washington",
  option2:"Neil Armstrong",
  option3:"129,864,880 books", 
  option4:"50",
  option5:"11"
};


async function runQuiz() {

  const answers  = await inquirer.prompt(questions);

  let score = 0;

  Object.keys(correctAnswers).forEach((questionName) => {
    if (answers[questionName] === correctAnswers[questionName]) {
      score += 1;
    }
  });
  if(score <= 2 ){
    console.log(`${chalk.redBright(`You lost the quiz . your final score is ${score}`)}`)

  }
  else{
    console.log(`${chalk.greenBright(`Hurray you won . You got ${score} out of ${questions.length} questions correct!`)}`)
}
}

async function startAgain(){
  do{
  await runQuiz()
 
  var doAgain = await inquirer
      .prompt({
        type:"input",
        name:"restart",
        message:"Do you want to restart your calulation ? press y or n "
  })
  }while((doAgain.restart.toLowerCase() == "y" || doAgain.restart.toLowerCase() == "yes"))
}

startAgain();
