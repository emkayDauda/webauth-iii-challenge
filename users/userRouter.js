const express = require("express");
const db = require("./userModel");
const jwt = require("jsonwebtoken");

const users = express.Router();

users.get("/", authenticated, (req, res) => {
  const { department } = req.decodedToken
  db.get(undefined, { department })
    .then(users => {
      if (users) {
        res
          .status(200)
          .json({ error: false, message: "Successful", data: users });
      }
    })
    .catch(err => res.status(500).json({ error: true, message: err.message }));
});

function authenticated(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        req.status(401).json({ error: true, message: err.message });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else
    res.status(400).json({ error: true, message: "No credentials passed" });
}

module.exports = users;
