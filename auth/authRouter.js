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

auth.post("/login", loginValidator, (req, res) => {
  res.status(200).json({
    error: false,
    message: "User authenticated successfully",
    token: req.token,
    data: req.authedUser
  });
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

function loginValidator(req, res, next) {
  const { username, password } = req.body;

  if (!Object.keys(req.body).length) {
    res.status(400).json({ error: true, message: "Request body missing" });
  } else if (!username || !password) {
    res.status(400).json({ error: true, message: "Required param missing" });
  } else {
    db.findBy({ username }).then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.authedUser = user;
        const token = generateToken(user);
        req.token = token;
        next();
      } else
        res
          .status(401)
          .json({ error: true, message: "Invalid authentication details" });
    });
    // next();
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: user.department
  };
  const options = {
    expiresIn: "1d"
  };

  const result = jwt.sign(
    payload,
    // process.env.NODE_ENV === 'development' ? 'devsecret' : process.env.SECRET,
    process.env.SECRET,
    options
  );

  return result;
}

module.exports = auth;
