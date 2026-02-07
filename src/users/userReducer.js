export const initialState = {

  totalUsers: 0,
  activeUsers: 0,
};

export function userReducer(state, action){
  switch(action.type){
    case "SET_USERS":
      return {...state, totalUsers: action.payload.totalUsers, activeUsers: action.payload.activeUsers};
    case "INCREMENT_USER":
      return {...state, totalUser: state.totalUsers + 1};
    default:
      return state;
  }
}