import { takeEvery, put} from 'redux-saga/effects'
import {GET_MY_LIST} from "./actionTypes"
import axios from "axios"
import {getListAction} from "./actionCreaters"
// generators
function* mySaga(){
  yield takeEvery(GET_MY_LIST, getList)
  // 当GET_MY_LIST执行的时候，getList是自己写的
}

function* getList() {
  const res = yield axios.get('http://rap2api.taobao.org/app/mock/data/1810019')
  const action = getListAction(res.data)
  yield put(action)
}

export default mySaga;
