<template lang="pug">
.page
    ul
        li(v-if="nowPage !== 1", @click="prev") 上一页 
        li(v-for="(v, k) in tempPages", @click="jump", :class="v == nowPage ? 'active': ''") {{ v }}
        li(v-if="nowPage !== nowPages", @click="next") 下一页
    .jump
        span 共{{ pages }}页,跳到
        input.form-control(@keyup.enter="jump")
        | 页
</template>
<script>
export default {
    data () {
        return {
            tempPages: [],
            limit: 2,
            max: 0,
            nowPage: 1,
            nowPages: 1
        }
    },
    props: {
        pages: '',
        page: ''
    },
    mounted () {
        this.init()
    },
    watch: {
        pages () {
            this.init()
        },
        page () {
            this.init()
        },
        nowPage (e) {
            this.$emit('emit', e)
        }
    },
    methods: {
        init () {
            this.nowPage = this.page
            this.nowPages = this.pages
            this.max = this.limit * 4 + 3
            this.initPage()
        },
        prev () {
            if (this.nowPage > 1) {
                this.nowPage --
                this.initPage()
            }
        },
        next () {
            if (this.nowPage < this.nowPages) {
                this.nowPage ++
                this.initPage()
            }
        },
        jump (e) {
            let page = e.target.textContent || e.target.value - 0
            if (page > 0 && page <= this.nowPages) {
                this.nowPage = page
                this.initPage()
            }
        },
        initPage () {
            if (this.nowPages <= this.max) {
                this.tempPages = Array.from({length: this.nowPages}, (v, k) => {
                    v = k + 1
                    return v
                })
            } else if (this.nowPage - this.limit * 2 - 1 <= 1) {
                this.tempPages = Array.from({length: this.max + 1}, (v, k) => {
                    if (k + 1 <= this.limit * 3 + 2) {
                        v = k + 1
                    } else if (k + 1 === this.limit * 3 + 3) {
                        v = '...'
                    } else {
                        v = this.nowPages - (this.max - k)
                    }
                    return v
                })
            } else if (this.nowPage + this.limit * 2 + 1 >= this.nowPages) {
                this.tempPages = Array.from({length: this.max + 1}, (v, k) => {
                    if (k + 1 <= this.limit * 1 + 1) {
                        v = k + 1
                    } else if (k + 1 === this.limit * 1 + 2) {
                        v = '...'
                    } else {
                        v = this.nowPages - (this.limit * 3 + 2 - (k - this.limit * 2 + 1))
                    }
                    return v
                })
            } else {
                this.tempPages = Array.from({length: this.max + 2}, (v, k) => {
                    if (k + 1 <= this.limit * 1 + 1) {
                        v = k + 1
                    } else if (k + 1 === this.limit * 1 + 2) {
                        v = '...'
                    } else if (k + 1 > this.limit * 1 + 2 && k + 1 < this.limit * 3 + 4) {
                        v = this.nowPage - 2 + (k - this.limit * 2)
                    } else if (k + 1 === this.limit * 3 + 4) {
                        v = '...'
                    } else {
                        v = this.nowPages - (this.limit * 3 + 3 - (k - this.limit * 2 + 1))
                    }
                    return v
                })
            }
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
.page .active{
    background-color:rgba(193,49,44,1);
    color:#fff;
}
</style>
