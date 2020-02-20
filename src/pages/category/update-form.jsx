import React,{Component} from 'react'
import PropTypes from 'prop-types'
import{Form,Select,Input} from "antd";

const Item=Form.Item
const Option=Select.Option
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
        //得到form对象
        const {getFieldDecorator}=this.props.form
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:categoryName
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                </Item>
                {categoryContent===undefined ?null:<Item >
                    {
                        getFieldDecorator('categoryContent',{
                            initialValue:categoryContent
                        })(
                            <Input placeholder='请输入分类详细'/>
                        )
                    }
                </Item>}

            </Form>

        )
    }
}
export default Form.create()(UpdateForm)