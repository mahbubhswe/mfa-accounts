import Transaction from "../../../models/Transaction.js";
import nextConnect from "next-connect";
import { isAuth } from "../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.post(async (req, res, next) => {
  try {
    const newTransaction = new Transaction({
      name: req.user.name,
      username: req.user.username,
      amount: req.body.amount,
      sector: req.body.sector,
      transactionType:req.body.transactionType,
      isAdmin: req.user.isAdmin,
      status: req.user.isAdmin=="true" ? "approved" : "pending",
    });
    await newTransaction.save();
    if (req.user.isAdmin=="true") {
      res.send(
        `${req.body.transactionType} transaction for ${req.body.amount} tk has been processed successfully`
      );
    } else {
      res.send(
        `${req.body.transactionType} transaction request for ${req.body.amount} tk has been sent successfully`
      );
    }
  } catch (error) {
    res.send(error.message);
  }
});
export default handler;
