var BlogDao = require("../dao/BlogDao") 
var tagDao = require("../dao/TagDao") 
var tagBlogMapping = require("../dao/tagBlogMapping") 
var timeUtil = require("../util/TimeUtil")
var respUtil = require("../util/ResUtil")
var url = require("url")

var path = new Map()


function editBlog(request, response){
    var params = url.parse(request.url, true).query
    var tags = params.tags.replace(/ /g, "").replace("，",",")
    request.on("data", function (data){
        BlogDao.insertBlog(params.title, data.toString(), tags, 0, timeUtil.setNow(), timeUtil.setNow(),function(result){
            response.writeHead(200)
            response.write(respUtil.writeResult("success","添加成功", null))
            response.end()

            var blogId = result.insertId
            var tagList = tags.split(",")


            for (var i = 0; i < tagList.length; i ++){
                if (tagList[i] == ""){
                    continue
                }
                queryTag(tagList[i], blogId)
            }

        })
    })
}

path.set("/editBlog", editBlog)

function queryTag(tag, blogId){
    tagDao.queryTag(tag, function (result) {
        if (result == null || result.length == 0){
            insertTag(tag, blogId)
        }else{
            insertTagBlogMapping(result[0].id, blogId)
        }
        
    })

}

function insertTag(tag, blogId){
    tagDao.insertTag(tag, timeUtil.setNow(), timeUtil.setNow(), function(result){
        insertTagBlogMapping(result.insertId, blogId)

    })
}

function insertTagBlogMapping(tagId, blogId){
    tagBlogMapping.insertTagBlogMapping(tagId, blogId, timeUtil.setNow(), timeUtil.setNow(),function(){})
}

module.exports.path = path