const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) res.status(401).json({ msg: "required header" });
  else {
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        res.status(401).json({ msg: "invalid token" });
      } else {
        const { token_gen_id } = payload;
        user.findById(token_gen_id).then((savedUser) => {
          req.user = savedUser;
          next();
        });
      }
    });
  }
};
