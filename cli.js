#!/usr/bin/env node

const figlet = require('figlet');
const chalk = require("chalk");
const init = require("./src/init");
const list = require("./src/list");
const add = require("./src/add");
const del = require("./src/del");

console.log(chalk.green(figlet.textSync('Animal !', {
    font: 'Standard'
})));

const args = process.argv.slice(2)

if (args.length > 0) {
    const [arg] = args
    switch (arg) {
        case 'init':
            init()
            break;
        case 'list':
            list()
            break;
        case 'add':
            add()
            break;
        case 'del':
            del()
            break;
        default:
            break;
    }
}

