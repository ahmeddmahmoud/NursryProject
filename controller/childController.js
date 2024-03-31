const childSchema = require("../model/childModel");
const fs = require("fs");

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
  if (req.file) {
    object.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;
    fs.writeFile(`./photos/children/${object.image}`, req.file.buffer, (err) => {
      if (err) return next(err);
      object
        .save()
        .then((data) => {
          res.status(200).json({ data });
        })
        .catch((error) => next(error));
    });
  } else {
    object
      .save()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => next(error));
  }
};

exports.updateChild = (req, res, next) => {
  if (req.file) {
    req.body.image = `${Date.now()}-${Math.random()}-${req.file.originalname}`;
    fs.writeFile(`./photos/children/${req.body.image}`, req.file.buffer, (err) => {
      if (err) return next(err);
      updateChildData(req, res, next);
    });
  } else {
    updateChildData(req, res, next);
  }
};

function updateChildData(req, res, next) {
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
      if (data.matchedCount === 0) next(new Error("child Not Found"));
      else res.status(200).json("The child's Data was updated successfully!");
    })
    .catch((error) => next(error));
}

exports.deleteChild = (req, res, next) => {
  childSchema
    .findOneAndDelete({
      _id: req.params.id,
    })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "child not found" });
      }
      if (data.image) {
        const imagePath = `./photos/children/${data.image}`;
        fs.unlink(imagePath, (err) => {
          if (err) {
            return next(err);
          }
          res.status(200).json({ message: "child deleted successfully" });
        });
      } else {
        res.status(200).json({ message: "child deleted successfully" });
      }
    })
    .catch((error) => next(error));
};