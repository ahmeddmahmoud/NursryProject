const teacherSchema = require("./../model/teacherModel");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const admin = mongoose.connection.collection("admin");

exports.checkTeacher = (req, res, next) => {
  teacherSchema
    .findOne({
      email: req.body.email,
      password: req.body.password,
    })
    .then((object) => {
      if (!object) {
        admin
          .findOne({ email: req.body.email, password: req.body.password })
          .then((object) => {
            console.log(object);
            if (!object) {
              throw new Error("Not Authenticated");
            }
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
          .catch((error) => next(error));
      }else{
      let token = jwt.sign(
        {
          _id: object._id,
          role: "teacher",
        },
        "Ahmed Elshahat",
        { expiresIn: "1hr" }
      );
      res.json({ data: "Authenticated", token });
    }})
    .catch((error) => next(error));
};
