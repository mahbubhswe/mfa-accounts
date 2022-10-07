import Payment from "../../../models/Payment.js";
import Student from "../../../models/Student.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
import { isAuth, isBankUser } from "../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.use(isBankUser);
handler.post(async (req, res, next) => {
  try {
    await connectMongo();
    const check = await Payment.findOne({
      studentId: req.body.studentId,
      instalment: req.body.instalment,
    });
    if (check) {
      res.send(`This student already made payment for selected semester`);
    } else {
      const exist = await Student.findOne({ studentID: req.query.id });
      if (exist) {
        req.body.detailsId = req.body.studentId;
        const newPayment = new Payment({
          ...req.body,
        });
        await newPayment.save();
        res.send("Payment Added successfully");
      } else {
        res.send(`Student ID not exist.Please add before make a payment`);
      }
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
