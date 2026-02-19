import { useState } from "react";
import api from "../api/axios";


export default function Comment({ comment, refreshComments}){


  const handleSubmit = async () => {
    if(!replyText) return;

    await api.post(`/v1/posts/${comment.post_id}/comments`)
  }


}