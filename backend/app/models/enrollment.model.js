module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nro_enroll: String,
      name: String,
      subj_enroll: []
    },
    { 
      timestamps: true,
      collection: "enrollments" 
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Enrollment = mongoose.model("enrollments", schema);
  return Enrollment;
};
  