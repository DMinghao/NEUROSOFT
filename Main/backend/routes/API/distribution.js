const router = require("express").Router();
const auth = require("../../middleware/auth");
let Temp = require("../../models/survey/surveyTemp.model");
let User = require("../../models/user.model");
let surveyDis = require("../../models/survey/surveyDis.model");
const mongoose = require("mongoose");

//add new distribution
router.post("/add", auth, (req, res) => {
  const { docID, tempID, patients, dueDate } = req.body;

  const newDis = new surveyDis({
        docID: docID,
        tempID: tempID,
        patients: patients,
        dueDate : dueDate? dueDate : undefined
      })
      //TODO for each patients add dist id to thier account 
  newDis
    .save()
    .then((createdDis) =>
      res.json({createdDis})
    )
    .catch((err) => res.status(400).json("Error: " + err));
});



module.exports = router;
