import Payment from "../../../models/Payment.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const oneRecord = await Payment.findOne({
      _id: req.query.id,
    });
      if (oneRecord) {
          res.status(200).send(oneRecord);
      }
  } catch (error) {
     res.send(error.message);
  }
});

export default handler;
