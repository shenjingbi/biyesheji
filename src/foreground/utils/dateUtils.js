/*
日期格式模块
* */

import moment from "moment";

export  function formateDate(time) {
    if(!time)return ''
    let date=new Date(time)
    return date.getFullYear()+"-"+(date.getMonth()+1)+'-'+date.getDate()
            +' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
}
export  function formateDate2(time) {
    if(!time)return ''
    let date=new Date(time)
    return date.getFullYear()+"-"+(date.getMonth()+1>10?null:'0')+(date.getMonth()+1)+'-'+(date.getDate()>10?null:'0')+date.getDate()
}