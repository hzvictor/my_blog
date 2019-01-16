

var blogDetail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        content: "",
        ctime: "",
        tags: "",
        views: "",

    },
    computes:{
        
    },
    created: function(){
       var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&"): ""
       var bid = -1
       for (let i = 0; i < searchUrlParams.length; i++) {
        if(searchUrlParams[i].split("=")[0] == "bid"){
            try {
                bid = parseInt(searchUrlParams[i].split("=")[1])
            }catch {
                console.log(e)
            }
        }   
       }
       axios({
           method:"get",
           url:"/queryBlogById?bid=" + bid
       }).then(function(res){
           var res = res.data.data[0]
           blogDetail.title = res.title
           blogDetail.content = res.content
           blogDetail.ctime = res.ctime
           blogDetail.tags = res.tags
           blogDetail.views = res.views
       }).catch(function(res){
            console.log(res)
       })

    }
})

var sendComment = new Vue({
    el:"#send_comment",
    data:{
        vCode:"",
        rightCode:""
    },
    computed:{
        changeCode:function(){
            return function () {
                axios({
                    method:"get",
                    url:"/queryRandomCode"
                }).then(function(res){
                
                    
                    sendComment.vCode = res.data.data.data
                    sendComment.rightCode = res.data.data.text

                })
            }
        },
        sendComment:function(){
            return function () {
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&"): ""        
                var bid = -10
                for (let i = 0; i < searchUrlParams.length; i++) {
                if(searchUrlParams[i].split("=")[0] == "bid"){
                    try {
                        bid = parseInt(searchUrlParams[i].split("=")[1])
                    }catch {
                        console.log(e)
                    }
                }   
                }   
                  var replay = document.getElementById("comment_reply").value
                  var name = document.getElementById("comment_name").value
                  var email = document.getElementById("comment_email").value
                  var content = document.getElementById("comment_content").value
                  var code = document.getElementById("comment_code").value
                  if(sendComment.rightCode != code){
                      alert("验证码有误")
                      
                  }else{
                      alert("评论成功")
                      axios({
                        method:"get",
                        url:"/addComment?bid=" + bid + "&parent=" + replay + "&userName=" + name + "&email=" + email + "&content=" + content
  
                    }).then(function(res){
                        console.log(res)
                    }).catch(function(e){
                        console.log(e)
                    })
                  }
                  
                    }
                }
                },
    created(){
       this.changeCode()
    }  
})

var comments = new Vue({
    el:"#blog_comment",
    data:{
        total: 100,
        comments: []
    },
    computed:{
        reply: function(){
            return function (commentId, userName) {
                document.getElementById("comment_reply").value = commentId
                document.getElementById("comment_name").value = userName
                
            }
        }

    },
    created(){
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&"): ""        
                var bid = -10
                for (let i = 0; i < searchUrlParams.length; i++) {
                if(searchUrlParams[i].split("=")[0] == "bid"){
                    try {
                        bid = parseInt(searchUrlParams[i].split("=")[1])
                    }catch {
                        console.log(e)
                    }
                }   
                }   
        axios({
            method:"get",
            url:"/queryCommentsByBlogId?bid=" + bid
        }).then(function(res){
            comments.comments = res.data.data
            for (var i = 0; i < comments.comments.length; i ++){
                if(comments.comments[i].parent > -1){
                    comments.comments[i].options = "回复@" + comments.comments[i].parent_name
                }
            }
        })

        axios({
            method:"get",
            url:"/queryCommentsCountByBlogId?bid=" + bid
        }).then(function(res){
            
            comments.total = res.data.data[0].count
        })

    }

})