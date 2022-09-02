import Instalment from "../../../models/Instalment.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
import { isAuth, isAdmin } from "../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.use(isAdmin);
handler.post(async (req, res, next) => {
  try {
    await connectMongo();
    const isExist = await Instalment.findOne({
      instalment: req.body.instalment,
    });
    if (isExist) {
      res.send(`Already added instalment`);
    } else {
      const newInstalment = new Instalment({
        ...req.body,
      });
      await newInstalment.save();

      res.send("Instalment added successfully!");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
