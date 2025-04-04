import { Heart, MessageCircle, ThumbsDown } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/storeContext";
import { useNavigate, Link } from "react-router-dom";
import Comment from "../Comment/Comment";

const Content = () => {
  const {
    showAllPost,
    fetchAllPosts,
    getDaysAgo,
    createLike,
    getLikeCount,
    likesCount,
  } = useContext(StoreContext);

  const [openCommentPostId, setOpenCommentPostId] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [dislikedPosts, setDislikedPosts] = useState({});

  const navigate = useNavigate();

  const handleLike = (post_id) => {
    setLikedPosts((prev) => ({
      ...prev,
      [post_id]: !prev[post_id], // Toggle like state
    }));

    setDislikedPosts((prev) => ({
      ...prev,
      [post_id]: false, // Reset dislike if liked
    }));

    createLike(post_id, "LIKE");
    getLikeCount(post_id);
  };

  const handleDislike = (post_id) => {
    setDislikedPosts((prev) => ({
      ...prev,
      [post_id]: !prev[post_id], // Toggle dislike state
    }));

    setLikedPosts((prev) => ({
      ...prev,
      [post_id]: false, // Reset like if disliked
    }));

    createLike(post_id, "DISLIKE");
    getLikeCount(post_id);
  };

  useEffect(() => {
    if (!showAllPost) {
      fetchAllPosts();
    }
  }, [showAllPost, fetchAllPosts]);

  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col gap-4 bg-zinc-100 p-4 md:p-8 dark:bg-zinc-900">
      {/* Projects */}
      {showAllPost &&
        showAllPost.map((project) => (
          <div
            key={project.id}
            className="mx-auto max-w-5xl w-[100%] overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-zinc-800"
          >
            <div className="flex flex-col md:flex-row relative">
              {/* Left Section */}
              <section className="w-full md:w-[55%] p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-7 w-7 sm:h-10 sm:w-10 shrink-0">
                    <div
                      className="h-full w-full flex justify-center items-center text-white bg-blue-500 rounded-full text-2xl font-bold object-cover ring-2 ring-white dark:ring-zinc-700 cursor-pointer"
                      onClick={() =>
                        navigate(`/personalProjects/${project.user_id}`)
                      }
                    >
                      {project.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                  <Link
                  to={`/projectDetail/${project.id}`}
                  className="h-64 md:h-80 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-700 cursor-pointer flex items-stretch"
                  >
                 <img
                 src={project.image_url}
                 alt="Project Preview"
                 className="h-full w-full object-cover rounded-lg"
                 />
                 </Link>
                  </div>
                </div>
              </section>

              {/* Right Section */}
              <section className="w-full md:w-[45%] border-t md:border-l md:border-t-0 border-zinc-200 dark:border-zinc-700 p-6">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                      {project.title}
                    </h1>
                    <p className="text-zinc-500 text-sm">{project.type}</p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      Posted by {project.user?.name} •{" "}
                      {getDaysAgo(project.created_at)}
                    </p>
                  </div>

                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {project.description.split(" ").slice(0, 25).join(" ")}
                    {project.description.split(" ").length > 25 ? "..." : ""}
                  </p>

                  <div className="h-px bg-zinc-200 dark:bg-zinc-700" />

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between gap-2 w-full flex-nowrap overflow-hidden">
                    <div className="flex flex-col justify-center items-center">
                      <button
                        className="flex items-center gap-1 rounded-lg px-1 md:px-2 py-1 text-xs md:text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700 shrink-0"
                        onClick={() => handleLike(project.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            likedPosts[project.id] ? "fill-blue-500" : "fill-none"
                          }`}
                        />
                        <span className="hidden sm:block">Like</span>
                      </button>
                      <p className="text-white underline">
                        {likesCount[project.id]?.likes || 0}
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                      <button
                        className="flex items-center gap-1 rounded-lg px-1 md:px-2 py-1 text-xs md:text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700 shrink-0"
                        onClick={() => handleDislike(project.id)}
                      >
                        <ThumbsDown
                          className={`h-4 w-4 ${
                            dislikedPosts[project.id] ? "fill-blue-500" : "fill-none"
                          }`}
                        />
                        <span className="hidden sm:block">Dislike</span>
                      </button>
                      <p className="text-white underline">
                        {likesCount[project.id]?.dislikes || 0}
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                      <button
                        onClick={() =>
                          setOpenCommentPostId(
                            openCommentPostId === project.id ? null : project.id
                          )
                        }
                        className="flex items-center gap-1 rounded-lg px-1 md:px-2 py-1 text-xs md:text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700 shrink-0"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="hidden sm:block">Comment</span>
                      </button>
                      <p className="text-white underline">
                        {project.comment_count} comments
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {openCommentPostId === project.id && (
              <Comment
                isOpen={true}
                onClose={() => setOpenCommentPostId(null)}
                comments={project.comment || []}
                post_id={project.id}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default Content;