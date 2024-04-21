const db = require("../models");
const Subject = db.subj;

// Create and Save a new Subject
exports.create = (req, res) => {
  // Validate request
  if (!req.body.code) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Subject
  const subject = new Subject({
    code: req.body.code,
    name: req.body.name,
    credit: req.body.credit
  });

  // Save Subject in the database
  subject
    .save(subject)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Subject."
      });
    });
};

// Retrieve all Subjects from the database.
exports.findAll = (req, res) => {
  const code = req.query.code;
  var condition = code ? { code: { $regex: new RegExp(code), $options: "i" } } : {};


  Subject.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subjects."
      });
    });
};

// Find a single Subject with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Subject.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Subject with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Subject with id=" + id });
    });
};

// Update a Subject by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Subject.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Subject with id=${id}. Maybe Subject was not found!`
        });
      } else res.send({ message: "Subject was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Subject with id=" + id
      });
    });
};

// Delete a Subject with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Subject.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Subject with id=${id}. Maybe Subject was not found!`
        });
      } else {
        res.send({
          message: "Subject was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Subject with id=" + id
      });
    });
};

// Delete all Subjects from the database.
exports.deleteAll = (req, res) => {
  Subject.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Subjects were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all subjects."
      });
    });
};
