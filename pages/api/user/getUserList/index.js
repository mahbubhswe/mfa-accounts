import AuthUser from "../../../../models/AuthUser.js";
import connectMongo from "../../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.get(async (req, res, next) => {
  try {
    await connectMongo();
    const user = await AuthUser.find();
    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
