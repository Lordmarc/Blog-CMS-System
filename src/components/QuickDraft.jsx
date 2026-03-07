import { useContext, useRef } from "react";
import api from "../api/axios";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../auth/AuthProvider";

export default function QuickDraft(){
  const { state } = useContext(AuthContext);
  const titleRef = useRef(null);
  const contentRef= useRef(null);

    

    const handleSubmit = async(e) =>{
      e.preventDefault();
      
      try{

      const slug = titleRef.current.value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")   // remove special characters
      .replace(/\s+/g, "-")            // spaces to dashes
      .replace(/-+/g, "-");    
        
        const { data:postData, error } = await supabase
        .from("posts")
        .insert([
          {
            user_id: state.user.id,
            title: titleRef.current.value.trim(),
            content: contentRef.current.value.trim(),
            status: "Draft",
            slug: slug,
          }
        ]).select().single();

        await supabase
        .from('activity_logs')
        .insert([
          {
            type: "Post",
            action: "Draft",
            description: titleRef.current.value.trim(),
            user_id: state.user.id,
            meta: {
              post_id: postData.id
            }
          }
        ])
        
        titleRef.current.value = "";
        contentRef.current.value = "";
      }catch(err){
        console.error("Failed to save draft.", err);
      }

      
    }


  return(
    <div className="quick-draft">
      <h2>Quick Draft</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="title">TITLE</label>
          <input type="text" name="title"  ref={titleRef} placeholder="Draft Title"  />
        </div>

        <div className="input-field">
          <label htmlFor="content">CONTENT</label>
          <textarea name="content" ref={contentRef} id="" placeholder="What's on your mind?"></textarea>
        </div>

        <button type="submit">Save Draft</button>
      </form>
    </div>
  );
}