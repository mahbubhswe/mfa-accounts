import Payment from "../../../models/Payment.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const payment = await Payment.find({
      studentId: req.query.id,
      instalment: req.query.instalment,
    });
    res.send(payment);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
