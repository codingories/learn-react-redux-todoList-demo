import React, {Component} from 'react';
import 'antd/dist/antd.css'
import store from './store'
import { changeInputAction, addItemAction, deleteItemAction, getListAction } from "./store/actionCreaters"
import TodoListUI from "./TodoListUI"
import axios from 'axios'

class TodoList extends Component {

  constructor(props){
    super(props)
    this.state = store.getState()
    store.subscribe(this.storeChange) // 每次dispatch 都会触发 subscribe中的函数调用
  }

  render() {
    return (
      <TodoListUI
        inputValue={this.state.inputValue}
        changeInputValue={this.changeInputValue}
        clickBtn={this.clickBtn}
        list={this.state.list}
        deleteItem={this.deleteItem}
      />
    );
  }

  componentDidMount() {
    axios.get('http://rap2api.taobao.org/app/mock/data/1810019').then((response)=>{
      console.log(response)
      const data = response.data
      const action = getListAction(data)
      store.dispatch(action)
    })
  }

  changeInputValue = (e) => {
    const action = changeInputAction(e.target.value)
    store.dispatch(action)
  }
  clickBtn = ()=>{
    const action = addItemAction()
    store.dispatch(action)
  }
  deleteItem = (index)=>{
    const action = deleteItemAction(index)
    store.dispatch(action) // 传递到store, reducer
  }
  storeChange = ()=>{
    this.setState(store.getState())
  }
}

export default TodoList;
