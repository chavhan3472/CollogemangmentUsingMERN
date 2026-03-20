const {
  student_data,
  exam_registartiodata,
  student_info,
  final_result,
} = require("../model/model");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let nodemailer = require("nodemailer");
let student_registartion = async (req, res) => {
  // console.log(req.body);
  try {
    let obj = await student_data.find({
      $or: [
        { user_email: req.body.user_email },
        { user_phno: req.body.user_phno },
      ],
    });
    console.log(obj, "This The Error ");
    if (obj.length > 0) {
      res.json({ msg: "User Alredy Exist" });
    } else {
      let secure_password = await bcrypt.hash(req.body.user_password, 10);
      let student_regidata = new student_data({
        ...req.body,
        user_password: secure_password,
      });
      console.log(student_regidata, "This The Student Data");
      console.log(secure_password, "This The Secure Password");
      await student_regidata.save();
      const transporter = require("nodemailer").createTransport({
        service: "gmail",
        auth: {
          user: "mernproject601@gmail.com",
          pass: "cqydxbhaafamnqgx",
        },
      });

      const mailOptions = {
        from: "mernproject601@gmail.com",
        to: req.body.user_email,
        subject: "Registration Successful",
        text: `Hello ${req.body.user_name}, Your User ID is ${student_regidata.user_id}`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
        else console.log("Email sent with user_id to student");
      });

      res.json({ msg: "Account Created Sucessfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed To Create Account" });
  }
};

let student_login = async (req, res) => {
  // let verify_id = /^[0-9]{6}$/;
  // console.log(req.body);
  try {
    let verify_id = /^[0-9]{6}$/;
    let user_id = req.body.user_id;
    console.log(verify_id, user_id);
    if (verify_id.test(user_id)) {
      let obj = await student_data.findById({ user_id: user_id });
      console.log(obj, "this the object ");
      if (obj) {
        let verify_Password = await bcrypt.compare(
          req.body.user_password,
          obj.user_password,
        );
        console.log(verify_Password, "This The Verify Password");
        if (verify_Password) {
          res.json({
            token: jwt.sign({ user_id: obj.user_id }, "1234"),
            name: obj.user_name,
            role: obj.role,
            user_id: obj.user_id,
          });
          console.log(obj);
        } else {
          res.json({ msg: "Check Your Password" });
        }
      } else {
        res.json({ msg: "Check User Id" });
      }
    } else {
      let arr = await student_data.find({
        $or: [{ user_email: user_id }, { user_phno: user_id }],
      });
      if (arr.length > 0) {
        let verify_Password = await bcrypt.compare(
          req.body.user_password,
          arr[0].user_password,
        );
        if (verify_Password) {
          res.json({
            token: jwt.sign({ user_id: arr[0].user_id }, "1234"),
            name: arr[0].user_name,
            role: arr[0].role,
            user_id: arr[0].user_id,
          });
        } else {
          res.json({ msg: "Check Your Password" });
        }
      } else {
        res.json({ msg: "Check Your UserId" });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed To Login" });
  }
};

let exam_registartion = async (req, res) => {
  try {
    let user_id = req.body.user_id;
    let obj = new exam_registartiodata(req.body);
    await obj.save();
    await student_data.findOneAndUpdate(
      { user_id: user_id },
      {
        exam_form: "Completed",
        exam_fee: "Paid",
        student_type: req.body.student_type,
      },
    );
    res.json({ msg: "Exam Form Submited" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed To Submit Exam Form" });
  }
};
let show_studentdata = async (req, res) => {
  try {
    let get_stdreacord = await student_data.findOne({
      user_id: req.params.user_id,
    });
    res.json(get_stdreacord);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed To Getting Data" });
  }
};
let show_admin = async (req, res) => {
  try {
    let Data = await student_data.find();
    res.json(Data);
  } catch {
    res.json({ msg: "Failed To Send" });
  }
};
let update_acprofile = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);
    let subjects = req.body.subjects.map((sub) => ({
      subject_name: sub.subject_name,
      mid_sem_marks: Number(sub.mid_sem_marks),
      attendance: Number(sub.attendance),
    }));

    let data = new student_info({
      student_name: req.body.student_name,
      student_rollno: req.body.student_rollno,
      colloge_pin: req.body.colloge_pin,
      semester: req.body.semester,
      subjects: subjects, // ✅ correct
    });

    await data.save();

    res.status(200).json({
      msg: "Data Saved Successfully",
      data: data,
    });
  } catch (error) {
    console.log("this is the error", error);
    res.json({ msg: "Failed TO Add Student Data" });
  }
};

// let show_studentacc = async (req, res) => {
//   try {
//     let accprofile_obj = await student_info.findById({
//       _id: req.params.user_id,
//     });
//     res.json(accprofile_obj);
//   } catch {
//     res.json({ msg: "Failed To Getting The Information" });
//   }
// };
let show_studentacc = async (req, res) => {
  try {
    let accprofile_obj = await student_info.findOne({
      user_id: req.params.user_id,
    });

    if (!accprofile_obj) {
      return res.json({ msg: "No Data Found" });
    }

    res.json(accprofile_obj);
  } catch (err) {
    console.log(err);
    res.json({ msg: "Failed To Getting The Information" });
  }
};

const declareFinalResult = async (req, res) => {
  try {
    const { student_name, student_college_pin, semester, subjects, CGPA } =
      req.body;
    let result = await final_result.findOne({ student_college_pin });

    if (result) {
      result.subjects = subjects;
      result.CGPA = CGPA;
      result.final_result_status = "Declared";
      await result.save();
      return res.status(200).json({ msg: "Result Updated & Declared" });
    }
    let newResult = new final_result({
      student_name,
      student_college_pin,
      semester,
      subjects,
      CGPA,
      final_result_status: "Declared",
    });
    await newResult.save();
    res.status(200).json({ msg: "Result Added & Declared" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Failed" });
  }
};
const viewFinalResult = async (req, res) => {
  try {
    const { student_college_pin } = req.params;
    let result = await final_result.findOne({ student_college_pin });
    console.log(result, "This Is The Results");

    if (!result) return res.status(404).json({ msg: "Result Not Decleare" });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Failed To Get Result" });
  }
};
module.exports = {
  student_registartion,
  student_login,
  exam_registartion,
  show_studentdata,
  show_admin,
  update_acprofile,
  show_studentacc,
  declareFinalResult,
  viewFinalResult,
};
