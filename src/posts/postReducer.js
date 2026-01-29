export const initialState = {
  posts: 0,
  published: 0,
  drafts: 0,
}

export function postsReducer(state, action){
  switch(action.type){
    case "SET_POSTS":
      return {...state, posts: action.payload.postsCount, published: action.payload.published, drafts: action.payload.drafts};
    default:
      return state;
  }
}