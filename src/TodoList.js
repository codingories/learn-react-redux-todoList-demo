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
          <Input placeholder={this.state.inputValue} style={{ width:'250px', marginRight: '10px' }}/>
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
}

export default TodoList;
