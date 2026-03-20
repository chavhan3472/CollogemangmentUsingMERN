let express = require("express");
const {
  student_registartion,
  student_login,
  exam_registartion,
  show_studentdata,
  show_admin,
  update_acprofile,
  show_studentacc,
  declareFinalResult,
  viewFinalResult,
} = require("../controller/controller");
let mini_app = express.Router();
mini_app.post("/userregis", student_registartion);
mini_app.post("/userlogin", student_login);
mini_app.post("/examregister/:user_id", exam_registartion);
mini_app.get("/search/:user_id", show_studentdata);
mini_app.get("/showadmin", show_admin);
mini_app.post("/studentacprofile", update_acprofile);
mini_app.get("/sendaccprofile/:user_id", show_studentacc);
mini_app.post("/admin/finalresult", declareFinalResult);
mini_app.get("/finalresult/:student_college_pin", viewFinalResult);
module.exports = mini_app;
