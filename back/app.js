const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const passportConfig = require("./passport");
const db = require("./models");

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db connet");
  })
  .catch((e) => console.error(e));
passportConfig();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("실행중!!");
});
