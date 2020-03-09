import React,{Component} from 'react'
import {Card, Button, Table, Icon, message,Modal} from "antd";
import LinkButton from "../../component/link-button/button";
import {reqAddCategory, reqCategory, reqDeleteCategory, reqUpdateCategory} from "../../api";
import AddForm from "./add-form";
import UpdateForm from "./update-form"

/*
职业管理
* */
export  default class Category extends Component{
    state={
        loading:false,//是否正在获取数据中
        categorys:[], //一级分类列表
        subCategorys:[],//二级分类列表
        category2:[],//当前选中的分类
        parentId:'0',//当前需要显示的分类列表的父分类Id
        parentName:'',//当前需要显示的分类列表的父分类Name
        showStatus:0, //表示添加/更新的确认框是否显示，0：都不显示，1：显示添加，2显示更新 ，3删除
    }
    //初始化table的所有列数组
    initColumns=()=>{
        this.columns=[
            {
                title: '职业总类',
                dataIndex: 'profetype',
                key: 'profetype',
            },
            {
                title: '操作',
                render:(category)=>(//每一行代表一个分类对象，render都需要渲染该行，故取出该行
                    <span>
                        <LinkButton onClick={()=>this.showUpdate(category)}>修改分类信息</LinkButton>
                        {/*如何向事件回调函数传递参数：先定义一个匿名函数，在函数调用处理的函数并传入数据*/}
                        <LinkButton onClick={()=>this.showSubCateGory(category)}>查看子分类</LinkButton>
                    </span>
                )
            }
        ];
    }
    //初始化table的所有列数组
    secondColumns=()=>{
        this.columns=[
            {
                title: '职业',
                dataIndex: 'occuptype',
                key: 'occuptype',
            },
            {
                title: '详细',
                dataIndex: 'occupdetail',
                key: 'occupdetail',
            },
            {
                title: '操作',
                render:(category)=>(
                    <span>
                        <LinkButton onClick={()=>this.showUpdate(category)}>修改分类信息</LinkButton>
                        <LinkButton onClick={()=>this.showDelete(category)}>删除</LinkButton>
                    </span>
                )
            }
        ];
    }

    //异步获取一级/二级分类列表显示
    getCategory=async ()=>{
        //发请求前显示loading
        this.setState({loading:true})
        const {parentId}=this.state
        //发异步ajax请求，获取数据
        const result=await reqCategory(parentId)
        //完成请求后隐藏loading
        this.setState({loading:false})
        if(result.status===0){
            //取出分类数组（可能是一级也可能是二级）
            const categorys=result.data
            //更新状态
            if(parentId==='0')
            {this.setState({categorys})}
            else
            {this.setState({subCategorys:categorys});}
        }else{
            message.error(result.msg)
        }
    }

    //显示指定一级分类对象的二级子列表
    showSubCateGory=(category)=>{
        this.secondColumns()
        //先更新状态
        this.setState({
            parentId:category.profeId,
            parentName:category.profetype
        },()=>{//在状态更新且重新render()后执行
            //console.log("parentId",this.state.parentId)
            //获取二级分类列表
            this.getCategory()
        })
        //setState()不能立即获取最新的状态：因为setState（）是异步更新状态
    }

    //显示一级分类列表
    showCategory=()=>{
        this.setState({
            subCategorys:[],//二级分类列表
            parentId:'0',//当前需要显示的分类列表的父分类Id
            parentName:'',//当前需要显示的分类列表的父分类Name
        })
        this.initColumns()
    }

    //添加分类
    addCategory=async ()=>{
        //表单验证，通过才处理
        this.form.validateFields(async (err,values)=>{
            if(!err){
                //1.隐藏确认框
                this.setState({
                    showStatus:0
                })
                //收集数据数据
                const {parentId,categoryName,categoryContent,categoryId}=this.form.getFieldsValue()
                console.log(parentId,categoryName,categoryContent,categoryId)
                //清除数据
                this.form.resetFields()
                //2.发请求添加分类
                const result=await reqAddCategory(categoryName,parentId,categoryContent,categoryId)
                //3.
                if(result.status===0){
                    //重新分类
                    this.getCategory()
                }else{
                    message.error(result.msg)
                }
            }
        })
    }

