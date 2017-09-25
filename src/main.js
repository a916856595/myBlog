//vue系列
import Vue from "vue";
import common from "./component/common/main.vue"; //公用部分
import router from "./js/router.js"; //导入路由

//引入css样式
import "./css/init.css";    //引入初始化css
import "./css/common.css";  //引入公共类css
import "./css/special.css"; //引入特殊css
import "./font/css/font-awesome.min.css";//引入字体图标



//引入设置文件
import config from "./js/config.js";


const app = new Vue({
    el : "#app",                //指定替换元素
    render : r => r(common),    //渲染必要组件
    router                      //使用路由
})