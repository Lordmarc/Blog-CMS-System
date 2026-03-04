export const initialState = {
activity: [],
}

export default function logsReducer(state, action){
  switch(action.type){
    case "SET_LOGS":
      return {...state, activity: action.payload};
    default:
      return state;
  }
}