const childSchema = require("../model/childModel");

exports.getAllChildren = (req, res, next) => {
  childSchema
    .find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.getChildById = (req, res, next) => {
  childSchema
    .findOne({ _id: req.params.id })
    .then((object) => {
      if (!object) {
        throw new Error("This child doesn't exist");
      }
      res.status(200).json({ object });
    })
    .catch((error) => next(error));
};

exports.insertChild = (req, res, next) => {
  let object = new childSchema(req.body);
  object
    .save()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.updateChild = (req, res, next) => {
  childSchema
    .updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: req.body,
      }
    )
    .then((data) => {
      if (data.matchedCount == 0) next(new Error("Child Not Found"));
      else res.status(200).json("The child's Data was updated successfully!");
    })
    .catch((error) => next(error));
};

exports.deleteChild = (req, res, next) => {
  childSchema
    .deleteOne({
      _id: req.params.id,
    })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};
