import React,{Component} from 'react'
import PropTypes from 'prop-types'
//import addComment from "../../comment/comment-add/comment-add"
export  default class LoginUp extends Component{
    state={
        username:'',
        password:''
    }
    static propTypes={
        addComment:PropTypes.func.isRequired
    }
    loginUp=()=>{
        const account=this.state
        //this.props.addComment(account)
        this.props.history.push("/app")
        this.setState({
            username:'',
            password:''
        })
    }

    handleNameClick=(event)=>{
        const username=event.target.value
        this.setState({username})
    }

    handlePasswordClick=(event)=>{
        const password=event.target.value
        this.setState({password})
    }
    render() {
        const {username,password}=this.state
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

                    </div>

                    <p> 登录即同意</p>
                    <div className="form-group">
                        <div className="col-sm-offset-1 col-sm-10">
                            <button type="button" className="btn btn-info form-control" onClick={this.loginUp}>登录</button>
                        </div>

                        <br/><br/><br/>

                        <div className="col-sm-offset-1 col-sm-10">
                            <button type="button" className="btn btn-danger form-control" onClick={this.loginUp}>未有账号</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}