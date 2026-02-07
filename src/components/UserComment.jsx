import { useEffect, useState } from "react";
import api from "../api/axios";

export default function UserComment({ comment,gender,name }){

    const male = "/assets/male.png";
    const female = "/assets/female.jpg";

    
  const handleInput = () => {
    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  return(
    <div className="user-comment">
      <div className="rounded-full h-12 w-12 overflow-hidden">
        {gender === "male" ? (
          <img className="h-full" src={male} />
        ): (<img className="w-full" src={female}/>)}
      </div>
      <div>
        <p>{name}</p>
        <textarea 
          className="bg-transparent w-full resize-none"
          onInput={handleInput} disabled>{comment}</textarea>
      </div>

    </div>
  );
}