module.exports = app => {
  const subject = require("../controllers/subject.controller.js");

  var router = require("express").Router();

  // Create a new Subject
  router.post("/", subject.create);

  // Retrieve all subjects
  router.get("/", subject.findAll);

  // Retrieve a single subject with id
  router.get("/:id", subject.findOne);

  // Update a subject with id
  router.put("/:id", subject.update);

  // Delete a subject with id
  router.delete("/:id", subject.delete);

  // Remove all subjects
  router.delete("/", subject.deleteAll);

  app.use("/api/subjects", router);

};
