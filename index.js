var express = require("express") 
var gloleConfig = require("./config")
var loader = require("./loader")



var app = new express()

app.use(express.static('./pages/'))

app.post("/editEveryDay",loader.get("/editEveryDay"))
app.get("/queryEveryDay",loader.get("/queryEveryDay"))

app.post("/editBlog",loader.get("/editBlog"))

app.listen(gloleConfig.port, function(){
    console.log("服务启动")
    
})