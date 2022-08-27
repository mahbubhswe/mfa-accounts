import Notification from "../../../models/Notification.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.post(async (req, res, next) => {
  try {
    await connectMongo();
    const newNotification = new Notification({
      username: req.body.username,
      tansactionType: req.body.tansactionType,
      amount: req.body.amount
    });
    await newNotification.save();
   res.send("Notification added successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default handler;
