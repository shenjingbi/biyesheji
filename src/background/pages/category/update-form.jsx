import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form, Input} from "antd";

const Item=Form.Item

//更新分类的Form组件
 class UpdateForm extends Component{
    static propTypes={
        categoryName:PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired,
        categoryContent:PropTypes.string
    }

    componentWillMount() {
        //将form对象通过setForm（）传给父对象
        this.props.setForm(this.props.form)
    }

     render() {
        const {categoryName,categoryContent}=this.props
        console.log(categoryName,categoryContent)
        const formItemLayout={
             labelCol:{span:4},
             wrapperCol:{span:15}
        }
        //得到form对象
        const {getFieldDecorator}=this.props.form
        return (
            <Form>
                <Item label='分类名：' {...formItemLayout}>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:categoryName,
                            rules:[
                                {required:true,message:"分类名称必须输入"}
                            ]
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                </Item>
                {categoryContent===undefined ?null:<Item label='详细：' {...formItemLayout}>
                    {
                        getFieldDecorator('categoryContent',{
                            initialValue:categoryContent,

                        })(
                            <Input.TextArea placeholder='请输入分类详细'/>
                        )
                    }
                </Item>}

            </Form>

        )
    }
}
export default Form.create()(UpdateForm)