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
- 图4
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
- 把仓库管理员reducer放入仓库
```javascript
import {createStore} from 'redux'
import reducer from "./reducer"
const store = createStore(reducer)
export default store
```
- 把数据放入store,并通过console验证组件获取到store的值
- reducer.js
```javascript
const defaultState = {
  inputValue : 'Write Something',
  list: [
    '早10点开晨会','早11点写代码','下午4点开新需求评审会'
  ]
}
export default (state = defaultState, action)=>{
  return state
}
```
- TodoList.js
```javascript
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
```
- 把store的数据渲染出来,替换掉以前的写死的数据

```jsx
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

export default TodoList
```

6. 安装Redux_Dev_Tools
- chrome插件商店，科学上网，并配置好
- 成功后见图5

7. 通过Input体验Redux的流程
- 建立action链接并且在reducer里处理逻辑
// todoList.js
```jsx
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

```

- reducer.js

```javascript
const defaultState = {
  inputValue : 'Write Something',
  list: [
    '早10点开晨会','早11点写代码','下午4点开新需求评审会'
  ]
}
export default (state = defaultState, action)=>{
  console.log(state, action)
  // Reducer里面只能接手state，不能改变state
  if(action.type==='changeInput'){
    let newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }
  return state
}
```

- 加入订阅redux事件
```jsx
class TodoList extends Component {

  constructor(props){
    super(props)
    this.state = store.getState()
    store.subscribe(this.storeChange)
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
  changeInputValue = (e) => {
    const action = {
      type: 'changeInput',
      value: e.target.value
    } // 建立action
    store.dispatch(action)
  }
  storeChange = ()=>{
    this.setState(store.getState())
  }
}

export default TodoList;

```

8. Redux制作ToDoList列表
- 实现增加item
- reducer.js
```js
const defaultState = {
  inputValue : 'Write Something',
  list: [
    '早10点开晨会','早11点写代码','下午4点开新需求评审会'
  ]
}
export default (state = defaultState, action)=>{
  // console.log(state, action)
  // Reducer里面只能接手state，不能改变state
  if(action.type==='changeInput'){
    let newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }
  if(action.type==='addItem'){
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
  return state
}
```
- todoList.js
```jsx
import React, {Component} from 'react';
import 'antd/dist/antd.css'
import {Button, Input, List} from 'antd'
import store from './store'

class TodoList extends Component {

  constructor(props){
    super(props)
    this.state = store.getState()
    store.subscribe(this.storeChange)
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
                  renderItem={item=>(<List.Item>{item}</List.Item>)}
            />
          </div>
        </div>
      </div>
    );
  }
  changeInputValue = (e) => {
    const action = {
      type: 'changeInput',
      value: e.target.value
    } // 建立action
    store.dispatch(action)
  }
  storeChange = ()=>{
    this.setState(store.getState())
  }
  clickBtn = ()=>{
    const action = {
      type: 'addItem'
    }
    store.dispatch(action)
  }
}

export default TodoList;
```

9. 用Redux实现ToDoList的删除功能
- todoList.js
```js
class TodoList extends Component {

  constructor(props){
    super(props)
    this.state = store.getState()
    store.subscribe(this.storeChange)
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
    const action = {
      type: 'changeInput',
      value: e.target.value
    } // 建立action
    store.dispatch(action)
  }
  storeChange = ()=>{
    this.setState(store.getState())
  }
  clickBtn = ()=>{
    const action = {
      type: 'addItem'
    }
    store.dispatch(action)
  }
  deleteItem = (index)=>{
    const action = {
      type: 'deleteItem',
      index
    }
    store.dispatch(action) // 传递到store, reducer
  }
}

export default TodoList;

```

- reducer.js

```js
const defaultState = {
  inputValue : 'Write Something',
  list: [
    '早10点开晨会','早11点写代码','下午4点开新需求评审会'
  ]
}

const x = (state = defaultState, action)=>{
  // Reducer里面只能接手state，不能改变state
  if(action.type==='changeInput'){
    let newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }
  if(action.type==='addItem'){
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
  if(action.type==='deleteItem'){
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1);
    return newState
  }
  return state
}


export default x

```

