const { User } = require("../models/userModel");
// const { v4: uuidv4 } = require("uuid");        //for sessionId authentication
const { setUser } = require("../services/auth");

async function userSignUp(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}

async function userLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  console.log("user in login controller", user);
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }

  // const sessionId = uuidv4();    //for sessionId authentication
  // setUser(sessionId, user);      //for sessionId authentication
  // res.cookie("uid", sessionId);  //for sessionId authentication

  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports = {
  userSignUp,
  userLogin,
};
