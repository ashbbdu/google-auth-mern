const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../models/User");

module.exports.signup = async (req, res) => {
  if (req.body.googleAccessToken) {
    console.log("Inside signup controller");
    const { googleAccessToken } = req.body;
    console.log(googleAccessToken , "token");
    axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then(async (response) => {
        const firstName = response.data.given_name;
        const lastName = response.data.family_name;
        const email = response.data.email;
        const picture = response.data.picture;

        console.log(firstName , "firstName");

        const existingUser = await User.findOne({ email });
        console.log(existingUser , "existinguser");
        if (existingUser) {
            return res.status(400).json({ message: "User already exist!" });
        }
          
        const result = await User.create({
          verified: "true",
          email,
          firstName,
          lastName,
          profilePicture: picture,
        });

        const token = jwt.sign(
          {
            email: result.email,
            id: result._id,
          },
          "secret",
          { expiresIn: "1h" }
        );

        res.status(200).json({ result, token , msg :  "User created successfully" , success : true });
      })
      .catch((err) => {
        console.log(err , "err");
        res.status(400).json({ message: "Invalid access token!" });
      });
  } else {
    // normal form signup
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
      if (
        email === "" ||
        password === "" ||
        firstName === "" ||
        (lastName === "" &&
          password === confirmPassword &&
          password.length >= 4)
      )
        return res.status(400).json({ message: "Invalid field!" });

      const existingUser = await User.findOne({ email });

      if (existingUser)
        return res.status(400).json({ message: "User already exist!" });

      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      const token = jwt.sign(
        {
          email: result.email,
          id: result._id,
        },
        "secret",
        { expiresIn: "1h" }
      );

      res.status(200).json({ result, token, message : "User created successfully" , success : true });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
};

module.exports.signin = async (req, res) => {
  if (req.body.googleAccessToken) {
    // gogole-auth
    const { googleAccessToken } = req.body;

    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then(async (response) => {
        const firstName = response.data.given_name;
        const lastName = response.data.family_name;
        const email = response.data.email;
        const picture = response.data.picture;

        const existingUser = await User.findOne({ email });

        if (!existingUser)
          return res.status(404).json({ message: "User don't exist!" });

        const token = jwt.sign(
          {
            email: existingUser.email,
            id: existingUser._id,
          },
          "secret",
          { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingUser, token , message : "User logged in successfully" , success :  true });
      })
      .catch((err) => {
        res.status(400).json({ message: "Invalid access token!" });
      });
  } else {
    // normal-auth
    const { email, password } = req.body;
    if (email === "" || password === "")
      return res.status(400).json({ message: "Invalid field!" });
    try {
      const existingUser = await User.findOne({ email });
      console.log(existingUser);

      if (!existingUser)
        return res.status(404).json({ message: "User don't exist!" });

      const isPasswordOk = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordOk)
        return res.status(400).json({ message: "Invalid credintials!" });

      const token = jwt.sign(
        {
          email: existingUser.email,
          id: existingUser._id,
        },
        "secret",
        { expiresIn: "1h" }
      );

      res.status(200).json({ result: existingUser, token , message : "User logged in successfully" , success :  true });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
};
