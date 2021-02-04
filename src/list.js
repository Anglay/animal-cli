const chalk = require("chalk");
const { resolveTemplateData } = require('./utils');

const list = () => {
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

module.exports = list;