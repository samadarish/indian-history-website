const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

 let day = date.getDate();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


app.use('/images', express.static('images'));


mongoose.connect("mongodb://localhost:27017/minorcommentsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const minorcommSchema = {
  name: "String",
  content: "String"
};

const Comment = mongoose.model("Comment", minorcommSchema );

app.get("/", function(req, res){
  Comment.find({}, function(err, foundComments){
  res.render("index",{
    comments: foundComments,
    day: day
  });
});
});




app.get("/:topic", function(req, res) {
      res.render(req.params.topic, {
      });

});





app.post("/", function(req, res){

  const name = req.body.name;
  const content = req.body.content;
  const comments = new Comment({
    name: name,
    content: content
  });
  comments.save();
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(req, res){
  console.log("Server up!! at 3000");
});
