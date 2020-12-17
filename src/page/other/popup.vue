<template>
    <div>
        <div @click="showPopup">点击显示</div>
        <sdPopup v-model="show">
            <div style="height: 200px"></div>
        </sdPopup>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                show: false
            }
        },
        methods: {
            showPopup() {
                this.show = true
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>