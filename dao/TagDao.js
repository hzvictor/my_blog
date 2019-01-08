var dbutil = require("./DButil")

function insertTag(tag, ctime, utime, success) {
    var insertSql = "insert into tags (`tag`, `ctime`, `utime`) value (? ,?, ?) "
    var params = [tag, ctime, utime]


    var connection = dbutil.creatConnection()
    connection.query(insertSql, params, function (error, result) {
        if(error == null){
            success(result)

        }else{
            console.log(error)
        }
        
    })

    connection.end()
}

function queryTag(tag,success) {
    var querySql = "select * from tags where tag = ?"
    var params = [tag]


    var connection = dbutil.creatConnection()
    connection.query(querySql, params, function (error, result) {
        if(error == null){
            success(result)

        }else{
            console.log(error)
        }
        
    })

    connection.end()
}

module.exports.insertTag = insertTag
module.exports.queryTag = queryTag