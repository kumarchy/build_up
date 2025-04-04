import prisma from "../db/db.config.js";

export const createLike = async (req, res) => {
  try {
    const { post_id, user_id, type } = req.body;

    // First, verify the post exists
    const postExists = await prisma.post.findUnique({
      where: { id: Number(post_id) },
    });

    if (!postExists) {
      return res.status(404).json({ 
        status: 404, 
        message: "Post not found" 
      });
    }

    // Check if the user already reacted to this post
    const existingReaction = await prisma.like.findFirst({
      where: {
        post_id: Number(post_id),
        user_id: Number(user_id),
      },
    });

    let likeChange = 0;
    let dislikeChange = 0;
    let message = "";

    if (existingReaction) {
      if (existingReaction.reaction === type) {
        // User is removing their reaction
        await prisma.like.delete({
          where: { id: existingReaction.id },
        });

        if (type === "LIKE") {
          likeChange = -1;
          message = "Like removed";
        } else {
          dislikeChange = -1;
          message = "Dislike removed";
        }
      } else {
        // User is changing their reaction
        await prisma.like.update({
          where: { id: existingReaction.id },
          data: { reaction: type },
        });

        if (type === "LIKE") {
          likeChange = 1;
          dislikeChange = -1;
          message = "Changed to like";
        } else {
          likeChange = -1;
          dislikeChange = 1;
          message = "Changed to dislike";
        }
      }
    } else {
      // User is reacting for the first time
      await prisma.like.create({
        data: {
          post_id: Number(post_id),
          user_id: Number(user_id),
          reaction: type,
        },
      });

      if (type === "LIKE") {
        likeChange = 1;
        message = "Liked";
      } else {
        dislikeChange = 1;
        message = "Disliked";
      }
    }

    // Update post counts
    const post = await prisma.post.update({
      where: { id: Number(post_id) },
      data: {
        like_count: {
          increment: likeChange
        },
        dislike_count: {
          increment: dislikeChange
        }
      },
      select: {
        like_count: true,
        dislike_count: true
      }
    });

    res.json({ 
      status: 200, 
      message,
      like_count: post.like_count,
      dislike_count: post.dislike_count
    });
  } catch (error) {
    console.error("Error in createLike:", error);
    
    if (error.code === 'P2003') {
      return res.status(400).json({ 
        message: "Invalid post or user reference",
        error: error.meta 
      });
    }
    
    res.status(500).json({ 
      message: "Something went wrong", 
      error: error.message 
    });
  }
};

export const showPostLike = async (req, res) => {
  try {
    const postId = Number(req.params.post_id);

    // Verify post exists first
    const postExists = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!postExists) {
      return res.status(404).json({ 
        status: 404, 
        message: "Post not found" 
      });
    }

    const likes = await prisma.like.findMany({
      where: { post_id: postId },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    const likeCount = await prisma.like.count({
      where: { post_id: postId, reaction: "LIKE" },
    });

    const dislikeCount = await prisma.like.count({
      where: { post_id: postId, reaction: "DISLIKE" },
    });

    res.json({
      status: 200,
      data: likes,
      like_count: likeCount,
      dislike_count: dislikeCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Something went wrong", 
      error: error.message 
    });
  }
};