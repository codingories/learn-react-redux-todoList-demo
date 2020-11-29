import React, {Component} from 'react';
import 'antd/dist/antd.css'
import {Button, Input, List} from 'antd'
import store from './store'

class TodoList extends Component {

  constructor(props){
    super(props)
    console.log('fuck', store.getState())
  }

  render() {
    return (
      <div style={{margin:'10px'}}>
        <div>
          <Input placeholder='Write Something' style={{ width:'250px', marginRight: '10px' }}/>
          <Button type='primary'>增加</Button>
          <div style={{margin:'10px',width:'300px'}}>
            <List border
                  dataSource={[]}
                  renderItem={item=>(<List.Item>{item}</List.Item>)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
