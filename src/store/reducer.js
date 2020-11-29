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
