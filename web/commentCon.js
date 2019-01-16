var timeUtil = require("../util/TimeUtil")
var respUtil = require("../util/ResUtil")
var url = require("url")
var commentDao = require("../dao/commentDao")
var captcha = require("svg-captcha")

var path = new Map()
function addComment(request, response){
        var params = url.parse(request.url, true).query
            commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.userName, params.email, params.content, timeUtil.setNow(), timeUtil.setNow(),function(result){
                response.writeHead(200)
                response.write(respUtil.writeResult("success","评论成功", null))
                response.end()
            })
        
    

}

function queryRandomCode(request, response) {
    var img = captcha.create({
        fontSize:50,
        width:100,
        height:34,
    })
    response.writeHead(200,)
    response.write(respUtil.writeResult("success","评论成功", img))
    response.end()
    
}

function queryCommentsByBlogId(request, response){
    var params = url.parse(request.url, true).query
    commentDao.queryCommentsByBlogId(parseInt(params.bid), function (res) {
        response.writeHead(200,)
        response.write(respUtil.writeResult("success","评论成功", res))
        response.end()
        
    })
}

function queryCommentsCountByBlogId(request, response){
    var params = url.parse(request.url, true).query
    commentDao.queryCommentsCountByBlogId(parseInt(params.bid), function (res) {
        response.writeHead(200,)
        response.write(respUtil.writeResult("success","评论成功", res))
        response.end()
        
    })
}

function queryNewComment(request, response){
    var params = url.parse(request.url, true).query
    commentDao.queryNewComment(5, function (res) {
        response.writeHead(200,)
        response.write(respUtil.writeResult("success","评论成功", res))
        response.end()
        
    })
}
    
path.set("/addComment", addComment)
path.set("/queryRandomCode", queryRandomCode)
path.set("/queryCommentsByBlogId", queryCommentsByBlogId)
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId)
path.set("/queryNewComment", queryNewComment)

module.exports.path = path