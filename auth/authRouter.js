const express = require("express");
const db = require("./authModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = express.Router();

auth.post("/register", userBodyValidator, (req, res) => {
  db.add(req.valUserBody)
    .then(user =>
      res.status(201).json({
        error: false,
        message: "Successfully registered user",
        data: user
      })
    )
    .catch(err => res.status(500).json({ error: true, message: err.message }));
});

function userBodyValidator(req, res, next) {
  const { username, password, department } = req.body;

  if (!Object.keys(req.body).length) {
    res.status(400).json({ error: true, message: "Request body missing" });
  } else if (!username || !password || !department) {
    res.status(400).json({ error: true, message: "Required param missing" });
  } else {
    const hashedPassword = bcrypt.hashSync(password, 10);
    req.valUserBody = { username, department, password: hashedPassword };
    next();
  }
}

module.exports = auth;