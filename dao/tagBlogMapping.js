var dbutil = require("./DButil")

function insertTagBlogMapping(tagId, blogId,ctime, utime, success) {
    var insertSql = "insert into tag_blog_mapping (`tag_id`, `blog_id`,`ctime`, `utime`) value (? ,?, ?, ?) "
    var params = [tagId, blogId, ctime, utime]


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

function queryBytagsCount(tagId,success) {
    var querySql = "select count(1) as count from tag_blog_mapping where tag_id = ? "
    var params = [tagId]


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

function queryByTags(tagId,page, pageSize,success) {
    var querySql = "select * from tag_blog_mapping where tag_id = ? limit ? ,?"
    var params = [tagId,page*pageSize, pageSize]
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


module.exports.insertTagBlogMapping = insertTagBlogMapping
module.exports.queryByTags = queryByTags
module.exports.queryBytagsCount = queryBytagsCount
