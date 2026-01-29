import { createContext, useEffect, useReducer } from "react";
import { initialState, postsReducer } from "./postReducer";
import api from "../api/axios";

export const PostContext = createContext();

export default function PostProvider({ children }){
  const [state, dispatch] = useReducer(postsReducer, initialState);

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const res = await api.get('v1/posts');

        dispatch({ type: "SET_POSTS", payload: res.data });
      }catch(err){
        console.error("Failed to fetched posts.")
      }
    }
    fetchPosts();
   
  },[]);
  return(
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  )
}