const teacherSchema = require("./../model/teacherModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const admin = mongoose.connection.collection("admin");

exports.checkTeacher = (req, res, next) => {
  teacherSchema
    .findOne({
      email: req.body.email,
    })
    .then((object) => {
      if (!object) {
        admin
          .findOne({ email: req.body.email })
          .then((object) => {
            bcryptjs
              .compare(req.body.password, object.password)
              .then((result) => {
                if (!result) throw new Error("Not Authenticated");
                let token = jwt.sign(
                  {
                    _id: object._id,
                    role: "admin",
                  },
                  process.env.SECRETKEY,
                  { expiresIn: "1hr" }
                );
                res.json({ data: "Authenticated", token });
              })
              .catch((err) => next(err));
          })
          .catch((error) => next(error));
      } else {
        bcryptjs
          .compare(req.body.password, object.password)
          .then((result) => {
            if (!result) throw new Error("Not Authenticated");
            let token = jwt.sign(
              {
                _id: object._id,
                role: "teacher",
              },
              process.env.SECRETKEY,
              { expiresIn: "1hr" }
            );
            res.json({ data: "Authenticated", token });
          })
          .catch((err) => next(err));
      }
    })
    .catch((error) => next(error));
};
