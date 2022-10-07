import Student from "../../../models/Student.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const studentInfo = await Student.findOne({
      studentID: req.query.id,
    },{createdAt:0,__v:0,_id:0});
    if (studentInfo) {
      res.send(studentInfo);
    } else {
      res.send("Sorry, no student found");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
