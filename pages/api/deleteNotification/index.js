import Notification from "../../../models/Notification.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.delete(async (req, res, next) => {
  try {
    await connectMongo();
    await Notification.deleteOne({ _id: req.query.id });
    return res.status(200).json("Notification deleted successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default handler;
