import Transaction from "../../../models/Transaction.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
import { isAdmin, isAuth } from "../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.use(isAdmin);
handler.put(async (req, res, next) => {
  try {
    await connectMongo();
    await Transaction.findByIdAndUpdate(req.body._id, req.body);
    res.send("Payment approved successfully!");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
