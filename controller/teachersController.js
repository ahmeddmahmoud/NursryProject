const teacherSchema = require("../model/teacherModel");
const classSchema = require("../model/classModel");
const fs = require("fs");

exports.getAllTeachers = (req, res, next) => {
  teacherSchema
    .find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.getAllSupervisors = (req, res, next) => {
  classSchema
    .find({}, { supervisor: 1, _id: 0 })
    .populate({
      path: "supervisor",
      select: { fullName: 1, _id: 0 },
    })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.getTeacherById = (req, res, next) => {
  teacherSchema
    .findOne({ _id: req.params.id })
    .then((object) => {
      if (!object) {
        throw new Error("This teacher doesn't exist");
      }
      res.status(200).json({ object });
    })
    .catch((error) => next(error));
};

exports.insertTeacher = (req, res, next) => {
  let object = new teacherSchema(req.body);
  object.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;
  fs.writeFile(`./photos/teacher/${object.image}`, req.file.buffer, (err) => {
    if (err) return next(err);
    object
      .save()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => next(error));
  })
};

exports.updateTeacher = (req, res, next) => {
  req.body.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;
  fs.writeFile(`./photos/teacher/${req.body.image}`, req.file.buffer, (err) => {
    if (err) return next(err);
    teacherSchema
      .updateOne(
        {
          _id: req.body._id,
        },
        {
          $set: req.body,
        }
      )
      .then((data) => {
        if (data.matchedCount === 0) next(new Error("Teacher Not Found"));
        else res.status(200).json("The Teacher's Data was updated successfully!");
      })
      .catch((error) => next(error));
  });
};

exports.deleteTeacher = (req, res, next) => {
  teacherSchema
    .findOneAndDelete({
      _id: req.params.id,
    })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      const imagePath = `./photos/teacher/${data.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({ message: "Teacher deleted successfully" });
      });
    })
    .catch((error) => next(error));
};

exports.changeTeacherPassword = (req, res, next) => {
  teacherSchema
    .updateOne(
      { _id: req.body._id },
      {
        $set: {
          password: req.body.password,
        },
      }
    )
    .then((data) => {
      if (data.matchedCount == 0) next(new Error("Teacher Not Found"));
      res.status(200).json("Your password was updated successfully!");
    })
    .catch((err) => next(err));
};
