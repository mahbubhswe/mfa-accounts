import Payment from "../../../models/Payment.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const getPaymentCount = await Payment.find();
    return res.status(200).send(getPaymentCount.length);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
