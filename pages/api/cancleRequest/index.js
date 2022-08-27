import Transaction from "../../../models/Transaction.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.delete(async (req, res, next) => {
  try {
    await connectMongo();
    await Transaction.deleteOne({ _id: req.query.id });
     res.send("Transaction deleted successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default handler;
