import { Send, X } from "lucide-react";
import { use, useContext, useState } from "react";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Comment = ({ isOpen, onClose, post_id }) => {
  const { getDaysAgo, handleCommentSubmit, comment, setComment,getComment,
    showComment} =
    useContext(StoreContext);

  if (!isOpen) return null;
  if(isOpen){
    getComment(post_id);
  }
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-xl animate-in fade-in duration-200">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Comments
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-full transition-colors"
            aria-label="Close comments"
          >
            <X className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
          </button>
        </div>

        {/* Display Comments */}
        <div className="p-4 overflow-y-auto max-h-[60vh] space-y-6">
          {showComment.length > 0 ? (
            showComment.map((comment) => (
              <div key={comment.id} className="flex gap-4 group">
                <div
                  className="h-8 w-8 flex justify-center items-center text-white bg-blue-500 rounded-full text-2xl font-bold object-cover ring-2 ring-white dark:ring-zinc-700 cursor-pointer"
                  onClick={() =>
                    navigate(`/personalProjects/${comment.user_id}`)
                  }
                >
                  {comment.user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-zinc-900 dark:text-white">
                      {comment.user?.name}
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {getDaysAgo(comment.created_at) || "A moment ago"}
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 mt-1">
                    {comment.comment}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>

        {/* Comment Input */}
        <form
          onSubmit={(e)=>handleCommentSubmit(e,post_id)}
          className="p-4 border-t border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50"
        >
          <div className="flex gap-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-zinc-100 dark:bg-zinc-700 border-0 rounded-lg px-4 py-2 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!comment.trim()}
            >
              <Send className="h-4 w-4" />
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comment;