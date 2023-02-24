#! /usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
const wait = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const gameTitle = chalkAnimation.neon('Let the count begin');
    await wait();
    gameTitle.stop();
    console.log(`${chalk.yellowBright(``)}`);
}
await welcome();
async function wordCounting() {
    const questions = [
        {
            name: 'paragraph',
            message: 'Enter a paragraph:',
            type: "editor",
            validate: function (text) {
                if (!text) {
                    return 'Please enter a paragraph.';
                }
                return true;
            },
        }
    ];
    inquirer.prompt(questions).then((answers) => {
        const { paragraph } = answers;
        // Count characters
        const charCount = paragraph.replace(/\s/g, '').length;
        // Count words
        const wordCount = paragraph.trim().split(/\s+/).length;
        // Count whitespace characters
        const whitespaceCount = (paragraph.match(/\s/g) || []).length;
        console.log(`Character count (excluding whitespaces): ${charCount}`);
        console.log(`whitespaces: ${whitespaceCount}`);
        console.log(`Word count: ${wordCount}`);
    });
}
await wordCounting();
