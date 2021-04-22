<template>
    <div class="index">
        <sd-header :title="title" :isLeft="false"></sd-header>

        <div class="home">
            <div v-show="swipeIndex == 0" class="homeItem">
                <div @click="goWrite">填写个人信息</div>
            </div>
            <div v-show="swipeIndex == 1" class="homeItem">

            </div>
            <div v-show="swipeIndex == 2" class="homeItem">
                <div class="userItem" v-for="(item, key) in userArr" :key="key">
                    {{item.username}}
                </div>
            </div>
        </div>

        <sd-tabbar fixed v-model="active" @change="changeTab" ref="tabbar">
            <sdTabbarItem icon="home" :dot="true">主页</sdTabbarItem>
            <sdTabbarItem  badge="2">购物车
                <template #icon="props">
                    <i :style="`color: ${props.active ? '#1989fa' : '#7d7e80'}`" class="iconfont iconcart"></i>
                </template>
            </sdTabbarItem>
            <sdTabbarItem icon="people">我的</sdTabbarItem>
        </sd-tabbar>

        <sd-dialog type="confirm" v-model="isShow" @confirm="confirm" @cancel="isShow = false">
            <input class="modify" type="text" v-model="currName">
        </sd-dialog>
    </div>
</template>


<script lang="ts">
    import { sdField } from '../../components/field'
    import Vue from 'vue'
    Vue.use(sdField)
    enum titleName {
        '主页',
        '购物车',
        '我的'
    }
    export default {
        name: '',
        data() {
            return {
                active: 0,
                title: '主页',
                userArr: [],
                isShow: false,
                currName: '',
                currItem: {},
                swipeIndex: 0,

            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData() {
                this.$axios.get(`/queryAllUser`, {})
                    .then((res)=> {
                        if(res.code !== 200) {
                            this.$toast.default({
                                content: res.note
                            })
                        } else {
                            this.userArr = res.data
                            console.log(res.data)
                        }
                    })

            },
            changeTab(e) {
                this.title = titleName[e]
                this.swipeIndex = e
            },
            modify(item, key) {
                this.currName = item.name
                this.currItem = item
                this.isShow = !this.isShow
            },
            confirm() {
                this.$axios.post(`/modifyUser`, {userID: this.currItem.userID, name: this.currName})
                    .then((res)=> {
                        this.isShow = false
                        this.$toast.default({
                            content: res.note
                        })
                        if(res.code === 200) {
                            this.initData()
                        }
                    })
            },
            deleteItem(item, key) {
                this.$dialog.confirm({
                    content: '您确定删除该用户？',
                    duration: 0,
                    confirmBtnText: '确定',
                    cancelBtnText: '取消',
                }).then(()=> {
                    this.$dialog.close()
                    this.$axios.post(`/deleteUser`, {userID: item.userID})
                        .then((res)=> {
                            this.$toast.default({
                                content: res.data.note
                            })
                            if(res.data.code === 200) {
                                this.userArr.splice(key, 1)
                            }
                        })

                }).catch(()=> {
                    this.$dialog.close()
                })
            },
            swipeChange(e) {
                console.log(e)
                this.swipeIndex = e
                this.title = titleName[e]
                this.active = e
            },
            goWrite() {
                this.$router.push('/write')
            },
            sort(array) {
                if(array.length <= 1) {
                    return array
                }
                let center = Math.floor(array.length / 2)
                let leftArr = [], rightArr = []
                array.map((item, key)=> {
                    if(key === center) {
                        return
                    }
                    if(item >= array[center]) {
                        rightArr.push(item)
                    } else {
                        leftArr.push(item)
                    }
                })
                return this.sort(leftArr).concat(array[center], this.sort(rightArr))
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .item {
        padding: 0 0.3rem;
        height: 1rem;
        border-bottom: 0.02rem solid #eee;
        span {
            line-height: 1rem;
        }
        span:nth-child(2) {
            margin-left: 0.5rem;
        }
    }
    .itemLeft {
        height: 1rem;
        width: 1.4rem;
        line-height: 1rem;
        text-align: center;
        color: #fff;
        background-color: #69c23a;
    }
    .itemRight {
        height: 1rem;
        width: 1.4rem;
        line-height: 1rem;
        text-align: center;
        color: #fff;
        background-color: #F56C6C;
    }
    .modify {
        border: none;
        height: 0.6rem;
        padding: 0.1rem 0.2rem;
        outline: none;
        background-color: #fafafa;
    }
    .home {
        .homeItem {
            padding: 0 0.32rem;
        }
    }
    .userItem {
        height: 0.72rem;
        line-height: 0.72rem;
    }
</style>