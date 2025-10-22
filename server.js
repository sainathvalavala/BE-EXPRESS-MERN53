const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // console.log(req);
  console.log(res);
  res.json({a:"hello"})
});

app.listen(4000, () => {
  console.log("server is running on portNo:4000");
});
