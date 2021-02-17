const express = require("express");
const { Post, Image, Comment, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

/**
 * 게시글 작성
 */
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    const fullPost = await Post.findOne({
      where: {
        id: post.id,
      },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });

    res.status(201).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/", (req, res) => {
  res.json({});
});

/**
 * 댓글 작성
 */
router.post(`/:postId/comment`, isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글 입니다.");
    }

    const comment = await Post.create({
      content: req.body.content,
      postId: req.params.postId,
      UserId: req.user.id,
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
