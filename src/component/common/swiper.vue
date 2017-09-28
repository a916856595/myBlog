<template>
    <div class="swiper" >
        <ul class="clearfix" ref="swiperList">
            <li v-for="(item, i) in swiperList" :class="classList[i]">
                <router-link :to="item.router">
                    <img :src="item.img" :title="item.title"/>
                </router-link>
            </li>
        </ul>
    <input type="button" value="left" style="z-index: 3;position: absolute" @click="toLeft">
    <input type="button" value="right" style="z-index: 3;position: absolute; right: 500px;" @click="toRight">
    </div>
</template>


<script>
    // TODO 1 轮播图数量少于三张时的处理，思路复制数组使之大于三
    // TODO 2 轮播图样式处理
    // TODO 3 悬浮时的暂停定时器处理
    // TODO 4 轮播图的按钮样式及小圆点处理
    export default {
        data (){
            return {
                classList: [],      //存放改变类名的数组
                swiperTimer: null   //存储轮播图的定时器
            }
        },
        props : ["swiperList"],
        mounted (){
            //根据接收到的参数设置类名数组
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
        },
        methods : {
            // 图片左滑动的方法
            toLeft (){
                var list = this.classList;
                this.toggle("left");
                list.unshift(list.pop());
            },
            // 图片右滑动的方法
            toRight (){
                var list = this.classList;
                this.toggle("right");
                list.push(list.shift());
            },
            // 替换类名数组的方法
            toggle (direction){
                const list = this.classList;

                // 查找并替换新旧类名函数 last => 改变后的类名 ; first => 改变前的类名
                function toggle(last, first){
                    const i = list.findIndex((item)=>{
                        return item === first;
                    });
                    list[i] = last;
                };

                // 向左时的查找切换
                if(direction === "left"){
                    toggle("right-back", "right");
                    toggle("left", "left-back");
                }

                // 向右时的查找切换
                else if(direction === "right"){
                    toggle("right","right-back");
                    toggle("left-back","left");
                }
            }
        }
    }
</script>


<style lang="less" scope>
    .swiper {
        width: 50%;
        ul {
            position: relative;
            li {
                position: absolute;
                a {
                    img {
                        width: 100%;
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
    }
</style>