import Instalment from "../../../models/Instalment.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const instalment = await Instalment.findOne({
      instalment: req.query.instalment,
    });
    res.send(instalment);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
