import nextConnect from "next-connect";
import AuthUser from "../../../../models/AuthUser.js";
import connectMongo from "../../../../utils/connectMongo.js";
import { isAuth } from "../../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.put(async (req, res, next) => {
  try {
    await connectMongo();
    await AuthUser.findByIdAndUpdate({ _id: req.body.id }, { ...req.body });
    res.send("User updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
