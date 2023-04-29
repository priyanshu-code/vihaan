const { BadRequestError, NotFoundError, UnauthenticatedError } = require("../errors");
const User = require("../models/user");

const registerUser = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    throw new BadRequestError("Please provide all fields");
  }
  let file = "";
  if (req.file !== undefined) {
    file = req.file.filename;
  }
  const user = await User.create({
    ...req.body,
    picturePath: file,
  });
  delete user.password;
  res.status(200).send({ user, msg: "User create successfully" });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all fields");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new NotFoundError(`No user with email ${email}`);
  }
  const auth = await user.comparePassword(password);
  if (!auth) {
    throw new UnauthenticatedError(`Wrong password`);
  }
  const { username, firstname, lastname, picturePath } = user;
  const token = user.createJWT();
  return res.status(200).send({ token, username, firstname, lastname, email, picturePath });
};

module.exports = { registerUser, loginUser };
