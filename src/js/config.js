export default {
    smallScreenSize : 680,   // 切换到小屏的窗口临界值 
    headerMenuList : [{      // 顶部导航的配置项  name => 显示的文本 iconClass => fontawesome图标类名 router => 与之匹配的路由
        name : "博 客",
        iconClass : "fa fa-wpforms",
        router : "/blogFace"
    },{
        name : "游 戏",
        iconClass : "fa fa-gamepad",
        router : "/game"
    },{
        name : "其 他",
        iconClass : "fa fa-suitcase",
        router : "demo3"
    }]
}