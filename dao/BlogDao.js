var dbutil = require("./DButil")

function insertBlog(title, content, tags, views, ctime, utime, success) {
    var insertSql = "insert into blog (`title`,`content`,`tags`,`views`, `ctime`, `utime`) value (?, ?, ?, ?, ?, ?) "
    var params = [title, content, tags, views, ctime, utime]


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

module.exports.insertBlog = insertBlog