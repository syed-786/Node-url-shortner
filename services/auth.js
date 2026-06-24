// const sessionIdToUserMap = new Map();    //for sessionId authentication

const jwt = require("jsonwebtoken");
const secret = "Syed@hacker$786$";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret,
  );
  // return sessionIdToUserMap.set(id, user);   //for sessionId authentication
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secret);

  // return sessionIdToUserMap.get(id);     //for sessionId authentication
}

module.exports = {
  setUser,
  getUser,
};
