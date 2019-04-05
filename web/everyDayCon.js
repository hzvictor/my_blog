var everyDayDao = require("../dao/everyDayDao") 
var path = new Map()
var timeUtil = require("../util/TimeUtil")
var respUtil = require("../util/ResUtil")

function editEveryDay(request, response) {
    
    request.on("data", function (data) {
        everyDayDao.insertEveryDay(data.toString().trim(), timeUtil.setNow(), function (result) {
            response.writeHead(200)
            response.write(respUtil.writeResult("success", "添加成功", null))
            response.end()
        }) 
    })
}

path.set("/editEveryDay", editEveryDay)


function queryEveryDay(request, response) {
    everyDayDao.queryEveryDay(function(res){
        response.writeHead(200)
        response.write(respUtil.writeResult("success", "添加成功", res))
        response.end()
    })

    
    
}

path.set("/queryEveryDay", queryEveryDay)

module.exports.path = path