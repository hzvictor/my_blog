

var everyDay = new Vue({
    el: "#every_day",
    data: {
        content: "fhdsjhfjsadfhkjdshfkadsfljds"
    },
    computed: {
        getContent: function () {
            return this.content            
        }
    },
    created() {
        axios({
            method: "get",
            url: "/queryEveryDay"

        }).then(res => {
            
            this.content = res.data.data[0].content
        }).catch(res => {
            console.log(res)
        })
    },

})
var article_list = new Vue({
    el: "#article_list",
    data: {
        page:1,
        pageSize: 5,
        count:100,
        pageNumList:[],
        article_list: []
    },
    computed: {
        jumpTo:function(){
            return function (page) {
                this.getPage(page, this.pageSize)
            }
        },
        getPage:function(){
            return function (page, pageSize) {
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&"): ""        
                var tag = ""
                for (let i = 0; i < searchUrlParams.length; i++) {
                if(searchUrlParams[i].split("=")[0] == "tag"){
                    try {
                        tag = searchUrlParams[i].split("=")[1]
                    }catch {
                        console.log(e)
                    }
                }   
                }   
                if(tag == ""){
                    axios({
                        method:"get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                    }).then(function(res){
                        
                        var result = res.data.data;
                        var list = []
                        
                        for (var i = 0;i < result.length;  i ++){
                            var temp = {}
                            temp.title = result[i].title
                            temp.content = result[i].content
                            temp.date = result[i].date
                            temp.views = result[i].views
                            temp.tags = result[i].tags
                            temp.id = result[i].id
                            temp.link = "/blog_detail.html?bid=" + result[i].id
                            
                            list.push(temp)
                        }
    
                        article_list.article_list = list
                        article_list.page = page
                        
                    }).catch(function(res){
                        console.log("请求错误")
                    })

                }else{
                    axios({
                        method:"get",
                        url: "/queryBytags?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag
                    }).then(function(res){
                        
                        var result = res.data.data;
                        var list = []
                        
                        for (var i = 0;i < result.length;  i ++){
                            var temp = {}
                            temp.title = result[i].title
                            temp.content = result[i].content
                            temp.date = result[i].date
                            temp.views = result[i].views
                            temp.tags = result[i].tags
                            temp.id = result[i].id
                            temp.link = "/blog_detail.html?bid=" + result[i].id
                            
                            list.push(temp)
                        }
    
                        article_list.article_list = list
                        article_list.page = page
                        
                    }).catch(function(res){
                        console.log("请求错误")
                    })
                    
                    
                }
  

                axios({
                    method:"get",
                    url:"/queryBlogCount"
                }).then(function(res){
                    article_list.count = res.data.data[0].count
                    article_list.generatePageTool
                })
                
                axios({
                    method:"get",
                    url:"/queryBytagsCount?tag=" + tag
                }).then(function(res){
                    article_list.count = res.data.data[0].count
                    article_list.generatePageTool
                })
                
                
                
            }

        },
        article: function () {
            return this.article_list           
        },
        generatePageTool: function(){
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<", page: nowPage - 2})
            if(nowPage > 2){
                result.push({text:nowPage-2, page:nowPage -2})
            }
            if(nowPage > 1){
                result.push({text:nowPage-2, page: nowPage-1})
            }
            result.push({text:nowPage, page:nowPage})
            if(nowPage + 1 <= (totalCount + pageSize - 1)/pageSize){
                result.push({text:nowPage + 1, page: nowPage + 1})
            }
            if(nowPage + 2 <= (totalCount +  pageSize - 1)/pageSize){
                result.push({text:nowPage + 2, page: nowPage + 2})
            }
            result.push({text:">>", page: parseInt((totalCount +  pageSize - 1)/pageSize)})
            this.pageNumList = result
            return result
        }
    },
    created() {
        this.getPage(this.page, this.pageSize)
    },
    

})