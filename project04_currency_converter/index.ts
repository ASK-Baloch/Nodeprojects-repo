#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep=()=>{
    return new Promise((resolve, reject) => {
      setTimeout(resolve,1500);
    })
  }
  
   async function welcome() {
    const title=chalkAnimation.rainbow(`Let the Converting Begin
                                                                                   _             
                                                                                  (_)            
____ _   _  ____ ____ _____ ____   ____ _   _     ____ ___ _   _ _____  ____ ___ _  ___  ____  
/ ___) | | |/ ___) ___) ___ |  _ \ / ___) | | |   / ___) _ \ | | | ___ |/ ___)___) |/ _ \|  _ \ 
( (___| |_| | |  | |   | ____| | | ( (___| |_| |  ( (__| |_| \ V /| ____| |  |___ | | |_| | | | |
\____)____/|_|  |_|   |_____)_| |_|\____)\__  |   \____)___/ \_/ |_____)_|  (___/|_|\___/|_| |_|
(____/                                                                                            `);
 
    await sleep();
    title.stop();
  }
 
 await welcome();

interface ConversionTable {
  [key: string]: {
    [key: string]: number;
};
}
async function currencyCoversion() {

const conversionTable: ConversionTable = {
  USD: {
    EUR: 0.82,
    GBP: 0.71,
    JPY: 105.67,
    AUD: 1.29,
    PKR: 261.06,
    INR: 82.75,
  },
  EUR: {
    USD: 1.22,
    GBP: 0.86,
    JPY: 128.19,
    AUD: 1.56,
    PKR: 276.68,
    INR: 87.71,
  },
  GBP: {
    USD: 1.41,
    EUR: 1.16,
    JPY: 148.76,
    AUD: 1.81,
    PKR: 313.88,
    INR: 99.45,
  },
  JPY: {
    USD: 0.0095,
    EUR: 0.0078,
    GBP: 0.0067,
    AUD: 0.012,
    PKR: 1.94,
    INR: 0.61,
  },
  AUD: {
    USD: 0.77,
    EUR: 0.64,
    GBP: 0.55,
    JPY: 83.63,
    PKR: 177.81,
    INR: 56.32,
  },
  PKR:{
    USD: 0.0038,
    EUR: 0.0036,
    GBP: 0.0031,
    JPY: 0.52,
    AUD: 0.0056,
    INR: 0.32,
  },
  INR: {
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.010,
    JPY: 1.63,
    AUD: 0.018,
    PKR: 3.16 ,
},
};
    

 inquirer.prompt([
  {
    type: 'input',
    name: 'amount',
    message: 'Enter the amount of money you want to convert:',
    validate: (value: string) => {
      const valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: (value: string) => parseFloat(value),
  },
  {
    type: 'list',
    name: 'fromCurrency',
    message: 'Select the currency you want to convert from:',
    choices: Object.keys(conversionTable),
  },
  {
    type: 'list',
    name: 'toCurrency',
    message: 'Select the currency you want to convert to:',
    choices: Object.keys(conversionTable),
  },
]).then(answers => {
  const { amount, fromCurrency, toCurrency } = answers;
  const rate = conversionTable[fromCurrency][toCurrency];
  const convertedAmount = amount * rate;
  console.log(`${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}`);
});


}



        await currencyCoversion();
 

