import React,{Component} from 'react'
import {Link,withRouter} from "react-router-dom";
import {Menu,Icon} from "antd";
import {connect} from 'react-redux'

import './left-nav.less'
import logo from '../../assets/image/tubiao.jpg'
import menuList from "../../config/menuConfig";
import {setHeadTitle} from "../../redux/actions";

const SubMenu=Menu.SubMenu

/*
左侧导航的组件
* */
class LeftNav extends Component{

    //判断当前登录用户对item是否有权限
    hasAuth = (item) =>{
        const {key,isPublic}=item  //menuList列表中的key
        const menus1=this.props.user.menus||{}
        const menus=menus1.toString().split(",")
        const username=this.props.user.username
        //menus.indexOf(key)找key在数组中的下标，找不到就是-1
        /*1.如果当前用户是admin
        2.当前用户有此item的权限：key有没有在menus中
        3.如果当前item是公开的*/
        if(username==='admin'||isPublic||menus.indexOf(key)!==-1){
            return true
        }else if(item.children){//4.当前用户有此item的某个子item的权限
            return !!item.children.find(child=>{ return menus.indexOf(child.key)!==-1}) //!!：强制转换成bool值
        }
        return false

    }


    /*根据menu的数据数组生成对应的标签数组
    使用reduce()+递归调用,pre是上次调用的数组*/
    getMenuNodes=(menuList)=>{
        //得到当前请求的路由路径
        const path=this.props.location.pathname
        return menuList.reduce((pre,item)=>{
           /* 向pre中添加 1.Menu.Item（无子路由）
                         2.Submenu(有子路由)*/
           if(this.hasAuth(item)){
               if(!item.children){
                   //判断item是否是当前需对应的item
                   if(item.key===path||path.indexOf(item.key)===0){
                       //更新redux中的headerTitle状态
                       this.props.setHeadTitle(item.title)
                   }
                   pre.push((
                       <Menu.Item key={item.key}>
                           <Link to={item.key} onClick={()=>{this.props.setHeadTitle(item.title)}}>
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
                <Menu
                    mode="inline"
                    theme="white"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {
                        this.menuNodes
                    }

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

export default connect(
    state=>({user:state.user}),//传的是值
    {setHeadTitle}  //传递是方法，在这里调用action方法，改变reducer中的相应的状态值
)(withRouter(LeftNav))