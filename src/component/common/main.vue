<template>
    <div>
        <!--用于设置背景的盒子-->
        <div class="main-bg">
             <!-- 头部菜单 -->
            <header><headerMenu :headerMenuList="headerMenuList"></headerMenu></header>

            <router-view></router-view>

        </div>
        <!-- 底部信息 -->
        <footerInfo></footerInfo>
    </div>
</template>


<script>
    // 引入头部导航
    import headerMenu from "./headMenu.vue";
    // 引入底部信息
    import footerInfo from "./footerInfo.vue";
    // 引入配置文件
    import config from "../../js/config.js";

    export default {
        data (){
            return {
                headerMenuList : config.headerMenuList
            }
        },
        components : {
            headerMenu,
            footerInfo
        }
    }
</script>


<style lang="less">
    .main-bg {
        background:#000 url("../../imgs/main-bg.jpg") no-repeat;
        background-position: center center;
    }
    @media only screen and (max-width: 680px){
        header {
            padding-top: 40px;
        }
    }
</style>