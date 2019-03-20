var express = require("express") 
var gloleConfig = require("./config")
var loader = require("./loader")



var app = new express()

app.use(express.static('./pages/'))



app.get("/color",loader.get("/color"))
app.get("/updata",loader.get("/updata"))




app.listen(gloleConfig.port, function(){
    console.log("服务启动")
    
})