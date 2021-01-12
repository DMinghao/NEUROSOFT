const router = require('express').Router();
const auth = require("../../middleware/auth");
let Temp = require('../../models/survey/surveyTemp.model');
let User = require('../../models/user.model');
// let Page = require('../../models/survey/pageTemp.model');
// let Question = require('../../models/survey/questionTemp.model');
const mongoose = require('mongoose');

// add a new template
router.post("/add", auth, async (req, res) => {
  try {
    // get elements to validate the add request
    const { title, docID, template } = req.body;  // mising || !questionCount

    // console.log(title)
    // console.log(docID)
    // console.log(template)

    // check all elelments for a new template
    if (!title || !docID || !template) {
      return res
        .status(400)
        .json({ msg: "Not all fields have been entered." });
    }

    // check if template has different title
    const existingTitle = await Temp.findOne({ title: title });
    if (existingTitle) {
      return res
        .status(400)
        .json({ msg: "An template with this title already exists." });
    }

    // check if user is doctor
    const Doc = await User.findById(docID);
    if (Doc.userType !== "doctor") {
      return res
        .status(400)
        .json({ msg: "This user is not a doctor." });
    }

    // get date and time, #but missing timezone#
    const dateInfo = new Date();
    const date = dateInfo.toString().substring(4, 15);
    const time = dateInfo.toString().substring(15, 25);

    // create new template
    const newTemplate = new Temp({
      title,
      date,
      time,
      docID,
      template
    });

    // save new template
    const savedTemplate = await newTemplate.save();
    res.json(savedTemplate);

  } catch (error) {
    res
      .status(500)
      .json({ error: err.message });
  }

});
 
// view template
router.post("/view", auth, async (req, res) => {
  try {
    // get elements to validate the view request
    const temp = await Temp.findById(req.template);

    // return template need to be viewed
    res.json(temp);

  } catch (error) {
    res
      .status(500)
      .json({ error: err.message });
  }

});

// edit template note
router.post("/edit", async (req, res) => {
  try {
    const temp = await Temp.findById(req.template);
    res.json(temp);

  } catch (error) {
    res
      .status(500)
      .json({ error: err.message });
  }

});

//TODO await for testing 
// save a changed template
router.post("/save", async (req, res) => {
  try {
    // get elements to validate the save request
    const { title, docID, template } = req.body;
    const temp = await Temp.findById(req.template);

    // check all elelments for a new template
    if (!title || !template) {
      return res
        .status(400)
        .json({ msg: "Not all fields have been entered." });
    }

    // check if user is doctor
    const Doc = await User.findById(docID);
    if (Doc.userType !== "doctor") {
      return res
        .status(400)
        .json({ msg: "This user is not a doctor." });
    }

    // get new date and new time
    const dateInfo = new Date();
    const date = dateInfo.toString().substring(4, 15);
    const time = dateInfo.toString().substring(15, 25);

    // update the template
    User.findByIdAndUpdate(
      req.template,
      { $push: { title: title } },
      { $push: { template: template } },
      { $push: { date: date } },
      { $push: { time: time } },
    );

    return res.status(200).json();

  } catch (error) {
    res
      .status(500)
      .json({ error: err.message });
  }

});

// template list docID : list
router.post("/mytemplates", auth, async (req, res) => {
  try {
    const {docID} = req.body; 
    var list = []
    Temp.find({'docID':docID}, (err, docs) =>{
      list = docs
    }).then(()=>{
      list = list.map(x => {
        const {_doc} = x
        const {template, createdAt, updatedAt, __v, ...rest} = _doc
        return rest
      })
      return res.status(200).json(list)
    })
  } catch (error) {
    res
      .status(500)
      .json({ error: err.message });
  }

});

// delete template
router.delete("/delete", async (req, res) => {
  try {
    // check if there is a saved template and delete it
    const deletedTemp = await Temp.findByIdAndDelete(req.template);
    res.json(deletedTemp);

  } catch (error) {
    res
      .status(500)
      .json({ error: err.message });
  }

});

module.exports = router;