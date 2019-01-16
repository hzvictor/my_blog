var BlogDao = require("../dao/BlogDao") 
var tagDao = require("../dao/TagDao") 
var tagBlogMapping = require("../dao/tagBlogMapping") 
var timeUtil = require("../util/TimeUtil")
var respUtil = require("../util/ResUtil")
var url = require("url")

var path = new Map()

function queryAllBlog(resquest, response){
    BlogDao.queryAllBlog(function(res){
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功", res))
        response.end()  

    })
}
function queryHotBlog(resquest, response){

    BlogDao.queryHotBlog(5,function(res){
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功", res))
        response.end()  

    })
}

function queryBlogById(resquest, response){
    var params = url.parse(resquest.url, true).query
    BlogDao.queryBlogById(parseInt(params.bid), function(res){
            response.writeHead(200)
            response.write(respUtil.writeResult("success","查询成功", res))
            response.end()  
            BlogDao.addViews(parseInt(params.bid),res=>{})

    })

}

path.set("/queryBlogById",queryBlogById)
path.set("/queryHotBlog",queryHotBlog)

function queryBlogCount(request, response){
    BlogDao.queryBlogCount(function(res){
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功", res))
        response.end()
    })
}
path.set("/queryBlogCount",queryBlogCount)

function queryBlogByPage(request, response){
    var params = url.parse(request.url, true).query
    BlogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function(res){
            for(var i = 0; i < res.length; i ++){
                res[i].content = res[i].content.replace(/<img[\w\W]*>/g, "")
                res[i].content = res[i].content.replace(/<[\w\W]{1,30}>/g, "")
                res[i].content = res[i].content.substring(0, 600)
            }
            response.writeHead(200)
            response.write(respUtil.writeResult("success","查询成功", res))
            response.end()
    })
}

path.set("/queryBlogByPage", queryBlogByPage )


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
path.set("/queryAllBlog", queryAllBlog)

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