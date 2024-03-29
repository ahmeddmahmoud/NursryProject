const classSchema = require("../model/classModel");

exports.getAllClasses = (req, res, next) => {
  classSchema
    .find({})
    .populate({ path: "supervisor", select: { fullname: 1 } })
    .populate({ path: "childrenIDS", select: { fullname: 1 } })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.getClassChildren = (req, res, next) => {
  classSchema
    .find({ _id: req.params.id }, { childrenIDS: 1, _id: 0 })
    .populate({ path: "childrenIDS" })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.getClassSupervisor = (req, res, next) => {
  classSchema
    .find({ _id: req.params.id }, { supervisor: 1, _id: 0 })
    .populate({ path: "supervisor" })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.getClassById = (req, res, next) => {
  classSchema
    .findOne({ _id: req.params.id })
    .populate({ path: "supervisor", select: { fullname: 1 } })
    .populate({ path: "childrenIDS", select: { fullname: 1 } })
    .then((object) => {
      if (!object) {
        throw new Error("Class Doesn't Exist");
      }
      res.status(200).json({ object });
    })
    .catch((error) => next(error));
};

exports.insertClass = (req, res, next) => {
  let object = new classSchema(req.body);
  object
    .save()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.updateClass = (req, res, next) => {
  classSchema
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: req.body,
      }
    )
    .then((data) => {
      if (data.matchedCount == 0) next(new Error("Class Not Found"));
      else res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.deleteClass = (req, res, next) => {
  classSchema
    .deleteOne({
      _id: req.params.id,
    })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};
