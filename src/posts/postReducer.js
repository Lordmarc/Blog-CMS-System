export const initialState = {
  allPosts: [],
  filters: [],
  posts: 0,
  published: 0,
  drafts: 0,
}

export function postsReducer(state, action){
  switch(action.type){
    case "SET_POSTS":
      return {...state, allPosts: action.payload.posts, filters: action.payload.posts, posts: action.payload.postsCount, published: action.payload.published, drafts: action.payload.drafts};
    case "ALL_POSTS":
      return {...state, filters: state.allPosts};
    case "PUBLISHED_POSTS":
      return {...state, filters: state.allPosts.filter(item => item.status !== "Draft") };
    case "DRAFTS_POSTS":
      return {...state, filters: state.allPosts.filter(item => item.status !== "Published")};

    default:
      return state;
  }
}