import Payment from "../../../models/Payment.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();

handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const allPayment = await Payment.find({
      studentId: req.query.id,
      instalment: req.query.instmn,
    });
  
    if (allPayment) {
      return res.send(allPayment);
    } else {
      return res.send("Sorry, no payment found");
    }
  } catch (error) {
    return res.send(error.message);
  }
});

export default handler;
