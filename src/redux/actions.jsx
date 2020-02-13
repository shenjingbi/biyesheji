
import {ADD_COMMENT, DELETE_COMMENT,LOGIN_UP} from "./actions-types";

export const addComment=(comment)=>({type:ADD_COMMENT,data:comment})

export const deleteComment=(index)=>({type:DELETE_COMMENT,data:index})

export const loginUp=(account)=>({type:LOGIN_UP,data:account})