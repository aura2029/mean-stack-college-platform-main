const db = require("../models");
const Enrollment = db.enroll;

// Create and Save a new Enrollment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nro_enroll) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Enrollment
  const enrollment = new Enrollment({
    nro_enroll: req.body.nro_enroll,
    name: req.body.name,
    subj_enroll: req.body.subj_enroll
  });

  // Save Enrollment in the database
  enrollment
    .save(enrollment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Enrollment."
      });
    });
};

// Retrieve all Enrollment from the database.
exports.findAll = (req, res) => {
  const nro_enroll = req.query.nro_enroll;
  var condition = nro_enroll ? { nro_enroll: { $regex: new RegExp(nro_enroll), $options: "i" } } : {};

  Enrollment.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Enrollment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Enrollment.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Enrollment with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Enrollment with id=" + id });
    });
};

// Update a Enrollment by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Enrollment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Enrollment with id=${id}. Maybe Enrollment was not found!`
        });
      } else res.send({ message: "Enrollment was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Enrollment with id=" + id
      });
    });
};

// Delete a Enrollment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Enrollment.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Enrollment with id=${id}. Maybe Enrollment was not found!`
        });
      } else {
        res.send({
          message: "Enrollment was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Enrollment with id=" + id
      });
    });
};

// Delete all Enrollments from the database.
exports.deleteAll = (req, res) => {
  Enrollment.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Enrollment were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all enrollment."
      });
    });
};
