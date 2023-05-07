const express = require("express");
const mongoose = require("mongoose");
const expressApp = express();
const bodyParser = require("body-parser");

const uri =
  "mongodb+srv://hieule0301:hieule0301@cluster02703.syx3xrh.mongodb.net/student-assistant?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  });

expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(bodyParser.json());

// FOR THE STUDENTS COLLECTIONS
const studentSchema = new mongoose.Schema({
  name: String,
  sid: String,
  gender: String,
  password: String,
  course: Array,
});

const Student = new mongoose.model("students", studentSchema);

expressApp.get("/students", async (req, res) => {
  try {
    const foundStudents = await Student.find({});
    res.send(foundStudents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

expressApp.post("/signup", async (req, res) => {
  // Getting data from React Native stored in request body
  try {
    const student = new Student({
      name: req.body.name,
      sid: req.body.sid,
      gender: req.body.gender,
      password: req.body.password,
      course: [],
    });

    //query to save these pieces of info into MongoDB
    await student.save();

    // send back message to React Native to confirm
    res.send({ message: "Student Created" });
  } catch (error) {
    console.log(error);
  }
});

// delete Tested documents
expressApp.delete("/deleteLams", async (req, res) => {
  try {
    await Student.deleteMany({ name: "Lam" });
    console.log("Lams deleted");
  } catch (error) {
    console.error(error);
  }
});

// Fetching info for login
expressApp.post("/login", async (req, res) => {
  try {
    const studentsFound = await Student.find({ sid: req.body.sid });
    if (req.body.password === studentsFound[0].password) {
      res.send(studentsFound);
    } else {
      res.send(studentsFound);
    }
  } catch (error) {
    console.log(error);
  }
});

// Fetching personal info

expressApp.post("/personalInfo", async (req, res) => {
  try {
    const foundStudents = await Student.find({ sid: req.body.sid });
    res.send(foundStudents);
  } catch (error) {
    console.log(error);
  }
});

const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
expressApp.use("/conversations", conversationRoute);
expressApp.use("/messages", messageRoute);
expressApp.listen(8000, () =>
  console.log("Express Server started on port 8000")
);
