var randomTags = new Vue({
    el: "#random_tag",
    data: {
        tags:['dfd', 'dfdsf', 'grgrgr', 'ffrr','dfd', 'dfdsf', 'grgrgr', 'ffrr','dfd', 'dfdsf', 'grgrgr', 'ffrr']
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

})