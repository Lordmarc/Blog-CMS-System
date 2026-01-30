import { useRef } from "react";
import api from "../api/axios";

export default function QuickDraft(){
  const titleRef = useRef(null);
  const contentRef= useRef(null);
  const statusRef = useRef("Draft");
    

    const handleSubmit = async(e) =>{
      e.preventDefault();
      
      const payload = {
        title: titleRef.current.value,
        content: contentRef.current.value,
        status: statusRef.current
      }

      try{
        const res = await api.post("/v1/posts", payload);
        
      }catch(err){
        console.error("Failed to save draft.", err);
      }

      titleRef.current.value = "";
      contentRef.current.value = "";
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