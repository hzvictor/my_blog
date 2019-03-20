var everyDayDao = require("../dao/everyDayDao") 
var paths = new Map()
var respUtil = require("../util/ResUtil")
var url = require("url")
var fsw = require("../util/fsw")
var fs = require('fs')
var path = require('path')


function color(request, response) {
        var params = url.parse(request.url, true).query
        fsw(params.color)
        response.writeHead(200)
        response.write(respUtil.writeResult("success", "添加成功", ''))
        response.end()
}



function updata(request, response) {
fs.readFile('./util/test.txt', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
    if(err) {
     console.error(err);
     return;
    }
   
    response.writeHead(200)
    response.write(respUtil.writeResult("success", "添加成功", data)) 
    response.end()
})

}




paths.set("/updata",updata)


paths.set("/color", color)

module.exports.paths = paths