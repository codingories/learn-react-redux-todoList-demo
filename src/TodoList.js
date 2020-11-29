import React, {Component} from 'react';
import 'antd/dist/antd.css'
import {Button, Input, List} from 'antd'
import store from './store'
import { changeInputAction, addItemAction, deleteItemAction } from "./store/actionCreaters"

class TodoList extends Component {

  constructor(props){
    super(props)
    this.state = store.getState()
    store.subscribe(this.storeChange) // 每次dispatch 都会触发 subscribe中的函数调用
  }

  render() {
    return (
      <div style={{margin:'10px'}}>
        <div>
          <Input
            placeholder={this.state.inputValue}
            style={{ width:'250px', marginRight: '10px' }}
            onChange={(e)=>this.changeInputValue(e)}
            value={this.state.inputValue}
          />
          <Button type='primary' onClick={()=>{this.clickBtn()}}>增加</Button>
          <div style={{margin:'10px',width:'300px'}}>
            <List bordered
                  dataSource={this.state.list}
                  renderItem={(item, index)=>(<List.Item
                    onClick={()=>this.deleteItem(index)}
                  >{item}
                  </List.Item>)}
            />
          </div>
        </div>
      </div>
    );
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
