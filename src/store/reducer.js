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
