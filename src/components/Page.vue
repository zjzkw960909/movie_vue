<template lang="pug">
.page
    ul
        li(v-if="page !== 1", @click="prev") 上一页 
        li(:class="{ 'clickColor': page === 1 }", @click="click") 1
        strong(v-if="front") ...
        li(:class="{ 'clickColor': page === v }", v-for="v in items()", @click="click") {{ v }}
        strong(v-if="back") ...
        li(v-if="allPages !== 1", :class="{ 'clickColor': page === allPages}", @click="click") {{ allPages }}
        li(v-if="page !== allPages", @click="next") 下一页
    .jump
        span 共{{ allPages }}页,跳到
        input.form-control(@keyup.enter="enter")
        | 页
</template>
<script>
export default {
    props: ['allPages', 'page'],
    data () {
        return {
            limit: 4,
            front: false,
            back: false,
            dataPages: '',
            dataPage: ''
        }
    },
    computed: {
        items () {
            return () => {
                let page = this.page - 0
                let pages = this.allPages - 0
                let limit = this.limit - 0
                let temp = []
                if (limit + 2 >= pages) {
                    this.front = false
                    this.back = false
                    for (let i = 2; pages - 2 > 0; pages--, i++) {
                        temp.push(i)
                    }
                } else {
                    if (page + limit / 2 >= pages) {
                        this.front = true
                        this.back = false
                        for (let i = 0; i < limit; i++, pages--) {
                            temp.unshift(pages - 1)
                        }
                    } else if (page - limit / 2 <= 2) {
                        this.front = false
                        this.back = true
                        for (let i = 0, j = 2; i < limit; i++, j++) {
                            temp.push(j)
                        }
                    } else {
                        this.front = true
                        this.back = true
                        for (let i = 0; i < limit; i++, page++) {
                            temp.push(page - 2)
                        }
                    }
                }
                return temp
            }
        }
    },
    methods: {
        prev () {
            this.dataPage = this.dataPage - 1
        },
        next () {
            this.dataPage = this.dataPage + 1
        },
        click (e) {
            this.dataPage = e.target.textContent - 0
        },
        enter (e) {
            var dataPage = e.target.value - 0
            if (dataPage > 0 && dataPage <= this.dataPages) {
                this.dataPage = dataPage
            }
        }
    },
    watch: {
        page: function () {
            this.dataPage = this.page
        },
        allPages: function () {
            this.dataPages = this.allPages
        },
        dataPage: function (page) {
            this.$emit('changePage', page + '')
        }
    }
}
</script>
<style>
.page{
    position: fixed;
    bottom:20px;
    left:0;
    right:0;
    margin:0 auto;
    text-align:center;
    font-size:15px;
}
.page ul{
    display:inline-block;
}
.page li{
    display:inline-block;
    margin-left:10px;
    border:1px solid #ccc;
    border-radius:10px;
    padding:5px 10px;
    cursor:pointer;
    color:#666;
    transition:background-color 0.5s
}
.page li:hover{
    background-color:rgba(193,49,44,1);
    color:#fff;
}
.page .jump{
    display:inline-block;
    color: #999;
    margin-left:30px;
}
.page input{
    display:inline-block;
    height:15px;
    width:15px;
    margin:0px 4px;
}
.page strong{
    margin-left:10px;
    color:#999;
}
.page .clickColor{
    background-color:rgba(193,49,44,1);
    color:#fff;
}
</style>
