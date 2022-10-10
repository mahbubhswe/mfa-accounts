import AuthUser from "../../../../models/AuthUser.js";
import Transaction from "../../../../models/Transaction.js";
import Notification from "../../../../models/Notification.js";
import nextConnect from "next-connect";
import connectMongo from "../../../../utils/connectMongo.js";
import { isAuth } from "../../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.delete(async (req, res, next) => {
  try {
    await connectMongo();
    const user = await AuthUser.findOne({ _id: req.query.id });
    await AuthUser.deleteOne({ _id: req.query.id });
    await Transaction.deleteMany({ username: user.username });
    await Notification.deleteMany({ username: user.username });
    res.send("Record deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
