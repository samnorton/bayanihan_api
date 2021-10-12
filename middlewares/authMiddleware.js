const { verify } = require("jsonwebtoken");

exports.checkToken = async (req, res, next) => {
  try {
    let token = await req.get("authorization");
    if (token) {
      token = token.slice(7);
      let decoded = verify(token, "qwe1234");
      if (!decoded) {
        res.status(401).json({
          success: 0,
          message: "Invalid token!",
        });
      } else {
        next();
      }
    } else {
      res.status(401).json({
        success: 0,
        message: "Access denied! Unathorized user",
      });
    }
  } catch (error) {
    return;
  }
};
