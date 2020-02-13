import React,{Component} from 'react'
import PropTypes from 'prop-types'
//import "../../../containers/app/app"
export  default class RegisterUp extends Component{
    state={
        username:'',
        password:'',
        password2:''
    }
    static propTypes={

    }
    loginUp=()=>{
        const param={}
        //this.props.addComment(account)
        //window.location.href="../../../containers/app/app"
        this.props.history.push('../../../containers/app/app')
    }

    handleNameClick=(event)=>{
        const username=event.target.value
        this.setState({username})
    }

    handlePasswordClick=(event)=>{
        const password=event.target.value
        this.setState({password})
    }
    handlePasswordClick2=(event)=>{
        const password2=event.target.value
        this.setState({password2})
    }
    render() {
        const {username,password,password2}=this.state
        return (
            <div className="col-md-12">
                <form className="container col-md-12">
                    <div className="form-group">
                        <input type="text" className="form-control"  placeholder="用户名" value={username}onChange={this.handleNameClick}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control"  placeholder="密码" value={password}onChange={this.handlePasswordClick}/>
                    </div>
                    <div className="form-group">

                        <input type="password" className="form-control"  placeholder="确认密码" value={password2}onChange={this.handlePasswordClick2}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control"  placeholder="手机号" value={password2}onChange={this.handlePasswordClick2}/>
                    </div>

                    <p> 登录即同意</p>
                    <div className="form-group">
                        <div className="col-sm-offset-1 col-sm-10">
                            <button type="button" className="btn btn-info form-control" onClick={this.loginUp}>注册</button>
                        </div>

                        <br/><br/>

                        <div className="col-sm-offset-1 col-sm-10">
                            <button type="button" className="btn btn-danger form-control" onClick={this.loginUp}>已有账号</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}