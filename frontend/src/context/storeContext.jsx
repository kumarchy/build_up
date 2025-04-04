import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);
const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

const StoreContextProvider = (props) => {
  const [showPersonalPost, setShowPersonalPost] = useState([]);
  const [showAllPost, setShowAllPost] = useState("");
  const [likesCount, setLikesCount] = useState({});
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState([]);

  const url = "http://localhost:3000";
  // const url ="https://build-up-backend.onrender.com";

  const user = getStoredUser();
  
  // console.log("User from localStorage:", user.id);
  // Display user personal projectsz
  const showProjects = async (userId) => {
    try {
      const response = await axios.get(`${url}/api/post/${userId}`);
      if (Array.isArray(response.data.data)) {
        setShowPersonalPost(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Display all projects projects

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(`${url}/api/post`);
      if (response.data.success) {
        setShowAllPost(response.data.data);

        response.data.data.forEach((post)=>getLikeCount(post.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete project
  const deleteProjects = async (postId, userId) => {
    try {
      const response = await axios.delete(`${url}/api/post/${postId}`);
      if (response.data.success) {
        console.log("Post deleted successfully");
        // Optionally refresh projects after deletion
        showProjects(userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

   // search project
   const searchPost = async (searchTerm) => {
    if (!searchTerm.trim()) {
      console.log("Search term is empty");
      return;
    }
  
    const sanitizedSearch = searchTerm.replace(/#/g, '').trim();
  
    try {
      const response = await axios.get(`${url}/api/post/search`, {
        params: { search: sanitizedSearch },
      });
  
      if (response.data.success && Array.isArray(response.data.data)) {
        setShowAllPost(response.data.data);
      } else {
        console.log("No posts found");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  
  // create comment
  const handleCommentSubmit = async (e,post_id) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      post_id: post_id,
      user_id: user.id,
      comment: comment,
    };

    try {
      const response = await axios.post(
        `${url}/api/comment`,
        newComment
      );
      if (response.data.success) {
        setComment("");
        getComment(post_id);
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // get comment
  const getComment = async(post_id)=>{
    try{
      const response = await axios.get(`${url}/api/comment/${post_id}`)
    if(Array.isArray(response.data.data)){
      setShowComment(response.data.data);
    }
    }catch(error){
      console.log(error);
    }
  }

  // create like
 // create like
const createLike = async (post_id, type) => {
  try {
    const response = await axios.post(`${url}/api/like`, {
      post_id,
      user_id: user.id,
      type
    });
    
    if (response.data.success) {
      // Update the likes count for this post
      setLikesCount(prev => ({
        ...prev,
        [post_id]: {
          likes: response.data.like_count,
          dislikes: response.data.dislike_count
        }
      }));
      
      return true;
    }
  } catch (error) {
    console.log("Error creating like", error);
    return false;
  }
};

// get like count
const getLikeCount = async (postId) => {
  try {
    const response = await axios.get(`${url}/api/like/${postId}`);
    if (response.data.success) {
      setLikesCount(prev => ({
        ...prev,
        [postId]: {
          likes: response.data.like_count,
          dislikes: response.data.dislike_count,
        },
      }));
    }
  } catch (error) {
    console.log("Error getting like count", error);
  }
};
 
  const getDaysAgo = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDiff = currentDate - createdDate;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysAgo === 0) return "Today";
    if (daysAgo === 1) return "1 day ago";
    return `${daysAgo} days ago`;
  };
  
  const contextValue = {
    showPersonalPost,
    showProjects,
    deleteProjects,
    showAllPost,
    fetchAllPosts,
    searchPost,
    getDaysAgo,
    handleCommentSubmit,
    comment,
    setComment,
    getComment,
    showComment,
    createLike,
    getLikeCount,
    likesCount,
    user,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
