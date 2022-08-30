import Student from "../../../models/Student.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
import { isAuth, isAdmin } from "../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.post(async (req, res, next) => {
  try {
    await connectMongo();
    const exit = await Student.findOne({ studentID: req.body.studentID });
    if (exit) {
      res.send(`Student ID ${exit.studentID} already exists`);
    }
    const newStudent = new Student({
      studentID: req.body.studentID,
      name: req.body.name,
      batch: req.body.batch,
      email: req.body.email,
    });
    await newStudent.save();
    return res.status(200).json("Student added successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default handler;
