import Payment from "../../../models/Payment.js";
import Student from "../../../models/Student.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
import { isAuth } from "../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.post(async (req, res, next) => {
  try {
    await connectMongo();
    const exist = await Student.findOne({ studentID: req.query.id });
    if (exist) {
      const newPayment = new Payment({
        ...req.body,
      });
      const payment = await newPayment.save();
      res.send("Payment Added successfully");
    } else {
      res.send(`Student ID not exist.Please add before make a payment`);
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
