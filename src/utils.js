const fs=require("fs");
const path = require("path");

const templateUrl = path.resolve(__dirname, '..' + '/.template')

const resolveTemplateData = () => {
    const data = fs.readFileSync(templateUrl, 'utf-8');
    return JSON.parse(data)
}

const saveTemplateData = (data, callback) => {
    fs.writeFile(templateUrl, JSON.stringify(data), function (err) {
        callback(err)
    })
}

module.exports = {
    resolveTemplateData,
    saveTemplateData,
}