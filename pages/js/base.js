var randomTags = new Vue({
    el: "#random_tag",
    data: {
        tags:[]
    },
    computed: {
        randomColor:function() {
            return function () {
                var red = Math.random() * 255
                var green = Math.random() * 255
                var blue = Math.random() * 255
                return "rgb("+red+" , "+green+" , "+blue+") "
            }
        },
        randomSize: function () {
            return function (){
                var size = (Math.random() * 20 + 12) + 'px'
                return size
            }         
        }
    },
    created() {
        axios({
            method:"get",
            url:"/queryRandomTag"
        }).then(res => {
            
            var result = []
            for (let index = 0; index < res.data.data.length; index++) {
                result.push({text:res.data.data[index].tag, link:"/?tag="+res.data.data[index].tag})
                
            }
            randomTags.tags = result
        })
    },
})

var newHost = new Vue({
    el: "#new_host",
    data: {
        hostArticle: [
            {
                title: "这是测试热门文章",
                link: "http://www.baidu.com"
            },
            
            {
                title: "这是测试热门文章",
                link: "http://www.baidu.com"
            },
            
            {
                title: "这是测试热门文章",
                link: "http://www.baidu.com"
            },
            
            {
                title: "这是测试热门文章",
                link: "http://www.baidu.com"
            },
            
            {
                title: "这是测试热门文章",
                link: "http://www.baidu.com"
            },
            
            {
                title: "这是测试热门文章",
                link: "http://www.baidu.com"
            },
            
    
    
        ]
    },
    computed: {
        host: function () {
            return this.hostArticle            
        }
    },
    created(){
        axios({
            method:"get",
            url:"/queryHotBlog"
        }).then(res =>{
            
            var result = []
            for (let index = 0; index < res.data.data.length; index++) {
                var temp = {}
                temp.title = res.data.data[index].title
                temp.link = "/blog_detail.html?bid=" + res.data.data[index].id
                result.push(temp)
            }

            newHost.hostArticle = result
        })
    }

})

var newComments = new Vue({
    el: "#new_comments",
    data: {
        new_comments:  [
            {name:"这里是用户名", data:"2018-10-10", comments: "侯震真帅，真帅啊，好帅啊"},
            {name:"这里是用户名", data:"2018-10-10", comments: "侯震真帅，真帅啊，好帅啊"},
            {name:"这里是用户名", data:"2018-10-10", comments: "侯震真帅，真帅啊，好帅啊"},
            {name:"这里是用户名", data:"2018-10-10", comments: "侯震真帅，真帅啊，好帅啊"},
            {name:"这里是用户名", data:"2018-10-10", comments: "侯震真帅，真帅啊，好帅啊"},
            {name:"这里是用户名", data:"2018-10-10", comments: "侯震真帅，真帅啊，好帅啊"},
            {name:"这里是用户名", data:"2018-10-10", comments: "侯震真帅，真帅啊，好帅啊"}
        ]
    },
    computed: {
        newComments: function () {
            return this.new_comments            
        }
    },
    created(){
        axios({
            method:"get",
            url:"/queryNewComment"
        }).then(res =>{
            console
            var result = []
            for (let index = 0; index < res.data.data.length; index++) {
                var temp = {}
                temp.name = res.data.data[index].user_name
                temp.data = res.data.data[index].ctime
                temp.comments = res.data.data[index].comments
                result.push(temp)
            }

            newComments.new_comments = result
        })
    }

})