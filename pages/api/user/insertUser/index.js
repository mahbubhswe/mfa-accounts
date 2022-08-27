import AuthUser from "../../../../models/AuthUser.js";
import nextConnect from "next-connect";
import bcryptjs from "bcryptjs";
import connectMongo from "../../../../utils/connectMongo.js";
import {isAuth,isAdmin} from "../../../../utils/auth.js";
const handler = nextConnect();
handler.use(isAuth);
handler.use(isAdmin);
handler.post(async (req, res, next) => {
  try {
    await connectMongo();
    const newAuthUser = new AuthUser({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password),
      isAdmin: req.body.isAdmin
    });
    await newAuthUser.save();
    return res.status(200).json("User added successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default handler;
