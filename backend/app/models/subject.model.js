module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      code: String,
      name: String,
      credit: Number
    },
    { 
      timestamps: true,
      collection: "subjects" 
    }
    
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Subject = mongoose.model("subjects", schema);
  return Subject;
};
