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
const PORT = process.env.PORT || 5002;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
