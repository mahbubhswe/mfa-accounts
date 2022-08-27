import Payment from "../../../models/Payment.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
import { isAuth, isAdmin } from "../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.use(isAdmin);
handler.delete(async (req, res, next) => {
  try {
    await connectMongo();
    const deleteRecord = await Payment.deleteOne({ _id: req.query.id });
    if (deleteRecord) {
      return res.status(200).json("Record deleted successfully!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default handler;
