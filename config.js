var fs = require("fs")

var globleConfig = {}

var conf = fs.readFileSync("./sever.conf")

var configArr = conf.toString().split("\n")

for (var i = 0; i < configArr.length; i ++){
    globleConfig[configArr[i].split('=')[0].trim()] = configArr[i].split("=")[1].trim()
}

module.exports = globleConfig
console.log(globleConfig)
