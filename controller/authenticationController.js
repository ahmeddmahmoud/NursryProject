const teacherSchema = require("./../model/teacherModel");
const jwt = require("jsonwebtoken");

exports.checkTeacher = (req, res, next) => {
  teacherSchema
    .findOne({
      email: req.body.email,
      password: req.body.password,
    })
    .then((object) => {
      if (!object) {
        throw new Error("Not Authenticated");
      }
      let token = jwt.sign(
        {
          _id: object._id,
          role: object.role,
        },
        "Ahmed Elshahat",
        { expiresIn: "1hr" }
      );
      res.json({ data: "Authenticated", token });
    })
    .catch((error) => next(error));
};

