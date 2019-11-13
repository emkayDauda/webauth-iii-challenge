const express = require("express");
const db = require("./userModel");

const users = express.Router();

users.get("/", (req, res) => {
  db.get()
    .then(users => {
      if (users) {
        res
          .status(200)
          .json({ error: false, message: "Successful", data: users });
      }
    })
    .catch(err => res.status(500).json({ error: true, message: err.message }));
});

module.exports = users;
