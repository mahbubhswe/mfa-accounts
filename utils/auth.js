import jwt from "jsonwebtoken";
export const signToken = (user) => {
  return jwt.sign(
    {
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      userType: user.userType,
    },
    process.env.JWT_screet,
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_screet, (error, decode) => {
      if (error) {
        res.send("Token is not valid");
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.send("Token is empty");
  }
};

export const isBankUser = (req, res, next) => {
  if (req.user.userType == "bank") {
    next();
  } else {
    res.send("Only bank users are allowed to make payment");
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user.userType == "admin") {
    next();
  } else {
    res.send("User is not admin");
  }
};
