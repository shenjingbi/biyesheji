import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {NavBar,InputItem} from 'antd-mobile'


//import RegisterUp from "../../component/login/register/registers-up";
//import CommentList from "../../component/comment/comment-list/comment-list";

//import Logo from "../../component/logo/logo"


class Register extends Component{
    state={
        username:'',
        password:'',
        password2:'',
        telephone:'',
    }
    static propTypes={

    }

    register=()=>{
        console.log(this.state)
    }

    valueChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    toLogin=()=>{
        this.props.history.replace('/login')
    }


    render() {

        return (
            <div className="all">
                <div className="login">
                    <header className="site-header title">
                        <div className="container">
                            <div >
                                <div className="col-xs-4">
                                    <h1>高校招聘</h1>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div >
                        <div className="col-md-12">
                            <form className="container col-md-12">
                                <div className="form-group">
                                    <input type="text" className="form-control"  placeholder="用户名" name='username' onChange={this.valueChange}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control"  placeholder="密码" name='password' onChange={this.valueChange}/>
                                </div>
                                <div className="form-group">

                                    <input type="password" className="form-control"  placeholder="确认密码" name='password2' onChange={this.valueChange}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control"  placeholder="手机号" name='telephone' onChange={this.valueChange}/>
                                </div>

                                <p> 登录即同意</p>
                                <div className="form-group">
                                    <div className="col-sm-offset-1 col-sm-10">
                                        <button type="button" className="btn btn-info form-control" onClick={this.register}>注册</button>
                                    </div>

                                    <br/><br/>

                                    <div className="col-sm-offset-1 col-sm-10">
                                        <button type="button" className="btn btn-danger form-control" onClick={this.toLogin}>已有账号</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    state=>({comments:state}),
)(Register)
