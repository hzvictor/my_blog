var dbutil = require("./DButil")

function insertComment(blogId, parent, userName, email,comments, ctime, utime, success) {
    var insertSql = "insert into coments (`blog_id`,`parent`,`user_name`,`email`, `comments`,`ctime`, `utime`) value (?, ?, ?, ?, ?, ?, ?) "
    var params = [blogId, parent, userName, email, comments, ctime, utime]
 

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

function queryCommentsByBlogId(blogId,success) {
    var querySql = "select * from coments where blog_id = ?"
    var params = [blogId]


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


function queryCommentsCountByBlogId(blogId,success) {
    var querySql = "select count(1) as count from coments where blog_id = ?"
    var params = [blogId]


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

function queryNewComment(size,success) {
    var querySql = "select * from coments order by id desc limit  ?"
    var params = [size]


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



module.exports.insertComment = insertComment
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId
module.exports.queryCommentsByBlogId = queryCommentsByBlogId
module.exports.queryNewComment = queryNewComment
