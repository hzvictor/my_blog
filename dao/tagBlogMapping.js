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



module.exports.insertTagBlogMapping = insertTagBlogMapping
