const menuList=[
    {
        title:'首页',
        key:'/home',
        icon:'home',
        isPublic:true //公开的
    },
    {
        title:'用户',
        key:'/users',
        icon:'user',
        children:[
            {
                title:'用户管理',
                key:'/user',
                icon:'idcard',
            },
            {
                title:'职业管理',
                key:'/category',
                icon:'safety',
            },

        ]
    },
    {
        title:'企业',
        key:'/enterprise',
        icon:'bank',
    },
    {
        title:'管理员',
        key:'/managers',
        icon:'team',
        children:[
            {
                title:'管理员信息',
                key:'/manager',
                icon:'windows',
            },
            {
                title:'角色管理',
                key:'/role',
                icon:'bank',
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