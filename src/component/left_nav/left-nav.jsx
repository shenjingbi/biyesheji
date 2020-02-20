import React,{Component} from 'react'
import {Link,withRouter} from "react-router-dom";
import {Menu,Icon} from "antd";

import './left-nav.less'
import logo from '../../assets/image/tubiao.jpg'
import menuList from "../../config/menuConfig";

const SubMenu=Menu.SubMenu

/*
左侧导航的组件
* */
class LeftNav extends Component{
   /* 根据menu的数据数组生成对应的标签数组
    使用map()+递归调用*/
    getMenuNodes_map=(menuList)=>{
        return menuList.map(item=>{
            /*
            两种可能
            1.Menu.Item（无子路由）
            2.Submenu(有子路由)
            * */
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                             </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>

                )
            }
        })
    }

    /*根据menu的数据数组生成对应的标签数组
    使用reduce()+递归调用,pre是上次调用的数组*/
    getMenuNodes=(menuList)=>{
        //得到当前请求的路由路径
        const path=this.props.location.pathname
        return menuList.reduce((pre,item)=>{
           /* 向pre中添加 1.Menu.Item（无子路由）
                         2.Submenu(有子路由)*/
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }
            else {
                //查找一个与当前请求路径匹配的子Item
                 const cItem=item.children.find(cItem=>cItem.key===path)
                //若存在，说明当前item的子列表需要打开
                if(cItem){
                    this.openKey=item.key
                }

                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                             </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        },[])
    }
    //在第一次render()之前执行一次
    //为第一个render()准备数据（数据必须同步的）
    componentWillMount() {
        this.menuNodes=this.getMenuNodes(menuList)
    }

    render() {
        //得到当前请求的路由路径
        const path=this.props.location.pathname
        //得到需要打开菜单项的key
        const openKey=this.openKey

        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo}alt='logo'/>
                    <h1>高校招聘后台</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {
                        this.menuNodes
                    }
                    {/*<Menu.Item key="/home">
                        <Link to='/home'>
                            <Icon type="pie-chart" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>

                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>用户</span>
                             </span>
                        }
                    >
                        <Menu.Item key="/user">
                            <Link to='/user'>
                                <Icon type="mail" />
                                <span>个人信息</span>
                             </Link>
                        </Menu.Item>
                        <Menu.Item key="/category">
                            <Link to='/category'>
                                <Icon type="mail" />
                                <span>职业管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/role">
                            <Link to='/role'>
                                <Icon type="mail" />
                                <span>角色管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>*/}

                </Menu>
            </div>
        )
    }
}

/*
withRouter高阶组件:
包装非路由组件，返回一个新的组件
新的组件向非路由组件传递3个属性：history/location/macth
* */

export default withRouter(LeftNav)