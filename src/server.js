const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const studentSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    phone: String,
  },
  { versionKey: false }
);

const students = mongoose.model("Student", studentSchema);

// CREATE

/* Create a new student */
app.post("/", async (req, res, next) => {
  try {
    const { _id, name, phone } = req.body;
    const student = new students({
      _id,
      name,
      phone,
    });

    await student.save();
    res.json(student);
  } catch (error) {
    next(error);
  }
});

// READ

/* Get all students */
app.get("/", async (req, res, next) => {
  try {
    const allstudents = await students.find({});
    res.json(allstudents);
  } catch (error) {
    next(error);
  }
});

/* Get a specific student */
app.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const student = await students.findOne({
      _id: id,
    });

    if (!student) {
      const error = new Error("student does not exist");
      return next(error);
    }

    res.json(student);
  } catch (error) {
    next(error);
  }
});

// UPDATE

/* Update a specific student */
app.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, _id, phone } = req.body;
    const student = await students.findOne({
      _id: id,
    });
    if (!student) {
      const error = new Error("student does not exist");
      return next(error);
    }
    student.name = name;
    student._id = _id;
    student.phone = phone;
    await student.save();
    res.json(student);
  } catch (error) {
    next(error);
  }
});

// DELETE

/* Delete a specific student */
app.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await students.findOne({
      _id: id,
    });

    // student does not exist
    if (!student) {
      return next();
    }
    await students.remove({
      _id: id,
    });

    res.json({
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
