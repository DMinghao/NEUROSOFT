const jwt = require("jsonwebtoken");

// use token to check if user has authentication
const auth = (req, res, next) => {
  try {
    // check if there is a token
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied" });
    }

    // check if the token is verified
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token authentication failed, authorization denied" });
    }

    // user has authentication
    req.user = verified.id;
    next();

  // catch err and report it
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message });
  }
};

module.exports = auth;