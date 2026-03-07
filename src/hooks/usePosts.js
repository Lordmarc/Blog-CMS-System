import { useEffect, useReducer } from "react";
import { initialState, postsReducer } from "../posts/postReducer";
import { supabase } from "../lib/supabase";

export function usePosts(){
  const [ state, dispatch ] = useReducer(postsReducer, initialState);

  const fetchPosts = async () => {

    try{
          const { data, error } = await supabase
    .from('posts')
    .select(`*,
      user:user_id(
      id,name,avatar)`)
    .order("created_at", {ascending:false})

    if(error) throw error;

    const published = data.filter(p => p.status !== "Draft").length;
    const drafts = data.filter(p => p.status === "Draft").length;

    dispatch({
      type: "SET_POSTS",
      payload:{
        posts: data,
        postsCount: data.length,
        published,
        drafts
      }
    })
    }catch(err)
    {
      console.error("Failed to fetch posts:", err)
    }

  }

  useEffect(() => {
    fetchPosts();
  },[])

  return { state, dispatch, fetchPosts }
}