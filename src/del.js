const chalk = require("chalk");
const ora = require('ora')
const inquirer = require('inquirer')
const { resolveTemplateData, saveTemplateData } = require('./utils');

const del = () => {
    let arr = resolveTemplateData()
    if (arr.length > 0) {
        const nameArr = arr.map(item => item.templatName)
        inquirer.prompt([
            {
                type: 'list',
                name: 'templatName',
                message: '请选择需要删除的模板',
                choices: nameArr,
            }
        ]).then(obj => {
            const delSpinner = ora("正在删除模板，请稍候...\n");
            delSpinner.start();
            arr = arr.filter(item => item.templatName !== obj.templatName)
            saveTemplateData(arr, function(err){
                if(err) {
                    delSpinner.color = "red";
                    delSpinner.fail(err.message);
                } else {
                    delSpinner.color = "green";
                    delSpinner.succeed('模板删除成功！\n');
                    const templateArr = resolveTemplateData()
                    if (templateArr.length > 0) {
                        console.log(`${chalk.yellow("* ")}${chalk.yellow('支持以下模板创建项目')}\n`);
                        templateArr.forEach(elem => {
                            console.log(`${chalk.green("✔ ")}${chalk.green(`${elem.templatName}`)}`);
                        });
                    } else {
                        console.log(`${chalk.yellow("* ")}${chalk.yellow('暂无模板，请通过anim add添加模板管理')}\n`);
                    }
                }
            })
        })
    } else {
        console.log(`${chalk.yellow("* ")}${chalk.yellow('暂无模板，无法执行模板删除')}\n`);
    }
}

module.exports = del;