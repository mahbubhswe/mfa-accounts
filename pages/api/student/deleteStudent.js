import Student from "../../../models/Student.js";
import Payment from "../../../models/Payment.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
import { isAuth } from "../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.delete(async (req, res, next) => {
  try {
    await connectMongo();
    const student = await Student.findOne({ _id: req.query.id });
    await Student.deleteOne({ _id: req.query.id });
    await Payment.deleteMany({ studentId: student.studentID });
    res.send("Record deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
