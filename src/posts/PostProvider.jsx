import { createContext, useEffect, useReducer } from "react";
import { initialState, postsReducer } from "./postReducer";

import { supabase } from "../lib/supabase";

export const PostContext = createContext();

export default function PostProvider({ children }){
  const [state, dispatch] = useReducer(postsReducer, initialState);

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const { data, error } = await supabase
        .from("posts")
        .select(`*,
          user:user_id(
          id,
          name,
          gender)`)
        .order("created_at", {ascending: false});

        if(error) throw error;

        const published = data.filter(p => p.status !== "Draft").length;
        const drafts = data.filter(p => p.status === "Draft").length;

        dispatch({ 
          type: "SET_POSTS",
          payload: {
            posts: data,
            postsCount: data.length,
            published,
            drafts
          } });
      }catch(err){
          console.error("Failed to fetch posts:", err.message);
      }
    }
    fetchPosts();
    
  
  },[]);

  console.log("State data:", state)
  return(
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  )
}