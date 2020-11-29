import React, {Component} from 'react';
import 'antd/dist/antd.css'
import {Button, Input, List} from 'antd'

const data = ['早10点开晨会','早11点写代码','下午4点开新需求评审会']

class TodoList extends Component {
  render() {
    return (
      <div style={{margin:'10px'}}>
        <div>
          <Input placeholder='Write Something' style={{ width:'250px', marginRight: '10px' }}/>
          <Button type='primary'>增加</Button>
          <div style={{margin:'10px',width:'300px'}}>
            <List border
                  dataSource={data}
                  renderItem={item=>(<List.Item>{item}</List.Item>)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
