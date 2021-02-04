const chalk = require("chalk");
const ora = require('ora')
const inquirer = require('inquirer')
const { resolveTemplateData, saveTemplateData } = require('./utils');

const add = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'templatName',
            message: '请输入模板名称',
            validate(val) {
                if (val === '') {
                    return '模板名称不能为空!'
                } else {
                    return true
                }
            }
        },
        {
            type: 'input',
            name: 'templatUrl',
            message: '请输入模板地址',
            validate(val) {
                if (val === '') {
                    return '模板地址不能为空!'
                } else {
                    return true
                }
            }
        }
    ]).then(data => {
        // const data = {'templatName':'Umi+Electron','templatUrl': 'http:www.baidu.com'}
        const arr = resolveTemplateData()
        const _arr = arr.filter(item => item.templatName === data.templatName)
        if (_arr.length > 0) {
            console.log(`${chalk.red("--> ")}${chalk.red(`${_arr[0].templatName} 模板名已存在，请重新命名`)}`);
        } else {
            const addSpinner = ora("正在添加模板，请稍候...\n");
            addSpinner.start();
            arr.push(data)
            saveTemplateData(arr, function(err){
                if(err) {
                    addSpinner.color = "red";
                    addSpinner.fail(err.message);
                } else {
                    addSpinner.color = "green";
                    addSpinner.succeed('模板添加成功！\n');
                    const templateArr = resolveTemplateData()
                    console.log(`${chalk.yellow("* ")}${chalk.yellow('支持以下模板创建项目')}\n`);
                    templateArr.forEach(elem => {
                        console.log(`${chalk.green("✔ ")}${chalk.green(`${elem.templatName}`)}`);
                    });
                }
            })
        }
    })
}

module.exports = add;