import React,{Component} from 'react'
import{Form,Select,Input} from "antd";

const Item=Form.Item
const Option=Select.Option
//添加分类的Form组件
 class AddForm extends Component{

    render() {
        //得到form对象
        const {getFieldDecorator}=this.props.form
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId',{
                            initialValue:'0'
                        })(
                            <Select>
                                <Option value='0' >一级分类</Option>
                                <Option value='1'>渔业</Option>
                                <Option value='2'>农业</Option>
                            </Select>
                        )
                    }

                </Item>
                <Item>
                    {
                        getFieldDecorator('parentId',{
                            initialValue:''
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                </Item>

            </Form>

        )
    }
}
export default Form.create()(AddForm)