import React,{Component} from 'react'
import PropTypes from 'prop-types'
import{Form,Input} from "antd";
//import category from "./category";

const Item=Form.Item

//添加分类的Form组件
class AddForm extends Component{
    static  propTypes={
        setForm:PropTypes.func.isRequired,
    }
    componentWillMount() {
        //将form对象通过setForm（）传给父对象
        this.props.setForm(this.props.form)
    }
    render() {
        //得到form对象
        const {getFieldDecorator}=this.props.form
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('roleName',{
                            initialValue:'',
                            rules:[
                                {required:true,message:'角色名称必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入角色名称'/>
                        )
                    }
                </Item>
            </Form>

        )
    }
}
export default Form.create()(AddForm)