10. 工作中写Redux的小技巧1
- 将action type的type抽离到公共的actionTypes.js
```js
// actionTypes.js 
export const CHANGE_INPUT = 'changeInput'
export const ADD_ITEM = 'addItem'
export const DELETE_ITEM = 'deleteItem'
```
- reducer.js
```js
import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from './actionTypes'

const defaultState = {
  inputValue : 'Write Something',
  list: [
    '早10点开晨会','早11点写代码','下午4点开新需求评审会'
  ]
}

const x = (state = defaultState, action)=>{
  // Reducer里面只能接手state，不能改变state
  if(action.type===CHANGE_INPUT){
    let newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }
  if(action.type===ADD_ITEM){
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
  if(action.type===DELETE_ITEM){
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1);
    return newState
  }
  return state
}


export default x
```
- todoList.js
```js
import React, {Component} from 'react';
import 'antd/dist/antd.css'
import {Button, Input, List} from 'antd'
import store from './store'
import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from './store/actionTypes'

class TodoList extends Component {

  constructor(props){
    super(props)
    this.state = store.getState()
    store.subscribe(this.storeChange)
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
    const action = {
      type: CHANGE_INPUT,
      value: e.target.value
    } // 建立action
    store.dispatch(action)
  }
  clickBtn = ()=>{
    const action = {
      type: ADD_ITEM
    }
    store.dispatch(action)
  }
  deleteItem = (index)=>{
    const action = {
      type: DELETE_ITEM,
      index
    }
    store.dispatch(action) // 传递到store, reducer
  }
  storeChange = ()=>{
    this.setState(store.getState())
  }
}

export default TodoList;
```

11. 工作中写Redux的小技巧2
- 将所有的action放到actionCreaters文件中
```js
// actionCreaters.js
import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from "./actionTypes"

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
```
- todoList.js
```js
import React, {Component} from 'react';
import 'antd/dist/antd.css'
import {Button, Input, List} from 'antd'
import store from './store'
import { changeInputAction, addItemAction, deleteItemAction } from "./store/actionCreaters"

class TodoList extends Component {

  constructor(props){
    super(props)
    this.state = store.getState()
    store.subscribe(this.storeChange)
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
```

12. Redux中常遇的三个小坑
- store必须是唯一的
- 只有store能改变内容，Reducer不能改变
- Reducer必须是纯函数，即返回的结果由参数决定

13. 组件UI和业务逻辑的拆分
- 通过redux将UI和业务逻辑做分离

14. Redux中的无状态组件使用
- 无状态组件其实就是一个函数,能提升性能
- 将TodoListUI普通UI组件改写成无状态组件
```jsx
import React from 'react';
import {Button, Input, List} from "antd"

const TodoListUI = (props)=>{
  return (
    <div style={{margin:'10px'}}>
      <div>
        <Input
          placeholder={props.inputValue}
          style={{ width:'250px', marginRight: '10px' }}
          onChange={props.changeInputValue}
          value={props.inputValue}
        />
        <Button type='primary' onClick={()=>{props.clickBtn()}}>增加</Button>
        <div style={{margin:'10px',width:'300px'}}>
          <List bordered
                dataSource={props.list}
                renderItem={(item, index)=>(<List.Item
                  onClick={()=>props.deleteItem(index)}
                >
                  {item}
                </List.Item>)}
          />
        </div>
      </div>
    </div>
  );
}

export default TodoListUI;
```

15. Axios异步获取数据并和Redux结合
- 从服务器获取数据渲染列表
```jsx
// todoList.js
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
```
- reducer.js
```js
import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM, GET_LIST } from './actionTypes'

const defaultState = {
  inputValue : 'Write Something',
  list: []
}

const x = (state = defaultState, action)=>{
  // 此处必须是纯函数，即返回的结果由参数决定
  // Reducer里面只能接手state，不能改变state
  if(action.type===CHANGE_INPUT){
    let newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState // 返回给store仓库
  }
  if(action.type===ADD_ITEM){
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
  if(action.type===DELETE_ITEM){
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1);
    return newState
  }
  if(action.type===GET_LIST){
    let newState = JSON.parse(JSON.stringify(state))
    newState.list = action.data.data.list
    return newState
  }
  return state
}


export default x

```

16. Redux-thunk中间件的安装和配置
- 见图
- 日志记录，崩溃报告可以放在中间件里
- 请求不建议放到中间件
- 利用compose同时配置redux开发者工具和中间件thunk
```js
// index.js
import {createStore, applyMiddleware, compose} from 'redux'
import reducer from "./reducer"
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(
  reducer,
  enhancer
)
export default store
```
