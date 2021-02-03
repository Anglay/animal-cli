#!/usr/bin/env node

// 命令行交互使用`inquirer`模块，这里要单独安装一下这个模块
const inquirer = require('inquirer')
// console.log出一个漂亮的大logo
const figlet = require('figlet');

const chalk = require('chalk')

const ora = require('ora')

const download = require('download-git-repo')

console.log(figlet.textSync('Animal !', {
    font: 'Standard'
}));

// 命令行询问，prompt() 方法返回一个Promise供使用用户输入值
// console.log(process.argv.slice(2))
inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: '请输入项目名称',
        validate(val) {
            if (val === '') {
                return '项目名称不能为空!'
            } else {
                return true
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: '请输入项目描述'
    },
    {
        type: 'list',
        name: 'type',
        message: '请选择项目模板',
        choices: ["Dva + Electron", "Umi + Electron", "Ice + Electron"],
    },
    {
        type: 'list',
        name: 'style',
        message: '请选择预编译类型',
        choices: ["less", "stylus", "sass/scss"],
    }
]).then(answers => {
    console.log(answers)
    const spinner = ora("Downloading...");
    spinner.start();
    download('direct:https://github.com/Anglay/animal-cli', 'test', { clone: true }, function (err) {
        if (err) {
            spinner.fail();
            console.log(err)
        } else {
            spinner.succeed();
        }
    })
})