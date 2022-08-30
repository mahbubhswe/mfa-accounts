import Student from "../../../models/Student.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const studentInfo = await Student.findOne({
      studentID: req.query.id,
    });
    if (studentInfo) {
      res.status(200).send(studentInfo);
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
