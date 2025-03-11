import e from "express";
import prisma from "../db/db.config.js";
import cloudinary from "cloudinary";

// create a post
export const createPost = async (req, resp) => {
  const { user_id, title, description, githubLink, techStack, deployedLink} = req.body;
  // || !image_url
  if (!title || !description || !githubLink || !techStack || !deployedLink ) {
    return resp.json({
      status: 400,
      success: false,
      message: "Enter the required field",
    });
  }

  console.log(user_id,title,description,githubLink,techStack,deployedLink);

  try {
    // const cloudinary_res = await cloudinary.uploader.upload(image_url,{
    //   folder:"/buildUp-Images",
    // });
    
    // console.log(cloudinary_res);

    const newPost = await prisma.post.create({
      data: {
        user_id: Number(user_id),
        title: title,
        description: description,
        githubLink: githubLink,
        techStack: techStack,
        deployedLink: deployedLink,
        // image_url: cloudinary_res.secure_url,      
      },
    });

    return resp.json({
      status: 200,
      success: true,
      data: newPost,
      message: "Post created Successfully",
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return resp.status(500).json({
      status: 500,
      success: false,
      message: "An error occurred while creating the post",
      error: error.message,
    });
  }
};

// fetch all post
export const fetchAllPost = async (req, resp) => {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  
  try {
    return resp.json({ status: 200, success: true, data: posts });
  } catch (error) {
    console.error(error);
    return resp.json({
      status: 400,
      message: "An error occurred while fetching posts",
    });
  }
};

// show perticular post comment
export const showPost = async (req, resp) => {
  const user_id = req.params.user_id;

  try {
    const posts = await prisma.post.findMany({
      where: {
        user_id: Number(user_id),
      },
    });

    if (posts.length === 0) {
      return resp.status(404).json({
        status: 404,
        success: false,
        message: "No posts found for the given user",
      });
    }

    return resp.json({
      status: 200,
      data: posts,
    });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({
      status: 500,
      message: "An error occurred while fetching posts",
    });
  }
};

// delete a post
export const deletePost = async (req, resp) => {
  const postId = req.params.id;
  try {
    await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });
    return resp.json({
      status: 200,
      success: true,
      message: "Post deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return resp.json({
      status: 400,
      messsage: "An error occurred while fetching posts",
    });
  }
};