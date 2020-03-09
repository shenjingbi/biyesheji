import React,{Component} from 'react'
import PropTypes from 'prop-types'
import{Form,Input,Tree} from "antd";
//import category from "./category";
import menuList from "../../config/menuConfig";

const Item=Form.Item
const {TreeNode}=Tree


//添加分类的Form组件
export default class AuthForm extends Component{
    static  propTypes={
        role:PropTypes.object.isRequired
    }


    constructor(props){
        super(props)
        //根据传入角色的menus生成初始状态
        const menus=props.role.menus;
        //console.log(menus)
        if(menus){this.state={
            checkedKeys:menus.split(",")
        }}else{this.state={
            checkedKeys:null}}
    }

    //为父组件提交获取最新menus数据的方法
    getMenus=()=>this.state.checkedKeys

    getTreeNodes=(menuList)=>{
        return menuList.reduce((pre,item)=>{
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children? this.getTreeNodes(item.children):null}
                </TreeNode>
            )
            return pre
        },[])
    }

    //选中某一个node时的回调函数
    onCheck=(checkedKeys)=>{
        this.setState({checkedKeys})
    }

    componentWillMount() {
        this.treeNodes=this.getTreeNodes(menuList)
    }

    //根据新传入的role来更新checkedKeys状态
    //当组件接受到新的属性时自动调用
    componentWillReceiveProps(nextProps) {
        const menus=nextProps.role.menus
        const menus2=menus==null?menus:menus.toString().split(",")
        this.setState({checkedKeys:menus2})
    }

    render() {
        const {role}=this.props
        const {checkedKeys}=this.state
        const formItemLayout={
            labelCol:{span:4},
            wrapperCol:{span:15}
        }
        return (
            <div>
                <Item label='角色名称' {...formItemLayout}>
                    {
                        <Input  value={role.role_name}disabled/>
                    }
                </Item>

                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                >
                    <TreeNode title="平台权限" key="all">
                        {this.treeNodes}
                    </TreeNode>
                </Tree>
            </div>

        )
    }
}
