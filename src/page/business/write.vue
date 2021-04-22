<template>
    <div class="write">
        <sd-header :title="title" @click-left="goBack"></sd-header>
        <div>
            <sd-field v-model="userInfo.name" label="姓名:" placeholder="请输入姓名"></sd-field>
            <sd-field v-model="userInfo.sex" label="性别:" placeholder="请选择性别" readonly @click="showSex"></sd-field>
            <sd-field v-model="userInfo.age" label="年龄:" placeholder="请输入年龄"></sd-field>
            <sd-field v-model="userInfo.hobby" label="爱好:" placeholder="请输入爱好"></sd-field>
            <sd-field v-model="userInfo.job" label="职业:" placeholder="请选择职业" readonly @click="showJob"></sd-field>
            <sd-field v-model="userInfo.phone" label="手机号:" placeholder="请输入手机号"></sd-field>
            <sd-field v-model="cityName" label="区域:" placeholder="请选择区域" readonly @click="showRegion"></sd-field>
            <sd-field v-model="userInfo.birthday" label="生日:" placeholder="请选择生日" readonly @click="showBirthday"></sd-field>
            <sd-field v-model="userInfo.introduction" label="简介:" placeholder="请填写简介"></sd-field>
            <sd-field v-model="userInfo.address" label="住址:" placeholder="请填写住址"></sd-field>
        </div>
        <div class="submit" @click="submit">提交</div>
        <sdActionSheet v-model="sexShow" :actions="sexActions" isBorder description="请选择性别" @select="selectSex"></sdActionSheet>

        <sdActionSheet v-model="jobShow" :actions="jobActions" isBorder description="请选择职业" @select="selectJob"></sdActionSheet>

        <sdPopup v-model="regionShow">
            <sdPicker isCascade customName="label" :columns="city" v-model="userInfo.cityArr" title="请选择区域" @clickLeftBtn="regionCancel" @clickRightBtn="regionConfirm"></sdPicker>
        </sdPopup>

        <sdPopup v-model="birthdayShow">
            <sd-dateTimePicker type="date" :minDate="minDate" v-model="currDate" @clickLeftBtn="birthdayCancel" @clickRightBtn="birthdayConfirm">

            </sd-dateTimePicker>
        </sdPopup>
    </div>
</template>

<script lang="ts">
    import city from '../../assets/js/city-data.js'
    export default {
        name: 'write',
        data() {
            return {
                title: '个人信息',
                city: city,
                userInfo: {
                    name: '',
                    sex: '',
                    age: '',
                    hobby: '',
                    job: '',
                    phone: '',
                    introduction: '',
                    cityArr: [],
                    birthday: '',
                    address: '',
                },
                minDate: new Date('1900-01-01'),
                currDate: new Date(),
                cityName: '',
                sexShow: false,
                sexActions: [{name: '男'}, {name: '女'}],
                jobShow: false,
                jobActions: [{name: '公务员'}, {name: 'Coder'}, {name: 'Boss'}, {name: '自由职业者'}, {name: '工人'}, {name: '教师'}],
                regionShow: false,
                birthdayShow: false
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            goBack() {
                console.log(123)
                this.$router.go(-1)
            },
            initData() {
                const params = {userID: sessionStorage.getItem('userId')}
                console.log(params)
                this.$axios.get(`/queryUserInfo`, {params: params})
                    .then((res)=> {
                        if(res.code === 200) {
                            let {name, sex, age, hobby, job, phone, introduction, address } = res.data
                            this.userInfo = {name, sex, age, hobby, job, phone, introduction, address }
                            this.cityName = res.data.regionName
                            this.currDate = res.data.birthday
                            this.userInfo.cityArr = res.data.cityArr
                            this.userInfo.birthday = this.$moment(res.data.birthday).format('YYYY-MM-DD')
                        } else {
                            this.$toast.default({
                                content: res.note
                            })
                        }
                    })
            },
            showSex() {
                this.sexShow = true
            },
            selectSex(e) {
                this.$set(this.userInfo, 'sex', e.action.name)
                this.sexShow = false
            },
            showJob() {
                this.jobShow = true
            },
            selectJob(e) {
                this.$set(this.userInfo, 'job', e.action.name)
                this.jobShow = false
            },
            showRegion() {
                this.regionShow = true
            },
            regionCancel() {
                this.regionShow = false
            },
            regionConfirm(e) {
                console.log(e)
                this.cityName = `${e[0].label}/${e[1].label}/${e[2].label}`
                this.regionShow = false
            },
            showBirthday() {
                this.birthdayShow = true
            },
            birthdayCancel() {
                this.birthdayShow = false
            },
            birthdayConfirm(e) {
                this.$set(this.userInfo, 'birthday', this.$moment(e).format('YYYY-MM-DD'))
                this.birthdayShow = false
            },
            submit() {
                console.log(this.userInfo)
                new Promise((resolve, reject)=> {
                    for(let key in this.userInfo) {
                        if(!this.userInfo[key]) {
                            reject('请填写完整信息')
                            return
                        }
                    }
                    if(!this.userInfo.cityArr.length) {
                        reject('请填写完整信息')
                        return
                    }
                    resolve()
                }).then(()=> {
                    this.$axios.post(`/modifyUser`, {userID: sessionStorage.getItem('userId'), userInfo: this.userInfo})
                        .then((res)=> {
                            this.$toast.default({
                                content: res.note
                            })
                            if(res.code === 200) {

                            }
                        })
                }).catch((err)=> {
                    this.$toast.default({
                        content: err
                    })
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .submit {
        position: fixed;
        bottom: 0.3rem;
        left: 1.4rem;
        right: 1.4rem;
        height: 0.88rem;
        border-radius: 0.24rem;
        text-align: center;
        line-height: 0.88rem;
        font-size: 0.36rem;
        background-color: #5a96ec;
        color: #fff;
    }
    .submit:active {
        background-color: rgba(90, 150, 236, 0.81);
    }
</style>