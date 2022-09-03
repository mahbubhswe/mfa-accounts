import Instalment from "../../../models/Instalment.js";
import nextConnect from "next-connect";
import connectMongo from "../../../utils/connectMongo.js";
import { isAuth, isAdmin } from "../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.use(isAdmin);
handler.put(async (req, res, next) => {
  try {
    await connectMongo();
    await Instalment.findByIdAndUpdate(
      { _id: req.query.id },
      {
        ...req.body,
      }
    );
    res.send("Instalment updeted successfully!");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
