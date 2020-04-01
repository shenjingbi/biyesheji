import React,{Component} from 'react'
import {Button,Form,Icon,Input,message} from "antd";
import {connect} from 'react-redux'

import "./registers.less"
import logo from '../../assets/image/tubiao.jpg'
import {reqRegisterManager} from '../../api'


const Item=Form.Item //必须写在import之后

class Register extends Component{
    state={
        username:'',
        password:'',

    }

    handleSubmit=(event)=>{
        //阻止事件的默认行为
        event.preventDefault();
        //得到form对象
        const form=this.props.form
        //获得表单项的输入数据，对所有的表单字段进行校验
        form.validateFields(async (err, values) => {
            if (!err) {
                /*reqLogin(username,password).then(response=>{
                    console.log("chenggong",response.data)
                }).catch(error=>{
                    console.log("shibai",error)
                });*/
                const result=await reqRegisterManager(values)//直接把response.data给result
                //console.log("chenggong",result)
                //const result=response.data //{status:0,data:user}  {status:1,msg:"xxx"}
                if(result.status===0){//成功
                    //提示登录成功
                    message.success('注册成功,并登录')

                    //保存user
                    const user=values
                    this.props.user=user //保存在内存中
                    this.props.saveUser(user)

                    //跳转到管理界面
                    this.props.history.replace('/')
                }else {//失败
                    message.error(result.msg)
                }
            }else {
                console.log('校验失败')
            }
        });
    }



    toLogin=()=>{
        this.props.history.push('/login')
    }
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password1')) {
            callback('两次输入的密码不一致');
        } else {
            callback();
        }
    };
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
        //得到强大的form组件
        const {getFieldDecorator }=this.props.form
        return (
            <div className="register">
                <header className="register-header ">
                    <img src={logo} alt='logo'/>
                    <h1>高校招聘</h1>
                </header>
                <section className="register-content">
                    <h2>用户注册</h2>
                    <Form onSubmit={this.handleSubmit} className="register-form">
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
                                    initialValue:'admin'

                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户"
                                    />
                                )
                            }

                        </Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password1',{
                                    rules: [
                                        { required: true,whitespace:true, message: '密码必须输入' },
                                        { min: 4, message: '密码至少4位' },
                                        { max: 12, message: '密码最多12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' },
                                    ],
                                })(
                                    <Input prefix={<Icon type='lock' style={{color:'raba(0,0,0,.25)'} }/>}
                                           placeholder="Password" type='password'/>
                                )
                            }
                        </Form.Item>

                        <Form.Item>
                            {
                                getFieldDecorator('password2',{
                                    rules: [
                                        { required: true,whitespace:true, message: '密码必须输入' },
                                        { min: 4, message: '密码至少4位' },
                                        { max: 12, message: '密码最多12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' },
                                        {validator: this.compareToFirstPassword},
                                    ],
                                })(
                                    <Input prefix={<Icon type='lock' style={{color:'raba(0,0,0,.25)'} }/>}
                                           placeholder="Confirm Password" type='password'/>
                                )
                            }
                        </Form.Item>

                        <Form.Item>
                            {
                                getFieldDecorator('email',{
                                    rules: [
                                        { type: 'email',message: 'The input is not valid E-mail!', },
                                        { required: true,message: '请输入你的邮箱',},
                                    ],
                                })(
                                    <Input prefix={<Icon type='mail' style={{color:'raba(0,0,0,.25)'} }/>}
                                           placeholder="Email" type='email'/>
                                )
                            }
                        </Form.Item>

                        <Form.Item>
                            {
                                getFieldDecorator('phone',{
                                    rules: [
                                        { required: true,message: '请输入你的手机号'},
                                    ],
                                })(
                                    <Input prefix={<Icon type='phone' style={{color:'raba(0,0,0,.25)'} }/>}
                                           placeholder="Telephone" type='text'/>
                                )
                            }
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="register-form-button">
                                注册
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" className="register-form-button" onClick={this.toLogin}>
                                已有账户
                            </Button>
                        </Form.Item>
                    </Form>
                </section>

            </div>

        )
    }
}

const Wrapregister=(Register)
export default connect(
    state=>({user:state.user}),
    {}
)(Wrapregister)


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
包装Form组件生成一个新的组件：Form（register）
新组件会向Form组件传递一个强大的对象属性：form
*/

