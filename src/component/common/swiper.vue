<template>
    <div class="swiper" @mouseenter="clearTimer" @mouseleave="setTimer">
        <ul class="clearfix" ref="swiperList">
            <li v-for="(item, i) in swiperList" :class="classList[i]" ref="lis">
                <router-link :to="item.router || ''">
                    <img :src="item.img" :title="item.title || '轮播图图片'"/>
                </router-link>
            </li>
        </ul>
        <ol>
            <li v-for="(item, i) in swiperList"  :class="{active : i === nowPage}"></li>
        </ol>
        <input type="button" @click="clickLeft" class="swiper-left" />
        <input type="button" @click="clickRight" class="swiper-right" />
    </div>
</template>


<script>
    // TODO 1 轮播图数量少于三张时的处理，思路复制数组使之大于三
    // TODO 2 小圆点的点击事件
    // 引入配置文件 
    import config from "../../js/config.js";

    export default {
        data (){
            return {
                isFirstSetHeight : true, //判断是否第一次设置高度
                ulHeight : 0,        //存储列表的高度
                nowPage : 0,         //存储当前的图片索引
                classList : [],      //存放改变类名的数组
                swiperTimer : null,   //存储轮播图的定时器
                interval : config.swiper.interval   //定时器间隔
            }
        },
        props : ["swiperList"],      //接收父组件传递的数组
        mounted (){
            // 1.根据接收到的参数设置类名数组
            this.classList = this.swiperList.map((v, i, arr)=>{
                if(i === 0){
                    return "center";
                }else if(i === 1){
                    return "right-back";
                }else if(i === arr.length - 1){
                    return "left";
                }else {
                    return "none";
                }
            });

            // 2.由于li元素是定位的,需要在生成后设置高度
            this.setUlHeight();
            window.addEventListener("resize", ()=>{
                this.setUlHeight();
            })

            // 3.设置初始的定时器
            this.setTimer();
        },
        methods : {
            // 1.点击左键的方法
            clickLeft (){
                var list = this.classList;
                this.toggle("left");        //1.1 改变类名数组的内容以改变图片的堆叠顺序
                list.push(list.shift());    //1.2 增删数组以显示动画
                this.setPage("left");       //1.3 记录当前图片的索引
            },
            // 2.点击右键的方法
            clickRight (){
                var list = this.classList;
                this.toggle("right");
                list.unshift(list.pop());
                this.setPage("right");
            },
            // 3.替换类名数组的方法
            toggle (direction){
                const list = this.classList;

                // 查找并替换新旧类名函数 last => 改变后的类名 ; first => 改变前的类名
                function toggle(last, first){
                    const i = list.findIndex((item)=>{
                        return item === first;
                    });
                    list[i] = last;
                };

                // 向左时的查找切换类名数组方法
                if(direction === "right"){
                    toggle("right-back", "right");
                    toggle("left", "left-back");
                }
                // 向右时的查找切换类名数组方法
                else if(direction === "left"){
                    toggle("right","right-back");
                    toggle("left-back","left");
                }
            },
            // 4.改变当前记录的图片位置的方法 
            //     当num的值为 left 时自动向左, right 时自动向右, 也可以传入数字作为制定值
            setPage (num){
                var max = this.classList.length - 1;
                // 4.1 左右按键点击的判断
                if(num === "left"){
                    this.nowPage --;
                }else if(num === "right"){
                    this.nowPage ++;
                }else {
                    this.nowPage = num;
                }
                // 4.2 极值判断
                if(this.nowPage > max){
                    this.nowPage = 0;
                }else if(this.nowPage < 0){
                    this.nowPage = max;
                }
            },
            // 5.自动设置列表高度的方法
            setUlHeight (){ 
                // 5.1 如果是页面刚加载需要等待图片加载完设置高度
                const _this = this;
                if(this.isFirstSetHeight){
                    this.isFirstSetHeight = false;
                    this.$refs.lis[0].children[0].children[0].onload = ()=>{
                        set();
                    }
                // 5.2 否则直接设置高度    
                }else {
                    set()
                }
                function set(){
                    _this.ulHeight = _this.$refs.lis[0].offsetHeight;
                    _this.$refs.swiperList.style.height = _this.ulHeight + "px";
                }
            },
            // 6.清除轮播定时器
            clearTimer (){
                clearInterval(this.swiperTimer);
                this.swiperTimer = null;
            },
            // 7.设置轮播定时器
            setTimer (){
                this.swiperTimer = setInterval(this.clickRight, this.interval);
            }
        }
    }
</script>


<style lang="less" scope>
    .swiper {
        overflow: hidden;
        position: relative;
        ul {
            position: relative;
            li {
                position: absolute;
                a {
                    img {
                        width: 100%;
                        display: block;
                    }
                }
                &.left {
                    transform: translateX(-100%);
                    transition: 1s;
                    z-index: 2;
                }
                &.left-back {
                    transform: translateX(-100%);
                }
                &.center {
                    transition: 1s;
                    z-index: 2;
                }
                &.right {
                    transform: translateX(100%);
                    transition: 1s;
                    z-index: 2;
                }
                &.right-back {
                    transform: translateX(100%);
                }
            }
        }
        ol {
            position: absolute;
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 2;
            li {
                transition: .5s;
                float: left;
                width: 15px;
                height: 15px;
                margin: 0 5px 10px;
                border-radius: 50%;
                background: rgba(255,255,255,.5);
                &.active {
                    background: rgba(255,255,255,1);
                }
            }
        }
        input {
            transition: .5s;
            position: absolute;
            z-index: 3;
            top: 0;
            width: 30%;
            height: 100%;
            outline: none;
            border: none;
            background: none;
            cursor: pointer;
            &.swiper-left:hover {
                background: linear-gradient(to right, rgba(255,255,255,.7), rgba(255,255,255,0));
            }
            &.swiper-right {
                right: 0;
                &:hover {
                    background: linear-gradient(to left, rgba(255,255,255,.7), rgba(255,255,255,0));
                }
            }
        }
    }
</style>