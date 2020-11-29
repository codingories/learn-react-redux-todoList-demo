# 视频地址,https://www.bilibili.com/video/BV1w441137ss?p=1
1. redux基础模型
- 图1
- redux和flux
- redux是flux的升级版，flux过时，学会redux即可

2. redux工作流程讲解
- 官方图，理解起来比较复杂
- 图2
- 比喻成大保健流程方便理解
- 图3

3. AntDesign和开发环境初始化
- 为了不这么难看用于一下AntDesign
- 如果没装脚手架，先安装 create-react-app脚手架,`npm install -g create-react-app`
- 新建项目文件夹ReduxDemo,create-react-app demo01
- 删除无用的文件
- 安装ant-design,`npm install antd --save`

4. 用Ant Design制作UI界面
- 图四
- TodoList.js代码
```jsx
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
```
- index.js代码
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList'
ReactDOM.render(
    <TodoList />,
  document.getElementById('root')
);
```

5. 创建Redux中的仓库-store和reducer
- 安装redux, `npm install --save redux` 或者 `yarn add redux` 
- 新建src/store/index.js
```javascript
// index.js
import {createStore} from 'redux'
const store = createStore()
export default store
```
- 初始化最简单的仓库管理员reducer
```javascript
const defaultState = {}
export default (state = defaultState, action)=>{
  return state
}
```
