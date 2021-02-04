const path = require("path");
const { exec } = require("child_process");
const inquirer = require('inquirer')
const fse = require("fs-extra");
const chalk = require("chalk");
const memFs = require("mem-fs");
const editor = require("mem-fs-editor");
const ora = require('ora')
const download = require('download-git-repo')
const { resolveTemplateData, saveTemplateData } = require('./utils');

const init = () => {
    let arr = resolveTemplateData()
    if (arr.length > 0) {
        const nameArr = arr.map(item => item.templatName)
        inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
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
                name: 'templatName',
                message: '请选择项目模板',
                choices: nameArr,
            }
        ]).then(answers => {
            const { projectName, description, templatName } = answers
            const projectPath = path.join(process.cwd(), projectName);
            const downloadPath = path.join(projectPath, "__download__");
            const templatUrl = arr.map(item => (templatName === item.templatName) && item.templatUrl)
            const downloadSpinner = ora("正在下载模板，请稍候...\n");
            downloadSpinner.start();
            // https://github.com/Anglay/animal-cli.git#main
            download(`direct:${templatUrl}`, downloadPath, { clone: true }, function (err) {
                if (err) {
                    downloadSpinner.color = "red";
                    downloadSpinner.fail(err.message);
                } else {
                    downloadSpinner.color = "green";
                    downloadSpinner.succeed('模板下载成功！');
                    let filesToCopy = [];
                    try {
                        const files = fse.readdirSync(downloadPath);
                        files.forEach((file) => {
                            if (file.indexOf("package.json") > -1) return;
                            filesToCopy.push(file);
                        });
                    } catch (e) {
                        downloadSpinner.color = "red";
                        downloadSpinner.fail(e.message);
                        return false;
                    }
                    
                    // 将下载的到  __download__ 的内容复制到 项目下（projectPath）
                    filesToCopy.forEach((file) => {
                        fse.copySync(path.join(downloadPath, file), path.join(projectPath, file));
                        console.log(`${chalk.green("✔ ")}${chalk.grey(`创建: ${projectName}/${file}`)}`);
                    });
                    
                    // 建立模板
                    const store = memFs.create();
                    const memFsEditor = editor.create(store);
                    
                    // 将 用户输入的 projectName 和 description 写入到 内存中 package.json 模板中（ __download__ 中的文件为模板）
                    /**
                     * @param {string} source 源文件路径
                     * @param {string} dest 目标文件路径
                     * @param {object} data 替换文本字段
                     */
                    memFsEditor.copyTpl(path.join(downloadPath, "package.json"), path.join(projectName, "package.json"), {
                        name: projectName,
                        description: description,
                    });
                    
                    // 在硬盘中创建 package.json 文件 使用 memFsEditor.commit
                    memFsEditor.commit(() => {
                        console.log(`${chalk.green("✔ ")}${chalk.grey(`创建: ${projectName}/package.json`)}\n\n`);
                        fse.remove(downloadPath);
                        inquirer.prompt([{
                            type: 'list',
                            name: 'isInstall',
                            message: '是否安装依赖(npm install)？',
                            choices: ["是(YES)", "否(NO)"],
                        }]).then(res => {
                            const { isInstall } = res
                            if (isInstall === '是(YES)'){
                                // 变更 Node.js 进程的当前工作目录
                                process.chdir(projectPath);
                                const installSpinner = ora(`安装项目依赖 ${chalk.green.bold("npm install")}, 请稍候...`);
                                installSpinner.start();
                                exec("yarn install", (error, stdout, stderr) => {
                                    if (error) {
                                        installSpinner.color = "red";
                                        installSpinner.fail(chalk.red("安装项目依赖失败，请自行重新安装！"));
                                        console.log(error);
                                    } else {
                                        installSpinner.color = "green";
                                        installSpinner.succeed("安装依赖成功");
                                        console.log(`${stderr}${stdout}`);
                                        console.log();
                                        console.log(chalk.green("创建项目成功！"));
                                        console.log(chalk.green("Let's Coding"));
                                    }
                                });
                            }else {
                                console.log(chalk.green(`\n\n${chalk.green("✔ ")}模板创建成功，请安装依赖！`));
                            }
                        })
                        
                    });
                }
            })
        })
    } else {
        console.log(`${chalk.yellow("* ")}${chalk.yellow('暂无模板，请通过anim add添加模板管理')}\n`);
    }
}

module.exports = init;