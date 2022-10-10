import nextConnect from "next-connect";
import Student from "../../../models/Student.js";
import { isAuth } from "../../../utils/auth.js";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.use(isAuth);
handler.put(async (req, res, next) => {
  try {
    await connectMongo();
    await Student.findByIdAndUpdate({ _id: req.body.id }, { ...req.body });
    res.send("Student updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
