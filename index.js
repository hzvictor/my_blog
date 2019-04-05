var express = require("express") 
var gloleConfig = require("./config")
var loader = require("./loader")



var app = new express()

app.use(express.static('./pages/'))

app.post("/editEveryDay",loader.get("/editEveryDay"))
app.get("/queryEveryDay",loader.get("/queryEveryDay"))

app.post("/editBlog",loader.get("/editBlog"))
app.get("/queryBlogByPage",loader.get("/queryBlogByPage"))

app.get("/queryBlogCount",loader.get("/queryBlogCount"))
app.get("/queryBlogById",loader.get("/queryBlogById"))

app.get("/addComment",loader.get("/addComment"))


app.get("/queryRandomCode",loader.get("/queryRandomCode"))
app.get("/queryCommentsByBlogId",loader.get("/queryCommentsByBlogId"))
app.get("/queryCommentsCountByBlogId",loader.get("/queryCommentsCountByBlogId"))

app.get("/queryAllBlog",loader.get("/queryAllBlog"))
app.get("/queryRandomTag",loader.get("/queryRandomTag"))
app.get("/queryHotBlog",loader.get("/queryHotBlog"))
app.get("/queryHotBlog",loader.get("/queryHotBlog"))
app.get("/queryNewComment",loader.get("/queryNewComment"))


app.get("/queryByTags",loader.get("/queryByTags"))
app.get("/queryBytagsCount",loader.get("/queryBytagsCount"))

app.listen(gloleConfig.port, function(){
    console.log("服务启动")
    
})