<template>
    <div class="w">

        <swiper :swiperList="swiperList"></swiper>

    </div>
</template>


<script>
    import swiper from "../common/swiper.vue";  //引入轮播图组件

    export default {
        data (){
            return {
                swiperList : [{
                    img: "http://pic.jj20.com/up/allimg/1011/092QG35Z2/1F92Q35Z2-1.jpg",
                    router: "1",
                    title: "信息1"
                },{
                    img: "http://pic.jj20.com/up/allimg/1011/092QG35Z2/1F92Q35Z2-2.jpg",
                    router: "2",
                    title: "信息2"
                },{
                    img: "http://pic.jj20.com/up/allimg/1011/092QG35Z2/1F92Q35Z2-3.jpg",
                    router: "3",
                    title: "信息3"
                },{
                    img: "http://pic.jj20.com/up/allimg/1011/092QG35Z2/1F92Q35Z2-4.jpg",
                    router: "4",
                    title: "信息4"
                }]
            }
        },
        components : {
            swiper
        }
    }
</script>


<style lang="less" scope>
    
</style>