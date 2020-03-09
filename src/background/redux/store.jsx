/*
redux最核心的管理对象：store
* */
import {createStore,applyMiddleware} from "redux";
import thunk from 'redux-thunk' //用来实现redux异步的中间件
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from "./reducers";



export default createStore(
    reducers,composeWithDevTools(applyMiddleware(thunk))
)