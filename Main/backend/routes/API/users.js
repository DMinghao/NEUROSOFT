const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
let User = require('../../models/user.model');

// register a new user
router.post("/register", async (req, res) => {
  try {
    // get elements to validate the register request
    let { email, password, userType, firstname, lastname } = req.body;

    // check all elelments for a new user
    if (!email || !password || !userType || !firstname || !lastname) {
      return res
        .status(400)
        .json({ msg: "Not all fields have been entered." });
    }

    // check if this email already been registered
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }

    // use bcrypt to avoid hackers get our password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      email,
      password: passwordHash,
      userType,
      firstname,
      lastname
    });

    // save new user
    const savedUser = await newUser.save();
    res.json(savedUser);

  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: err.message });
  }
});


// login a registered user
router.post("/login", async (req, res) => {
  try {
    // get elements to validate the login request
    const { email, password } = req.body;

    // check email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Not all fields have been entered." });
    }

    // check if this user has been registered
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    }

    // check if password is match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials." });
    }

    // create a token for logged user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        userType: user.userType
      },
    });

  } catch (err) {
    res
      .status(500)
      .json({ error: err.message });
  }
});

// delete a logged user
router.delete("/delete", auth, async (req, res) => {
  try {
    // check if there is a logged user and delete it
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);

  } catch (err) {
    res
      .status(500)
      .json({ error: err.message });
  }
});

// check if token is valid
router.post("/tokenIsValid", async (req, res) => {
  try {
    // check if there is a token
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }

    // check if the token is verified
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }

    // check if there is user for this token
    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    }

    return res.json(true);

  } catch (err) {
    res
      .status(500)
      .json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    firstname: user.firstname,
    lastname: user.lastname,
    userType: user.userType,
    id: user._id,
  });
});

module.exports = router;
