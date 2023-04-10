const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
const requireLogin = require("../middleware/requireLogin");

userRouter.post("/signup", (req, res) => {
  const { user_name, email, password, role, isAdmin } = req.body;
  if (!user_name || !email || !password) {
    res
      .status(200)
      .json({ msg: { msgBody: "please fill all fields", msgError: true } });
  }
  user.findOne({ user_name: user_name }).then((savedUser) => {
    if (savedUser) {
      res
        .status(200)
        .json({ msg: { msgBody: "Username already exist", msgError: true } });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hasedPass) => {
          const usertemp = new user({
            user_name: user_name,
            email: email,
            password: hasedPass,
            role: role,
            isAdmin: isAdmin,
          });
          usertemp
            .save()
            .then(() => {
              res.status(200).json({
                msg: { msgBody: "succeffuly registered", msgError: false },
              });
            })
            .catch(() => {
              res.status(200).json({
                msg: {
                  msgBody: "error occured while registering ",
                  msgError: true,
                },
              });
            });
        })
        .catch((err) => {
          res.status(200).json({
            msg: { msgBody: "password can not be hashed ", msgError: true },
          });
        });
    }
  });
});

userRouter.post("/login", (req, res) => {
  const { user_name, password, role } = req.body;
  if (!user_name || !password || !role) {
    res
      .status(200)
      .json({ msg: { msgBody: "please fill all fields", msgError: true } });
  } else {
    user
      .findOne({ user_name: user_name })
      .then((savedUser) => {
        if (!savedUser) {
          res
            .status(200)
            .json({ msg: { msgBody: "user not found", msgError: true } });
        } else {
          bcrypt.compare(password, savedUser.password).then((doMatch) => {
            if (doMatch && savedUser.role === role) {
              const token = jwt.sign(
                { token_gen_id: savedUser._id },
                process.env.JWT_SECRET
              );
              res.status(200).json({
                token: token,
                msg: {
                  msgBody: "succeffully registered please wait",
                  msgError: false,
                },
              });
            } else {
              res.status(200).json({
                msg: { msgBody: "Invalid Credentials", msgError: true },
              });
            }
          });
        }
      })
      .catch(() => {
        res.status(200).json({
          msg: { msgBody: "invalid username or password", msgError: true },
        });
      });
  }
});

userRouter.get("/", requireLogin, (req, res) => {
  user
    .findById(req.user._id)
    .then((result) => {
      res.status(200).json({
        id: result._id,
        name: result.user_name,
        email: result.email,
        role: result.role,
        isAdmin: result.isAdmin,
      });
    })
    .catch((err) => {
      res.status(200).json({ msgError: "error occured " });
    });
});

userRouter.get("/employee", (req, res) => {
  user
    .find({ role: "employee" }, "-password")
    .then((result) => {
      res.status(200).json({
        employees: result,
      });
    })
    .catch((err) => {
      res.status(200).json({ msgError: "error occured " });
    });
});

module.exports = userRouter;
