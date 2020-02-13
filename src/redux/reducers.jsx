
import {combineReducers} from 'redux'
import {ADD_COMMENT, DELETE_COMMENT} from "./actions-types";

//comment
const initComments=[
    {username:'小李',content:'nihao'},
    {username: 'xiaowang',content:'buhao'}
]


  function comments(state=initComments,action) {
    switch (action.type) {
        case ADD_COMMENT:
            return  [action.data,...state]
        case DELETE_COMMENT:
            return state.filter((comment,index)=>index!==action.data)
        default:
            return state
    }
}

export default combineReducers({
    comments
})
