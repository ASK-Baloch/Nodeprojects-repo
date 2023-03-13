#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";


let count = 0;
const wait = (ms = 2000) => new Promise((e) => setTimeout(e, ms));
async function welcome() {
  const gameTitle = chalkAnimation.rainbow(
    " welcome to GTA fanmade");
  await wait();
  gameTitle.stop();

  console.log(`${chalk.magentaBright(`PLAY AND HAVE FUN `)}`)

}
await welcome()
// const systemNumber = Math.floor(Math.random() * 10);

// const input: {
//     number: number
// } = await inquirer.prompt([
//     {
//         type: "number",
//         name: "number",
//         message: "Write your guess b/w 1 to 10: "
//     }
// ])

// const { number } = input;


let getRandomNum = (min: number, max: number): number => {
  let num: number = Math.floor(Math.random() * (max - min)) + min
  return num;
}

// Game Variables
const enemies: string[] = ["Tenpenny", "Ryder", "Big Smoke", "Andreas Sanchez"];
const maxEnemyHealth: number = 85;
const enemyAttackDamage: number = 25;
// Player Variables
let health: number = 100;
const attackDamage: number = 50;
let numHealthPotions: number = 3;
const healthPotionsHealAmount: number = 30;
const healthPotionDropChances: number = 50;

let running: boolean = true;

console.log(`${chalk.yellowBright(`${chalk.bgRgb(5, 2, 6)()} let the game begin  :)}`)}`)

Game:
while (running) {
  console.log(`  




    `);

  let enemyHealth = getRandomNum(25, maxEnemyHealth);
  // console.log('enemyHealth', enemyHealth);
  let enemy: string = enemies[getRandomNum(0, enemies.length)]
  console.log(`\t#  ${enemy} has  appeared! #\n`);
  while (enemyHealth > 0) {
    console.log(`\t Your HP:  ${health}`)
    console.log(`\n\t ${enemy} s HP:  ${enemyHealth}`)
    console.log('\n\t HEY CJ,What would you like to do?\n')
    const answer: {
      option: string
    } = await inquirer.prompt([
      {
        type: "list",
        name: "option",
        choices: ['attack', 'refill health', 'skip mission']
      }
    ])

    const { option } = answer;
    if (option == 'attack') {
      let damageDealt = getRandomNum(0, attackDamage)
      let damageTaken = getRandomNum(0, enemyAttackDamage)
      enemyHealth -= damageDealt
      health -= damageTaken
      console.log(`\n\t You attacked the   ${enemy}  for  ${damageDealt}  damage.`);
      console.log(`\n\t You receive the  ${damageTaken}  in retailation`);
      if (health < 1) {
        console.log('\n\t You have damaged so much and too weak to go on!');
        break;
      }
    }
    else if (option == 'refill health') {
      if (numHealthPotions > 0) {
        health += healthPotionsHealAmount;
        numHealthPotions--;
        console.log('\n\t You taked a health kit, healing yourself for ', healthPotionsHealAmount);
        console.log(`\n\t You now have  ${health} HP`);
        console.log(`\n\t And You now have  ${numHealthPotions} health kit left`);
      }
      else {
        console.log('\n\t You have no health kit left!');

      }

    }
    else if (option == 'skip mission') {
      console.log(`\n\t You run away from the  ${enemy} !`);
      continue Game;

    }
  }
  if (health < 1) {
    console.log('\n\t Your Health is too low for this mission ');
    break;
  }

  console.log('--------------------------------------------------');
  console.log(`# ${enemy}  was defeated #`)
  count++;
  console.log(`#  You have  ${health} HP left #`)
  console.log(`you defeated ${count} enemies`)
  // console.log('Thanks for playing!')
  if (getRandomNum(0, 100) < healthPotionDropChances) {
    numHealthPotions++;
    console.log(`# The  ${enemy} dropped a health kit #`)
    console.log(`# You now have  ${numHealthPotions} health kits left #`)

  }
  console.log('--------------------------------------------------');
  console.log(`CJ , What now ?\n`)
  const answers: {
    option: string
  } = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      choices: ['Continue Fighting', 'Exit the Game']
    }
  ])

  const { option } = answers;
  if (option == 'Continue Fighting') {
    console.log('\nYou continue the game...')

  }
  else if (option == 'Exit the Game') {
    console.log('You Exit the game successfully!')
    break;

  }

}
console.log('\n\n--------------------------------------------------');
console.log('Thanks for playing My game  !')
console.log('--------------------------------------------------');