import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import api from "../api/axios";

dayjs.extend(relativeTime);

export default function UserComment({ comment, refreshComments }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const male = "/assets/male.png";
  const female = "/assets/female.jpg";

  const submitReply = async () => {
    if (!replyText.trim()) return;

    try {
      await api.post(`/v1/posts/${comment.post_id}/comment`, {
        comment: replyText,
        parent_id: comment.id,
      });

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
          src={comment.user?.gender === "male" ? male : female}
        />
      </div>

      <div className="flex flex-col w-full">
        {/* Comment header */}
        <div className="flex gap-2 items-center w-full">
          <p className="text-lg font-semibold">
            {comment.user.name.charAt(0).toUpperCase() + comment.user.name.slice(1)}
          </p>
          <span className="text-gray-500">{dayjs(comment.created_at).fromNow()}</span>
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
              <UserComment key={reply.id} comment={reply} refreshComments={refreshComments} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
