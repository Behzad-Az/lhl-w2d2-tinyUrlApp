"use strict";

const express = require('express');
var app = express();
const PORT = process.env.PORT || 8080; // default port 8080
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
}

app.get("/", (req, res) => {
  res.end("Hello");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});


app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase }
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  // console.log(req.query);
  // let tempMsg = {};
  // for (item in req.query) {
  //   tempMsg += ` ${req.query[item]}`;
  // }
  // let msgObj = {success: ''};
  // if (req.query.success === 'true') msgObj.success = req.query;
  // else res.render("urls_new");
  res.render("urls_new");

});

app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id, longURL: urlDatabase[req.params.id] };
  console.log(urlDatabase[req.params.id]);
  res.render("urls_show", templateVars);
});

app.get("/test", (req, res) => {
  res.render("urls");
});

app.post("/urls", (req, res) => {
  var rndmStr;
  //res.send("Ok");         // Respond with 'Ok' (we will replace this)
  rndmStr = randomString(6);
  urlDatabase[rndmStr] = `http://${req.body.longURL}`;
  res.redirect("/urls/new?success=true");
});

app.get("/u/:shortURL", (req, res) => {
  if (urlDatabase[req.params.shortURL] !== undefined) {
    let longURL = urlDatabase[req.params.shortURL];
    res.redirect(longURL);
  }

  else res.redirect('/urls');
});

app.get("/hello", (req, res) => {
  res.end("<html><body>Hello <b>World</b> </body> </html> \n");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

// function generateRandomString() {
//   //rndmStr = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
//   var length = 6;
//   //var rndmStr = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
//   var rndmStr = Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
//   console.log(rndmStr);
//   return rndmStr;
// }

function randomString(length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}