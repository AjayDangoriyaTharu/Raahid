const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/user");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User Already Exist",
        sucess: false,
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const userModel = new UserModel({ name, email, password: hashpassword });

    await userModel.save();

    res.status(201).json({
      message: "SignUp Sucessfully",
      sucess: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error ",
      sucess: false,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    const ErrorUserNotMsg = "User Not Found";
    const ErrorMsg = "Auth Falied--Invalid Credential ";
    if (!user) {
      return res.status(403).json({
        message: ErrorUserNotMsg,
        sucess: false,
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(403).json({
        message: ErrorMsg,
        sucess: false,
      });
    }

    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "LogIn Sucessfully",
      sucess: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      sucess: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
