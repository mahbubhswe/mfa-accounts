import Payment from "../../../models/Payment.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
import { isAuth, isAdmin } from "../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth)
handler.use(isAdmin)
handler.put(async (req, res, next) => {
  try {
    await connectMongo();
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.query._id,
      req.body
    );
    if (updatedPayment) {
      res.status(200).json("Payment updated successfully!");
    } else {
      res.status(500).json("Sorry, somethingh wrong happened!");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
