import AuthUser from "../../../../models/AuthUser.js";
import nextConnect from "next-connect";
import connectMongo from "../../../../utils/connectMongo.js";
import { isAuth, isAdmin } from "../../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.use(isAdmin);
handler.put(async (req, res, next) => {
  try {
    await connectMongo();
    await AuthUser.findByIdAndUpdate(
      { _id: req.query.id },
      { $set: { hasUpdatePer: !req.body.hasUpdatePer } }
    );
    res.send("Update permission has been changed successfully");
  } catch (error) {
    console.log(error.message);
  }
});

export default handler;
