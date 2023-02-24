#! /usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
let count = 0;
const wait = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const gameTitle = chalkAnimation.rainbow(' Let the system Begin ');
    await wait();
    gameTitle.stop();
    console.log(`
    ${chalk.magentaBright(` "HOW TO USE" `)}
      ${chalk.yellowBright(`
      ${chalk.bgRgb(5, 2, 6)('1)')} ENTER YOUR NAME :) 
      ${chalk.bgRgb(5, 2, 6)('2)')} AND THE COURSES YOU WANNA GET ENROLLED IN 
      ${chalk.bgRgb(5, 2, 6)('3)')} VIEW BALANCE AND PAY ALL THE COURSE COST TO FURTHER USE THE PROGRAM `)}`);
    console.log(`S MANAGEMENT S  `);
}
await welcome();
// Define the Student class
class Student {
    name;
    studentID;
    courses;
    balance;
    constructor(name, studentID, courses, balance) {
        this.name = name;
        this.studentID = studentID;
        this.courses = courses;
        this.balance = balance;
    }
    // Enroll a student in a course
    enroll(course, cost) {
        this.courses.push(course);
        this.balance += cost;
    }
    // View the student's balance
    viewBalance() {
        console.log(`Current balance: $${this.balance}`);
    }
    // Pay the student's tuition fees
    payTuition(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`$${amount} paid towards tuition fees. Remaining balance: $${this.balance}`);
        }
        else {
            console.log(`Insufficient balance. Current balance: $${this.balance}`);
        }
    }
    // Show the student's status
    showStatus() {
        console.log(`Name: ${this.name}`);
        console.log(`Student ID: ${this.studentID}`);
        console.log(`Courses enrolled: ${this.courses.join(", ")}`);
        console.log(`Current balance: $${this.balance}`);
    }
}
// Initialize an empty array to store the list of students
const students = [];
// Generate a random 5-digit student ID
function generateStudentID() {
    return Math.floor(Math.random() * 90000) + 10000;
}
// Define the main function
async function main() {
    // Ask the user for their name
    const { name } = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "What is your name?",
    });
    // Generate a unique student ID for the user
    const studentID = generateStudentID().toString();
    // Initialize a new student object with the user's information
    const student = new Student(name, studentID, [], 0);
    // Ask the user if they want to enroll in a course
    while (true) {
        const { enroll } = await inquirer.prompt({
            type: "confirm",
            name: "enroll",
            message: "Do you want to enroll in a course?",
        });
        if (!enroll) {
            break;
        }
        // Ask the user which course they want to enroll in and how much it costs
        const { course, cost } = await inquirer.prompt([
            {
                type: "input",
                name: "course",
                message: "Which course do you want to enroll in?",
            },
            {
                type: "number",
                name: "cost",
                message: "How much does the course cost?",
            },
        ]);
        // Enroll the user in the course
        student.enroll(course, cost);
    }
    // Add the user to the list of students
    students.push(student);
    // Display the user's status
    student.showStatus();
    // Ask the user what they want to do next
    while (true) {
        const { action } = await inquirer.prompt({
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: ["View balance", "Pay tuition fees", "Enroll in another course", "Exit"],
        });
        if (action === "View balance") {
            // View the user's balance
            student.viewBalance();
        }
        else if (action === "Pay tuition fees") {
            // Ask the user how much they want to pay towards their tuition fees
            while (true) {
                let { amount } = await inquirer.prompt({
                    type: "number",
                    name: "amount",
                    message: "How much do you want to pay towards your tuition fees?",
                });
                student.payTuition(amount);
                if (amount -= amount) {
                    break;
                }
                // If the user's balance is zero, exit the loop
                if (student.balance === 0) {
                    break;
                }
            }
            // Display the final status of the user
            student.showStatus();
        }
        else if (action === "Enroll in another course") {
            while (true) {
                const { enroll } = await inquirer.prompt({
                    type: "confirm",
                    name: "enroll",
                    message: "Do you want to enroll in a course?",
                });
                if (!enroll) {
                    break;
                }
                // Ask the user which course they want to enroll in and how much it costs
                const { course, cost } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "course",
                        message: "Which course do you want to enroll in?",
                    },
                    {
                        type: "number",
                        name: "cost",
                        message: "How much does the course cost?",
                    },
                ]);
                // Enroll the user in the course
                student.enroll(course, cost);
            }
        }
        else if (action === "Exit") {
            console.log(`GoodBye :)`);
            process.exit();
        }
    }
}
async function startAgain() {
    do {
        await main();
        var doAgain = await inquirer
            .prompt({
            type: "input",
            name: "restart",
            message: "Do you want to restart your APP ? press y to Continue or n to End "
        });
    } while ((doAgain.restart.toLowerCase() == "y" || doAgain.restart.toLowerCase() == "yes"));
}
startAgain();
