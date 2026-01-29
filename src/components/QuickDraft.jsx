import { useEffect, useState } from "react";
import api from "../api/axios";

export default function QuickDraft(){
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "Draft"
  });

    const handleChange = (e) => {
      const { name, value} = e.target;
      setFormData(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async(e) =>{
      e.preventDefault();

      try{
        const res = await api.post("/v1/posts", formData);
        setFormData({ title: "", content: "" });
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
          <input type="text" name="title" value={formData.title} placeholder="Draft Title" onChange={handleChange} />
        </div>

        <div className="input-field">
          <label htmlFor="content">CONTENT</label>
          <textarea name="content" value={formData.content} id="" placeholder="What's on your mind?" onChange={handleChange}></textarea>
        </div>

        <button type="submit">Save Draft</button>
      </form>
    </div>
  );
}