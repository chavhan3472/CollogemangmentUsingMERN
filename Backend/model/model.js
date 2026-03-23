const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const studentSchema = new mongoose.Schema({
  user_name: String,
  user_email: String,
  user_phno: String,
  user_password: String,
  student_class: String,
  student_rollno: String,
  student_dob: String,
  student_department: String,
  exam_form: {
    type: String,
    default: "incomplete",
  },
  role: {
    type: String,
    default: "user",
  },
  exam_fee: {
    type: String,
    default: "Pending",
  },
  student_type: {
    type: String,
    default: "Regular",
  },
});

studentSchema.plugin(AutoIncrement, {
  inc_field: "user_id",
  start_seq: 311186,
});

let exam_registartionschema = mongoose.Schema({
  select_semster: String,
  select_studenttype: String,
  user_id: String,
  user_name: String,
  student_class: String,
  student_classRoll: String,
});
let student_acdminschema = mongoose.Schema({
  student_name: String,
  student_rollno: String,
  colloge_pin: Number,
  semester: String,
  subjects: [
    {
      subject_name: String,

      mid_sem_marks: Number,

      attendance: Number,
    },
  ],
});

const finalResultSchema = mongoose.Schema({
  student_name: { type: String, required: true },
  student_college_pin: { type: Number, required: true, unique: true },
  semester: { type: String, required: true },
  subjects: [
    {
      subject_name: { type: String, required: true },
      total_marks: { type: Number, required: true }, // semester marks only
      grade: { type: String }, // optional, A+/A/B etc
    },
  ],
  CGPA: { type: Number, default: 0 }, // calculate after all marks
  final_result_status: { type: String, default: "Pending" }, // Pending / Declared
  final_result_type: String,
  grade: String,
});

let final_result = mongoose.model("final_result", finalResultSchema);
let exam_registartiodata = mongoose.model(
  "exam_registartiodata",
  exam_registartionschema,
);
let student_info = mongoose.model("student_info", student_acdminschema);
student_data = mongoose.model("student_data", studentSchema);
module.exports = {
  student_data,
  exam_registartiodata,
  student_info,
  final_result,
};
