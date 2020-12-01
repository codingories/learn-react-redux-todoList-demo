import React, {Component} from 'react';
import 'antd/dist/antd.css'
import store from './store'
import { getMyListAction, changeInputAction, addItemAction, deleteItemAction } from "./store/actionCreaters"
import TodoListUI from "./TodoListUI"

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
    const action = getMyListAction()
    store.dispatch(action)
    // console.log('fuck', action)
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
