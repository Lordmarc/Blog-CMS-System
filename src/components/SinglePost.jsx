import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="max-w-4xl mx-auto px-4 py-10">
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
    </div>
  );
}
