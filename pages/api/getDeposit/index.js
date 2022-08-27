import Payment from "../../../models/Payment.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const totalAmount = await Payment.aggregate([
      { $group: { _id: null, amount: { $sum: "$amount" } } },
    ]);
    return res
      .status(200)
      .send(totalAmount[0].amount ? totalAmount[0].amount : 0);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
