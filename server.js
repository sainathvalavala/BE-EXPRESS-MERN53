const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
const users = require("./users.json");
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(__dirname + "/public"));

// const checklist = [authenticate, authorize1];
//  /=>endpoint, route
//endpoint => data ni istey?
//route => page ni iste?

//middleware--

// app.use(function (req,res,next){
//   console.log("General Middleware called");
//   next()
// })
// function middleware(req, res, next) {
//   console.log("General Middleware called");
//   next();
// }
// app.use(middleware);

//request handling
app.get(
  "/",
  function (req, res, next) {
    console.log("Default Middleware called");
    next();
  },
  (req, res) => {
    // console.log(req);
    // console.log(res);
    res.json({ a: "hello" });
  }
);
app.post("/login", function (req, res) {
  console.log(req.body);
  let token = jwt.sign(req.body.username, "jwtAuth");
  console.log(token);
  res.send({ token, username: req.body.username });
  // console.log(typeof token);
  // res.send("added user info");
});
function Authenticate(req, res, next) {
  let token = req.headers.token;
  if (token) {
    let userValid = jwt.verify(token, "jwtAuth");
    if (userValid) {
      console.log("user verified :Given Access");
      next();
    } else {
      console.log("Incorrect User: Access Denied");
      res.send({ msg: "invalid login" });
    }
  } else {
    res.send({ msg: "No token is there!" });
  }
}
app.post("/addTodo", Authenticate, (req, res) => {
  // console.log(req.body);
  var f1 = JSON.parse(fs.readFileSync("file.txt"));
  f1.push(req.body);
  fs.writeFileSync("file.txt", JSON.stringify(f1));
  // console.log(f1);
  // var f2= fs.readFileSync("file.txt")
  res.json(f1);
});

// app.get(
//   "/allTodos",
//   function (req, res, next) {
//     console.log("displayed all todos");
//     next();
//   },
//   (req, res) => {
//     var f1 = fs.readFileSync("file.txt").toString();
//     res.json(JSON.parse(f1));
//   }
// );

//if middleware is here, above endpoints are responded  without middleware function.

// app.use(function (req,res,next){
//   console.log("General Middleware called");
//   next()
// // })
// function authenticate(req, res, next) {
//   console.log("Authentication jarigindhi");
//   next();
// }

// function authorize1(req, res, next) {
//   console.log("authorize1");
//   next();
// }

// app.get("/getMovieById/:m1", (req, res) => {
//   res.send("idigo thesuko");
// });

app.get("/getTodosByUserName/:username", Authenticate, (req, res) => {
  var f1 = JSON.parse(fs.readFileSync("file.txt").toString());
  var filteredData = f1.filter(function (todo) {
    if (todo.username === req.params.username) {
      return true;
    }
  });
  res.json(filteredData);
});

app.listen(4000, () => {
  console.log("server is running on portNo:4000");
});
