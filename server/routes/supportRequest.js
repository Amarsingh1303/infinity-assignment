const express = require("express");
const supportRequestRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
const requireLogin = require("../middleware/requireLogin");
const supportRequest = require("../models/supportRequest");

supportRequestRouter.post("/newRequest", (req, res) => {
  const { product_type, issue_type, description, submitted_by } = req.body;
  if (!product_type || !issue_type || !description) {
    res
      .status(200)
      .json({ msg: { msgBody: "please fill all fields", msgError: true } });
  } else {
    const newRequestFormDetails = new supportRequest({
      product_type,
      issue_type,
      description,
      date_of_submission: new Date().toISOString(),
      submitted_by,
    });
    newRequestFormDetails
      .save()
      .then(() => {
        res.status(200).json({
          msg: {
            msgBody:
              "Your Request has been submitted and a customer care executive will be in touch with them soon",
            msgError: false,
          },
        });
      })
      .catch(() => {
        res.status(200).json({
          msg: {
            msgBody: "error occured while requesting for service ",
            msgError: true,
          },
        });
      });
  }
});

supportRequestRouter.get("/tasks", (req, res) => {
  supportRequest
    .find()
    .populate("submitted_by", "user_name")
    .then((results) => {
      console.log(results);
      res.status(200).json({
        tasks: results,
      });
    })
    .catch(() => {
      res.status(200).json({
        msg: {
          msgBody: "error occured while requesting for service ",
          msgError: true,
        },
      });
    });
  // const { product_type, issue_type, description, submitted_by } = req.body;
  // if (!product_type || !issue_type || !description) {
  //   res
  //     .status(200)
  //     .json({ msg: { msgBody: "please fill all fields", msgError: true } });
  // } else {
  //   const newRequestFormDetails = new supportRequest({
  //     product_type,
  //     issue_type,
  //     description,
  //     date_of_submission: new Date().toISOString(),
  //     submitted_by,
  //   });
  //   newRequestFormDetails
  //     .save()
  //     .then(() => {
  //       res.status(200).json({
  //         msg: {
  //           msgBody:
  //             "Your Request has been submitted and a customer care executive will be in touch with them soon",
  //           msgError: false,
  //         },
  //       });
  //     })
  //     .catch(() => {
  //       res.status(200).json({
  //         msg: {
  //           msgBody: "error occured while requesting for service ",
  //           msgError: true,
  //         },
  //       });
  //     });
  // }
});

supportRequestRouter.get("/tasks/:id", (req, res) => {
  supportRequest
    .find({ assigned_to: req.params.id })
    .populate("submitted_by", "user_name")
    .then((results) => {
      console.log(results);
      res.status(200).json({
        tasks: results,
      });
    })
    .catch(() => {
      res.status(200).json({
        msg: {
          msgBody: "error occured while requesting for service ",
          msgError: true,
        },
      });
    });
});

supportRequestRouter.get("/allocatedTask", (req, res) => {
  supportRequest
    .find()
    .populate("submitted_by")
    .then((results) => {
      console.log(results);
      res.status(200).json({
        allocatedTask: results,
      });
    })
    .catch(() => {
      res.status(200).json({
        msg: {
          msgBody: "error occured while requesting for service ",
          msgError: true,
        },
      });
    });
  // const { product_type, issue_type, description, submitted_by } = req.body;
  // if (!product_type || !issue_type || !description) {
  //   res
  //     .status(200)
  //     .json({ msg: { msgBody: "please fill all fields", msgError: true } });
  // } else {
  //   const newRequestFormDetails = new supportRequest({
  //     product_type,
  //     issue_type,
  //     description,
  //     date_of_submission: new Date().toISOString(),
  //     submitted_by,
  //   });
  //   newRequestFormDetails
  //     .save()
  //     .then(() => {
  //       res.status(200).json({
  //         msg: {
  //           msgBody:
  //             "Your Request has been submitted and a customer care executive will be in touch with them soon",
  //           msgError: false,
  //         },
  //       });
  //     })
  //     .catch(() => {
  //       res.status(200).json({
  //         msg: {
  //           msgBody: "error occured while requesting for service ",
  //           msgError: true,
  //         },
  //       });
  //     });
  // }
});

supportRequestRouter.patch("/task/:id", (req, res) => {
  console.log("req.body", req.body);
  supportRequest
    .findByIdAndUpdate(
      req.params.id,
      { assigned_to: req.body.assigned_to, status: req.body.status },
      { new: true }
    )
    .then((result) => {
      // console.log(results);
      res.status(200).json({
        updatedTask: result,
      });
    })
    .catch(() => {
      res.status(200).json({
        msg: {
          msgBody: "error occured while requesting for service ",
          msgError: true,
        },
      });
    });
});

// supportRequestRouter.post("/login", (req, res) => {
//   const { user_name, password, role } = req.body;
//   if (!user_name || !password || !role) {
//     res
//       .status(200)
//       .json({ msg: { msgBody: "please fill all fields", msgError: true } });
//   } else {
//     user
//       .findOne({ user_name: user_name })
//       .then((savedUser) => {
//         if (!savedUser) {
//           res
//             .status(200)
//             .json({ msg: { msgBody: "user not found", msgError: true } });
//         } else {
//           bcrypt.compare(password, savedUser.password).then((doMatch) => {
//             if (doMatch && savedUser.role === role) {
//               const token = jwt.sign(
//                 { token_gen_id: savedUser._id },
//                 process.env.JWT_SECRET
//               );
//               res.status(200).json({
//                 token: token,
//                 msg: {
//                   msgBody: "succeffully registered please wait",
//                   msgError: false,
//                 },
//               });
//             } else {
//               res.status(200).json({
//                 msg: { msgBody: "Invalid Credentials", msgError: true },
//               });
//             }
//           });
//         }
//       })
//       .catch(() => {
//         res.status(200).json({
//           msg: { msgBody: "invalid username or password", msgError: true },
//         });
//       });
//   }
// });

// supportRequestRouter.get("/", requireLogin, (req, res) => {
//   user
//     .findById(req.user._id)
//     .then((result) => {
//       res.status(200).json({
//         id: result._id,
//         name: result.user_name,
//         email: result.email,
//         role: result.role,
//         isAdmin: result.isAdmin,
//       });
//     })
//     .catch((err) => {
//       res.status(200).json({ msgError: "error occured " });
//     });
// });

module.exports = supportRequestRouter;
