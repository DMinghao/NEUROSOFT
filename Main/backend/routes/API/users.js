const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
let User = require('../../models/user.model');
const mongoose = require('mongoose');

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

//get one user by id
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    userType: user.userType,
    id: user._id,
  });
});

//get all related users of a user
router.get("/allRelated", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    relatedUsers: user.relatedUsers
  });
});

// link a doctor and a patient
//modify doctor's account document to add patient's user id
//modify patient's account document to add doctor's user id
router.post("/linkuser", auth, async (req, res) => {
  try {
    // get the doctor and the patient
    const { PatientUserID, DoctorUserID } = req.body
    const Pa = await User.findById(PatientUserID)
    const Doc = await User.findById(DoctorUserID)

    // check if this doctor already link with this patient
    if (Doc.relatedUsers.includes(PatientUserID)) {
      return res
        .status(400)
        .json({ msg: "Link between " + DoctorUserID + " and " + PatientUserID + " already exist" });
    }

    // link doctor and patient
    if (Pa && Doc) {
      console.log("1")
      // update patient's information
      User.findByIdAndUpdate(
        PatientUserID,
        { $push: { "relatedUsers": DoctorUserID } },
        { safe: true, upsert: true, new: true },
        function (err, model) {
          // console.log(model)
          if(err)console.log(err);
        }
      )

      // update doctor's information
      User.findByIdAndUpdate(
        DoctorUserID,
        { $push: { "relatedUsers": PatientUserID } },
        { safe: true, upsert: true, new: true },
        function (err, model) {
          // console.log(model)
          if(err)console.log(err);
        }
      )

      return res.status(200).json()
    } else {
      return res
        .status(400)
        .json({ msg: "User Not found" });
    }

  } catch (err) {
    res
      .status(500)
      .json({ error: err.message });
  }
})

// Unlink a doctor and a patient
//modify doctor's account document to delete patient's user id
//modify patient's account document to delete doctor's user id
router.post("/unlinkuser", auth, async (req, res) => {
  try {
    // get the doctor and the patient
    const { PatientUserID, DoctorUserID } = req.body
    const Pa = await User.findById(PatientUserID)
    const Doc = await User.findById(DoctorUserID)

    // check if this doctor links with this patient, and unlink them
    if (Pa && Doc && Doc.relatedUsers.includes(PatientUserID)) {

      // update patient's information
      User.findByIdAndUpdate(
        PatientUserID,
        { $pull: { "relatedUsers": DoctorUserID } },
        { safe: true, upsert: true, new: true },
        function (err, model) {
          console.log(model)
          if(err)console.log(err);
        }
      )

      // update doctor's information
      User.findByIdAndUpdate(
        DoctorUserID,
        { $pull: { "relatedUsers": PatientUserID } },
        { safe: true, upsert: true, new: true },
        function (err, model) {
          console.log(model)
          if(err)console.log(err);
        }
      )

      return res.status(200).json()
    } else {
      return res
        .status(400)
        .json({ msg: "Link does not exist" });
    }
    
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message });
  }
})

// get a list of a doctor's all patients
router.get("/AllPa", auth, async (req, res) => {
  const all = await User.find(
    { userType: "patient" },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        const docs = result.map(({ _doc }) => _doc)
        const out = docs.map(({ password, createdAt, updatedAt, __v, ...rest }) => rest)
        res.json(out);
      }
    })
})

module.exports = router;
