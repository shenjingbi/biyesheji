const menuList=[
    {
        title:'首页',
        key:'/home',
        icon:'home',
        isPublic:true
    },
    {
        title:'用户',
        key:'/users',
        icon:'user',
        children:[
            {
                title:'个人信息',
                key:'/user',
                icon:'user',
            },
            {
                title:'职业管理',
                key:'/category',
                icon:'safety',
            },
            {
                title:'角色管理',
                key:'/role',
                icon:'windows',
            },
        ]
    },
    {
        title: '图形图表',
        key: '/charts',
        icon: 'area-chart',
        children: [
            {
                title: '柱形图',
                key: '/bar',
                icon: 'bar-chart'
            },
            {
                title: '折线图',
                key: '/line',
                icon: 'line-chart'
            },
            {
                title: '饼图',
                key: '/pie',
                icon: 'pie-chart'
            },
        ]
    },

]

export default menuList