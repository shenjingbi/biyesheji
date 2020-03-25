import React,{Component} from 'react'
//import PropTypes from 'prop-types'
//import {connect} from "react-redux";
import {Button, Form, Icon, Input, message,Checkbox} from "antd";
import {Redirect} from 'react-router-dom'

import "./login.less"
import logo from '../../assets/image/tubiao.jpg'
import {reqUser} from '../../api'

import {connect} from "react-redux";
import {login} from "../../redux/actions";

const Item=Form.Item //必须写在import之后

class Login extends Component{
    state={
        username:'',
        password:'',
        remember:'',
    }

    handleSubmit=(event)=>{
        //阻止事件的默认行为
        event.preventDefault();

        //得到form对象
        const form=this.props.form
        //获得表单项的输入数据，对所有的表单字段进行校验
        form.validateFields(async (err, values) => {
            if (!err) {
                //请求登录
                const {username,password,remember}=values
                    //调用分发异步action的函数=>发登录的异步请求，有了结果更新状态
                if(remember===true)
                    this.props.login(username,password,1)
                else
                    this.props.login(username,password,0)

            }else {
                console.log('校验失败')
            }
        });
    }

    //获取记住密码的用户
    getUser=async ()=>{
        const result=await reqUser()
        if(result.data.length!==0){
            const users=result.data[0]
            const username=users.username
            const password=users.password
            this.state.roles=result.data[1]
            this.setState({
                username,
                password,
                remember:true
            })
        }
    }

    toRegister=()=>{
        this.props.history.replace('/register')
    }

    componentDidMount() {
        this.getUser()
    }

    /*
    对密码自定义验证
    * */
    /*validatePwd=(rule,value,callback)=>{
        if(!value){
            callback('密码必须输入')
        }else if(value.length<4){
            callback('密码长度不能小于4位')
        }else if(value.length>12){
            callback('密码长度不能大于12位')
        }else if(!/^[a-zA-z0-9_]+$/.test(value)){
            callback('用户名必须是英文、数字或下划线组成')
        }else {
            callback()
        }
        //callback()//验证成功
        //callback('xx')//验证失败，并提示
    }*/
    render(){
        //如果用户已经登陆，自动跳转到管理界面
        const user=this.props.user
        const {username,password,remember}=this.state
        if(user.userId&&user){
            return <Redirect to='/home'/>
        }

        //得到强大的form组件
        const {getFieldDecorator }=this.props.form
        return (
            <div className="login">
                <header className="login-header ">
                    <img src={logo} alt='logo'/>
                                <h1>高校招聘</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {
                                /*
                                    用户名/密码的合法性
                                    1）必须输入
                                    2）必须大于等于4位且小于等于12位
                                    3）必须是英文、数字或下划线组成
                                * */
                            }
                            {
                                getFieldDecorator('username',{//配置对象：属性名是特定的一些名称
                                    //声明式验证
                                    rules: [
                                        { required: true,whitespace:true, message: '用户名必须输入' },
                                        { min: 4, message: '用户名至少4位' },
                                        { max: 12, message: '用户名最多12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                                    ],
                                    initialValue:username===null?'admin':username

                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }

                        </Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password',{
                                    rules: [
                                        { required: true,whitespace:true, message: '密码必须输入' },
                                        { min: 4, message: '密码至少4位' },
                                        { max: 12, message: '密码最多12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' },
                                    ],
                                    initialValue:password===null?'':password
                                })(
                                    <Input prefix={<Icon type='lock' style={{color:'raba(0,0,0,.25)'} }/>}
                                           placeholder="Password" type='password'/>
                                )
                            }
                        </Form.Item>



                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: remember===''?false:true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" className="login-form-button" onClick={this.toRegister}>
                                未有账户
                            </Button>
                        </Form.Item>
                    </Form>
                </section>

            </div>

        )
    }
}

const WrapLogin=Form.create()(Login)


export default connect(
    state=>({user:state.user}),
    {login}
)(WrapLogin)

/*
1.高阶函数
    1)一类特别的函数
        a.接收函数类型的参数
        b.返回值是函数
    2)常见
        a.定时器：setTimeout()/setInterval()
        b:Promise:Promise(()=>{})then(value={},reason={})
        c.数组遍历相关的方法：forEach()/filter()/map()/reduce()/find()/findIndex()
        d.函数对象的bind()
        e.Form.create()()
    3)高阶函数更新动态，更具有扩展性
2.高阶组件
    1)本质就是一个函数
    2)接受一个组件，返回一个新的组件，新组件内部渲染被包装，包装组件向被包装组件传入特定属性
    3)作用：扩展组件的功能
    4)高阶组件也是高阶函数：接收一个组件函数，返回是一个新的组件函数
*
包装Form组件生成一个新的组件：Form（Login）
新组件会向Form组件传递一个强大的对象属性：form
*/

/*
async和await
1.作用
    简化promise对象的使用：不再使用then()来指定成功/失败的回调函数
    以同步编码方式（没有回调函数）实现异步流程
2.哪里写await？
    在返回promise的表达式左侧写await：不想要promise，想要promise异步执行的成功的value数据
3.哪里写async?
    await所在函数（最近的）定义的左侧写async
* */