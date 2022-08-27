import Transaction from "../../../models/Transaction.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const transaction = await Transaction.find({ status: "approved" });
    res.send(transaction);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default handler;
