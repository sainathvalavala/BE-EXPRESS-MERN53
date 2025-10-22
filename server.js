const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const bodyparser = require("body-parser");
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  // console.log(req);
  // console.log(res);
  res.json({ a: "hello" });
});

app.post("/postTodo", (req, res) => {
  // console.log(req.body);
  var f1 = JSON.parse(fs.readFileSync("file.txt"));
  f1.push(req.body);
  fs.writeFileSync("file.txt", JSON.stringify(f1));
  console.log(f1);
  // var f2= fs.readFileSync("file.txt")

  res.json(f1);
});
app.get("/allTodos", (req, res) => {
  var f1 = fs.readFileSync("file.txt").toString();
  res.json(JSON.parse(f1));
});
app.get("/getTodosByUserName/:username",(req,res)=>{
  var f1=JSON.parse(fs.readFileSync("todos.txt").toString())
  var filteredData =f1.filter(function (todo){
      if(todo.username === req.params.username){
        return true;
      }
  })
  res.json(filteredData)
});

app.listen(4000, () => {
  console.log("server is running on portNo:4000");
});
