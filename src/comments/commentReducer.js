
export const initialState = {
  user: []
}

export default function commentReducer(state, action){
  switch(action.type){
    case "SET_USERS":
      return {...state, user: action.payload.user}

  }
}