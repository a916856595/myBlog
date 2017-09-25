<template>
    <div>
        <!-- 头部菜单 -->
        <header><headerMenu :headerMenuList="headerMenuList"></headerMenu></header>
        <img src="../../imgs/11.jpg">
        <router-view></router-view>
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
    img {
        width: 100%;
    }
    @media only screen and (max-width: 680px){
        header {
            padding-top: 40px;
        }
    }
</style>