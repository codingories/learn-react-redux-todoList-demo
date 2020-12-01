import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM, GET_LIST, GET_MY_LIST } from "./actionTypes"
import axios from 'axios'


export const changeInputAction= (value) => ({
  type: CHANGE_INPUT,
  value
})

export const addItemAction= () => ({
  type: ADD_ITEM,
})

export const deleteItemAction= (index) => ({
  type: DELETE_ITEM,
  index
})


export const getListAction= (data) => ({
  type: GET_LIST,
  data
})

// 因为有thunk所以才能在actionCreators返回函数
export const getTodoList = ()=>{
  return (dispatch)=>{
    axios.get('http://rap2api.taobao.org/app/mock/data/1810019').then((response)=>{
      console.log(response)
      const data = response.data
      const action = getListAction(data)
      dispatch(action)
    })
  }
}


export const getMyListAction = ()=>({
  type: GET_MY_LIST
})
