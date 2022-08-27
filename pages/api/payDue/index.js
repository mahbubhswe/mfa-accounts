import Transaction from "../../../models/Transaction.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
import { isAuth } from "../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.put(async (req, res, next) => {
  try {
    await connectMongo();
    const transaction = await Transaction.updateOne(
      {
        _id: req.query.id,
      },
      { $inc: { amount: -req.body.amount } }
    );
    if (transaction.modifiedCount == 1) {
      res.send("Due added successfully");
    } else {
      res.send("Something went wrong");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
