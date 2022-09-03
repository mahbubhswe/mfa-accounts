import Payment from "../../../models/Payment.js";
import AuthUser from "../../../models/AuthUser.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
import { isAuth } from "../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.put(async (req, res, next) => {
  try {
    await connectMongo();
    await AuthUser.findOne({ email: req.query.userEmail, hasUpdatePer: true });
    if (AuthUser) {
      const updatedPayment = await Payment.findByIdAndUpdate(
        req.query._id,
        req.body
      );
      if (updatedPayment) {
        res.send("Payment updated successfully!");
      } else {
        res.send("Sorry, somethingh wrong happened!");
      }
    } else {
      res.send("Sorry, you are not allowed to update records");
    }
   
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
