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
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const textareaRef = useRef(null);

  // Format date nicely
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // Fetch post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`v1/posts/${slug}`);
        setPost(res.data);
      } catch (err) {
        setError(err.message || "Post not found");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Fetch comments
  const fetchComments = async () => {
    if (!post) return;
    try {
      const res = await api.get(`/v1/posts/${post.id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post]);

  // Handle new top-level comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.user) return console.warn("You must be logged in to comment");
    if (!textareaRef.current.value.trim()) return console.warn("Cannot post empty comment");

    try {
      await api.post(`/v1/posts/${post.id}/comment`, {
        comment: textareaRef.current.value,
      });

      textareaRef.current.value = "";
      fetchComments(); // Refresh after posting
    } catch (err) {
      console.error("Failed to post comment:", err.response?.data || err.message);
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  if (loading) return <p className="text-center py-10">Loading post...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumb />

      {/* Cover Image */}
      <img
        src={`${import.meta.env.VITE_BASE_URL}/storage/${post.image}`}
        alt={post.title}
        className="w-full h-96 object-cover rounded-lg"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mt-6">{post.title}</h1>

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

      {/* Comments Section */}
      <div className="comment w-full mt-8">
        <h3 className="mb-2">Comments</h3>

        {/* New Comment Form */}
        <div className="bg-white rounded-md p-4 mb-4">
          <form onSubmit={handleSubmit} className="flex gap-2 flex-col bg-[#F5F2F2] p-2 rounded-md">
            <textarea
              placeholder="What's your thoughts on this architecture?"
              className="bg-transparent w-full p-2 rounded-md h-auto flex-wrap resize-none outline-none"
              ref={textareaRef}
              rows={1}
              onInput={handleInput}
            />
            <button type="submit" className="ml-auto text-gray-500">
              <IoSend size={20} />
            </button>
          </form>
        </div>

        {/* Comments List */}
        <div className="comments flex flex-col gap-4">
          {comments.map((c) => (
            <UserComment key={c.id} comment={c} refreshComments={fetchComments} />
          ))}
        </div>
      </div>
    </div>
  );
}
