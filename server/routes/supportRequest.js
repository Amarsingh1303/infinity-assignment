const express = require("express");
const supportRequestRouter = express.Router();
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

supportRequestRouter.get("/tasks/:id", (req, res) => {
  supportRequest
    .find({ assigned_to: req.params.id })
    .populate("submitted_by", "user_name")
    .then((results) => {
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
});

supportRequestRouter.patch("/task/:id", (req, res) => {
  supportRequest
    .findByIdAndUpdate(
      req.params.id,
      { assigned_to: req.body.assigned_to, status: req.body.status },
      { new: true }
    )
    .then((result) => {
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

module.exports = supportRequestRouter;
