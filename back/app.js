const express = require("express");
const app = express();
const db = require("./models");
const postRouter = require("./routes/post");

db.sequelize
  .sync()
  .then(() => {
    console.log("db connet");
  })
  .catch((e) => console.error(e));

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/post", postRouter);

app.listen(3065, () => {
  console.log("실행중!!");
});
