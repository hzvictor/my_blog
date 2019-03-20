var fs = require("fs")
var globleConf = require("./config")

var controllerSet = []
var pathMap = new Map()

var files = fs.readdirSync(globleConf["web_path"])


for (var i = 0; i < files.length; i ++ ){
    var temp = require("./" + globleConf["web_path"] + "/" + files[i])
    if(temp.paths){
        for(var [key, value] of temp.paths){
            if(pathMap.get(key) == null){
                pathMap.set(key, value)
            }else{
                throw new Error("url path异常, url:" + key)
            }
        }

        controllerSet.push(temp)
    }
}

module.exports = pathMap