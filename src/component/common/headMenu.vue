<template>
  <nav>
     <transition>
     <table v-show="menuShow">
        <tr>
            <td v-for="(item, i) in headerMenuList" key="i">
                 <router-link :to="item.router"><i :class="item.iconClass"></i>{{"&nbsp;" + item.name}}</router-link>
            </td>
        </tr>
    </table>
     </transition>
    <button id="menu-btn" @click="toggleMenu">
        <i class="fa fa-align-justify"></i>
    </button>
  </nav>
</template>


<script>
    //引入设置文件
    import config from "../../js/config.js";


    export default {
        data (){
            return {
                menuList : {},     //接收菜单信息
                menuOnoff : false, //菜单开关状态
                smallScreenSize : config.smallScreenSize, //设置切换的尺寸
                screenWidth : 0,   //实时的屏幕宽度
                timer : null       //resize定时器,优化性能
            }
        },
        props : ["headerMenuList"],
        computed : {
            menuShow (){//判断菜单的显示状态
                if(this.screenWidth <= this.smallScreenSize && this.menuOnoff === false){
                    return false;
                }else {
                    return true;
                }
            }
        },
        created (){
            this.getScreenWidth ();
        },
        mounted (){
            //当屏幕尺寸变化时，调用设置屏幕宽度的方法
            window.addEventListener("resize",()=>{
                clearTimeout(this.timer);
                this.timer = null;
                this.timer = setTimeout(()=>{
                this.getScreenWidth();
                }, 100)
            })
        },
        methods : {
            toggleMenu (){  //切换按钮
                this.menuOnoff = !this.menuOnoff;
            },
            getScreenWidth (){ //获取屏幕宽度的方法
                this.screenWidth = (document.body || document.documentElement).offsetWidth;
            }
        }
    }
</script>


<style lang="less" scope>
    @color: rgba(0,0,0,.5);        /* 主题颜色 */
    @colorHover: rgba(0,0,0,.7);   /* 菜单悬浮时的背景色 */
    nav {
        box-shadow: 0 5px 10px #000;
    }
    @media only screen and (min-width: 681px){
        nav {
            background: @color;
            margin-bottom: 10px;
            table {
                width: 100%;
                max-width: 1200px;
                margin: 0 auto;
                tr{
                    text-align: center;
                    td {
                        color: #fff;
                        position: relative;
                        &::after {
                            content: "";
                            position: absolute;
                            right: 0;
                            top: 50%;
                            transform: translateY(-50%);
                            width: 1px;
                            height: 60%;
                            background: #fff;
                        }
                        &:last-child::after {
                            content: none;
                        }
                        a {
                            transition: .5s;
                            display: block;
                            width: 100%;
                            height: 100%;
                            cursor: pointer;
                            box-sizing: border-box;
                            padding: 10px;
                            color: white;
                            font-size: 16px;
                            &:hover {
                                background: @colorHover;
                            }
                        }
                    }
                }
            }
            #menu-btn {
                display: none;
            }
        }
    }
    @media only screen and (max-width: 680px){
        nav {
            background: @color;
            box-sizing: border-box;
            width: 100%;
            padding: 5px;
            position: fixed;
            top: 0;
            zoom: 1;
            &::after {
                content: "";
                display: block;
                clear: both;
            }
            #menu-btn {
                outline: none;
                background: none;
                text-align: center;
                width: 30px;
                height: 30px;
                border: 1px solid #fff;
                border-radius: 5px;
                float: right;
                i {
                    color: #fff;
                    font-size: 22px;
                    line-height: 30px;
                }
            }
            table tr {
                position: absolute;
                left: 0;
                width: 100%;
                top: 100%;
                background: #eee;
                td {
                    display: block;
                    border-bottom: 1px solid #fff;
                    a {
                        color: #000;
                        display: block;
                        width: 100%;
                        height: 100%;
                        padding: 10px;
                    }
                }
            }   
        }
        .v-enter,.v-leave-to {
            opacity: 0;
        }
        .v-leave,.v-enter-to {
            opacity: 1;
        }
        .v-enter-active,.v-leave-active {
            transition: .5s;
        }
    }
</style>