    //显示添加的确认框
    showAdd=()=>{
        this.setState({
            showStatus: 1
        })
    }

    //更新分类
    updateCategory=()=>{
        //表单验证，通过才处理
        this.form.validateFields(async (err,values)=>{
            if(!err){
                //1.隐藏确认框
                this.setState({
                    showStatus:0
                })
                //准备数据
                const categoryId=this.category.occupId===undefined?this.category.profeId:this.category.occupId
                const categoryName=this.form.getFieldValue('categoryName')
                const categoryContent=this.form.getFieldValue('categoryContent')
                //清除数据
                this.form.resetFields()
                //2.发请求更新分类
                const result=await reqUpdateCategory({categoryName,categoryId,categoryContent})
                //3.重新分类
                if(result.status===0) {
                    this.getCategory()
                }else {message.error(result.msg)}
            }
        })
    }
    //删除分类
    showDelete= (category)=>{
        Modal.confirm({
            title:`确认删除分类${category.occuptype}吗？`,
        onOk:async ()=> {
                console.log(category.occupId)
            const result = await reqDeleteCategory(category.occupId)
            if (result.status === 0) {
                this.getCategory()
            } else {
                message.error(result.msg)
            }
        }
        })

    }

    //显示修改的确认框
    showUpdate=(category)=>{
        //保存分类对象
        this.category = category

        this.setState({
            showStatus:2
        })
    }



    //响应点击取消：隐藏确认框
    handleCancel=()=>{
        //清除数据
        this.form.resetFields()
        //隐藏对话框
        this.setState({
            showStatus:0
        })
    }
    //响应点击取消：隐藏确认框
    handleCancel2=()=>{
        //清除数据
        //this.form.resetFields()
        //隐藏对话框
        this.setState({
            showStatus:0
        })
    }

    //为第一次render()准备数据
    componentWillMount() {
        this.initColumns()
    }

    //发异步ajax请求
    componentDidMount() {
        this.getCategory ()
    }

    render() {
        //读取状态数据
        const {loading,categorys,subCategorys,parentId,parentName,showStatus}=this.state
        //读取指定的分类
        const category=this.category ||{} //如果没有，传空对象
        //card的左侧
        const title=parentId==='0' ? "一级分类列表" :(
            <span>
                <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>
                <Icon type="arrow-right" style={{marginRight:5}}/>
                <span>{parentName}</span>
            </span>
        )

        //card的右侧
        const extra=(
            <Button onClick={this.showAdd}>
                <Icon type='plus'/>添加
            </Button>
        )

        //上面取得的categorys的值是通过dataSource来分配
        return (
            <Card title={title} extra={extra} >
                <Table dataSource={parentId==='0'?categorys:subCategorys}
                       columns={this.columns} bordered={true} rowKey={parentId==='0'?'profeId':'occupId'}
                       pagination={{defaultPageSize:5,showQuickJumper:true}} loading={loading}>
                </Table>
                <Modal title="添加分类" visible={showStatus===1} onOk={this.addCategory} onCancel={this.handleCancel}>
                    <AddForm parentId={parentId} categorys={categorys} setForm={(form)=>{this.form=form}}/>
                </Modal>
                <Modal title="更新分类" visible={showStatus===2} onOk={this.updateCategory} onCancel={this.handleCancel}>
                    <UpdateForm categoryName={category.profetype===undefined?category.occuptype:category.profetype}
                                categoryContent={category.occupdetail} setForm={(form)=>{this.form=form}}> </UpdateForm>
                    {/*此处的setForm对象目的是将子组件的值传回父组件，并保存起来*/}
                </Modal>

            </Card>
        )
    }
}