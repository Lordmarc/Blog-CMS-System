import { createContext, useEffect, useReducer } from "react";
import { initialState, postsReducer } from "./postReducer";

import { supabase } from "../lib/supabase";
import { usePosts } from "../hooks/usePosts";

export const PostContext = createContext();

export default function PostProvider({ children }){
  const { state, dispatch, fetchPosts } = usePosts();




  return(
    <PostContext.Provider value={{ state, dispatch, fetchPosts }}>
      {children}
    </PostContext.Provider>
  )
}