const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { Post, User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

/**
 * 회원가입 API
 */
router.post("/", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(200).send("sign up success");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

/**
 * 로그인 API
 */

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }
        const fullUserWithoutPassword = await User.findOne({
          where: { id: req.user.id },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: Post,
            },
            {
              model: User,
              as: "Followings",
            },
            {
              model: User,
              as: "Followers",
            },
          ],
        });
        return res.status(200).json(fullUserWithoutPassword);
      } catch (error) {
        console.error("error", error);
      }
    });
  })(req, res, next);
});

/**
 * 로그아웃 API
 */

router.post("/logout", isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
