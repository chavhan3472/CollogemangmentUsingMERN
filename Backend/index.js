let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
const mini_app = require("./router/router");
mongoose
  .connect(
    "mongodb+srv://sahilchavhan250_db_user:PSTWrj2m0dQWQU28@cluster0.y9kpyzn.mongodb.net/CollageMangmentdatabse",
  )
  .then(() => {
    console.log("Connection Ok");
  })
  .catch((error) => {
    console.log(error);
    console.log("Failed To Coonect ");
  });
let app = express();
app.use(cors());
app.use(express.json());
app.use("/", mini_app);
app.listen(5000);
