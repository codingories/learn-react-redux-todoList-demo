import React, {Component} from 'react';
import 'antd/dist/antd.css'
import {Button, Input, List} from 'antd'
import store from './store'

class TodoList extends Component {

  constructor(props){
    super(props)
    this.state = store.getState()
  }

  render() {
    return (
      <div style={{margin:'10px'}}>
        <div>
          <Input
            placeholder={this.state.inputValue}
            style={{ width:'250px', marginRight: '10px' }}
            onChange={(e)=>this.changeInputValue(e)}
          />
          <Button type='primary'>增加</Button>
          <div style={{margin:'10px',width:'300px'}}>
            <List bordered
                  dataSource={this.state.list}
                  renderItem={item=>(<List.Item>{item}</List.Item>)}
            />
          </div>
        </div>
      </div>
    );
  }
  changeInputValue(e){
    const action = {
      type: 'changeInput',
      value: e.target.value
    } // 建立action
    store.dispatch(action)
  }
}

export default TodoList;
