//导入路由模块
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


//导入路由组件
import blogFace from "../component/blog/blogFace.vue";      //博客主界面
import blogDetail from "../component/blog/blogDetail.vue";  //博客主界面
import index from "../component/index/index.vue";           //默认界面

//设置路由参数
const routes = [{ path : "/blogFace", component : blogFace},
                { path : "/blogDetail/:id", component : blogDetail},
                { path : "/index", component : index},
                { path : "/", component : index}]

//使用路由
const router = new VueRouter({
    routes
});

export default router;