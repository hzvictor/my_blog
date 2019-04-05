var BlogDao = require("../dao/BlogDao") 
var tagDao = require("../dao/TagDao") 
var tagBlogMapping = require("../dao/tagBlogMapping") 
var timeUtil = require("../util/TimeUtil")
var respUtil = require("../util/ResUtil")
var url = require("url")

function queryRandomTag(resquest, response){
    tagDao.queryALLTag(res => {
        ress = res.sort(function(){
            return Math.random() > 0.5 ? true :false
        })
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功", ress))
        response.end() 
    })
}

function queryBytagsCount(request, response){
    var params = url.parse(request.url, true).query
    tagDao.queryTag(params.tag, function (res) {
        tagBlogMapping.queryBytagsCount(res[0].id, function(res){
        response.writeHead(200)
        response.write(respUtil.writeResult("success","查询成功", res))
        response.end() 
        })
    })
}

function queryByTags(request, response){
    var params = url.parse(request.url, true).query
    tagDao.queryTag(params.tag, function (res) {
        if(res == null || res.length == 0){
            response.writeHead(200)
            response.write(respUtil.writeResult("success","查询成功", res))
            response.end()
        }else{
            tagBlogMapping.queryByTags(res[0].id,parseInt(params.page),parseInt(params.pageSize), function (res) {
                var blogList = []
                for (let index = 0; index < res.length; index++) {
                    BlogDao.queryBlogById(res[index].blog_id,function(res){
                        blogList.push(res[0])
                    })
                    
                }
                getResult(blogList,res.length, response)
            })
        }
        
    })
}

function getResult(blogList, len, response){
    if(blogList.length < len){
        setTimeout(function(){
            getResult(blogList, len, response)
        },10)
    }else{
        for(var i = 0; i < blogList.length; i ++){
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*>/g, "")
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,30}>/g, "")
            blogList[i].content = blogList[i].content.substring(0, 600)
        }
            response.writeHead(200)
            response.write(respUtil.writeResult("success","查询成功", blogList))
            response.end()
    }
}

var path = new Map()

path.set("/queryRandomTag", queryRandomTag)
path.set("/queryByTags", queryByTags)
path.set("/queryBytagsCount", queryBytagsCount)

module.exports.path = path