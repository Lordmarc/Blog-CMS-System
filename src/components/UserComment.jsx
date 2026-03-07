import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import api from "../api/axios";
import { supabase } from "../lib/supabase";

dayjs.extend(relativeTime);
dayjs.extend(utc);

export default function UserComment({ comment, refreshComments, state, post }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const male = "/assets/male.png";
  const female = "/assets/female.jpg";

  const submitReply = async () => {

    if(!state.isAuthenticated) return alert('Login first to comment');
    if (!replyText.trim()) return;

    try {
      const { error } = await supabase
      .from('comments')
      .insert([
        {
          post_id: post.id,
          user_id: state.user.id,
          parent_id: comment.parent_id ?? comment.id,
          comment: replyText
        }
      ]);

      setReplyText("");
      setShowReply(false);
      refreshComments(); // Refresh comments after reply
    } catch (err) {
      console.error("Failed to post reply:", err.response?.data || err.message);
    }


  };

  return (
    <div className="user-comment flex gap-4">
      <div className="rounded-full h-8 w-8 overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={comment.user?.avatar}
        />
      </div>

      <div className="flex flex-col w-full">
        {/* Comment header */}
        <div className="flex gap-2 items-center w-full">
          <p className="text-lg font-semibold">
            {comment.user.name.charAt(0).toUpperCase() + comment.user.name.slice(1)}
          </p>
          <span className="text-gray-500">{dayjs.utc(comment.created_at).local().fromNow()}</span>

        </div>

        {/* Comment body */}
        <textarea
          className="bg-transparent w-full resize-none"
          disabled
          value={comment.comment}
        />

        {/* Reply button */}
        <div className="mt-1">
          <span
            className="text-sm text-blue-600 cursor-pointer"
            onClick={() => setShowReply(!showReply)}
          >
            Reply
          </span>
        </div>

        {/* Reply form */}
        {showReply && (
          <div className="ml-4 mt-2 flex flex-col gap-1">
            <textarea
              className="w-full p-2 border rounded"
              rows={2}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
            />
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={submitReply}
              >
                Send
              </button>
              <button
                className="px-3 py-1 border rounded"
                onClick={() => setShowReply(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Nested replies */}
        {comment.replies?.length > 0 && (
          <div className="ml-6 border-l pl-4 mt-2 flex flex-col gap-2">
            {comment.replies.map((reply) => (
              <UserComment key={reply.id} comment={reply} refreshComments={refreshComments} post={post} state={state}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
