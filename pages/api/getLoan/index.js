import Transaction from "../../../models/Transaction.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const transaction = await Transaction.find({
      username: req.query.username,
      transactionType: "loan",
      status: "approved",
    });
    res.send(transaction);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
