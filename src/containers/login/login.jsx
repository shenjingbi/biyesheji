import React,{Component} from 'react'
//import PropTypes from 'prop-types'
import {connect} from "react-redux";
import "./login.css"

class Login extends Component{
    state={
        username:'',
        password:'',

    }

    register=()=>{
        console.log(this.state)
    }

    valueChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    toRegister=()=>{
        this.props.history.replace('/register')
    }

    render() {

        return (
            <div className="all">
                <div className="login">
                    <header className="site-header title">
                        <div className="container">

                                <div className="col-xs-4">
                                    <h1>高校招聘</h1>
                                </div>
                        </div>
                    </header>
                    <div >
                        <div className="match">
                            <h4>账号密码登录</h4>
                        </div>
                        <hr/>
                        <div className="col-md-12">
                            <form className="container col-md-12">
                                <div className="form-group">
                                    <input type="text" className="form-control"  placeholder="用户名" name="username" onChange={this.valueChange}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control"  placeholder="密码" name="password" onChange={this.valueChange}/>
                                </div>
                                <div className="form-group">

                                </div>

                                <p> 登录即同意</p>
                                <div className="form-group">
                                    <div className="col-sm-offset-1 col-sm-10">
                                        <button type="button" className="btn btn-info form-control" onClick={this.Login}>登录</button>
                                    </div>

                                    <br/><br/><br/>

                                    <div className="col-sm-offset-1 col-sm-10">
                                        <button type="button" className="btn btn-danger form-control" onClick={this.toRegister}>未有账号</button>
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

)(Login)
