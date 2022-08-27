import Notification from "../../../models/Notification.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const notification = await Notification.findOne({
      username: req.query.username,
    });
    res.send(notification);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default handler;
