const express = require("express");
const { Post } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

/**
 * 게시글 작성
 */
router.post("/", async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    res.status(201).json(post);
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
