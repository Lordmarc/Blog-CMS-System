import { useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import api from "../api/axios";
import { IoSend } from "react-icons/io5";
import Breadcrumb from "./Breadcrumb";
import { AuthContext } from "../auth/AuthProvider";
import UserComment from "./UserComment";


export default function SinglePost() {
  const { state } = useContext(AuthContext);
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const textareaRef = useRef(null);
  const [comments, setComments] = useState([]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if(!state.user){
    console.warn("You must be logged in to comment");
    return;
  }

  if (!textareaRef.current.value.trim()) {
    console.warn("Cannot post empty comment");
    return;
  }

  const payload = {
    comment: textareaRef.current.value,
  };

  try {
    const res =  await api.post(`/v1/posts/${post.id}/comment`, payload)
    console.log("Comment posted:", res.data);

    // Optionally clear textarea after successful comment
    textareaRef.current.value = "";
  } catch (err) {
    console.error(
      "Failed to comment",
      err.response?.data || err.message || err
    );
  }
};




  console.log(post)
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Make the request to fetch the post using Axios
        const res = await api.get(`v1/posts/${slug}`);

        // Axios automatically checks status, no need for res.ok
        if (res.status !== 200) {
          throw new Error("Post not found");
        }

        setPost(res.data); // Axios returns data in 'data' field
      } catch (err) {
        setError(err.message); // Set the error if there is one
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchPost();
  }, [slug]);

  const handleInput = () => {
    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

    useEffect(() => {
  if (!post) return; // don't fetch until post exists

  const fetchUserComment = async () => {
    try {
      console.log("Fetching comments for post:", post.id); // debug
      const res = await api.get(`/v1/posts/${post.id}/comments`);
      console.log("Fetched comments:", res.data); // debug
      setComments(res.data);
    } catch(err){
      console.error("Failed to fetch comments:", err);
    }
  };

  fetchUserComment();
}, [post]); // run whenever post changes


    console.log("Comments to: ",comments)

  if (loading) {
    return <p className="text-center py-10">Loading post...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-6xl  mx-auto px-4 py-10">

      <Breadcrumb/>
      {/* Cover Image */}
      <img
        src={`${import.meta.env.VITE_BASE_URL}/storage/${post.image}`}
        alt={post.title}
        className="w-full h-96 object-cover rounded-lg"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mt-6">
        {post.title}
      </h1>

      {/* Author + Date */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
        <span>{post.user.name}</span>
        <span>•</span>
        <span>{formatDate(post.created_at)}</span>
      </div>

      {/* Content */}
      <div className="mt-6 text-gray-700 leading-relaxed whitespace-pre-line">
        {post.content}
      </div>

      <div className="comment w-full">
        <div className="flex gap-1">
          <h3>Comments</h3>
          <span>3</span>
        </div>

        <div className="flex flex-col w-full">
          <div className="bg-white rounded-md w-full flex flex-col p-4">
            <form onSubmit={handleSubmit}
              className="flex flex-col w-full bg-[#F5F2F2] p-2 rounded-md">
              <textarea placeholder="What's are your thoughts on this  architecture" 
                className="bg-transparent w-full p-2 rounded-md h-auto flex-wrap resize-none outline-none" 
                ref={textareaRef}
                rows={1}
                name="comment"
                onInput={handleInput}
                />
              <button type="submit" className="ml-auto text-gray-500">
        
                <IoSend/></button>
            </form>
       
          </div>
            <div className="comments min-w-full">
              {comments.map(c => (
                <UserComment key={c.id} comment={c.comment} gender={c.user.gender} name={c.user.name} />
              ))}
            </div>
        </div>
        
      </div>
    </div>
  );
}
