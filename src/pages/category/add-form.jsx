import React,{Component} from 'react'
import PropTypes from 'prop-types'
import{Form,Input} from "antd";
//import category from "./category";

const Item=Form.Item

//添加分类的Form组件
 class AddForm extends Component{
    static  propTypes={
        categorys: PropTypes.array.isRequired,
        parentId:PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired,
    }
     componentWillMount() {
         //将form对象通过setForm（）传给父对象
         this.props.setForm(this.props.form)
     }
    render() {
        const {categorys,parentId}=this.props
        //得到form对象
        const {getFieldDecorator}=this.props.form

        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId',{
                            initialValue:parentId,
                        })(
                            <span>{
                                parentId==='0'?"一级分类":categorys.map((c)=>{
                                    if(c.profeId===parentId){
                                        return c.profetype
                                    }
                                })
                            } :
                            </span>
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:'',
                            rules:[
                                {required:true,message:'分类名称必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                </Item>
                {parentId==='0' ?(<Item >
                    {
                        getFieldDecorator('categoryId',{
                            initialValue:'',
                            rules:[
                                {required:true,message:"分类编号必须输入"}
                            ]
                        })(
                            <Input placeholder='请输入分类编号'/>
                        )
                    }
                </Item>):(<Item >
                    {
                        getFieldDecorator('categoryContent',{
                            initialValue:'',
                        })(
                            <Input placeholder='请输入分类详细'/>
                        )
                    }
                </Item>)}

            </Form>

        )
    }
}
export default Form.create()(AddForm)