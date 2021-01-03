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

  newDis
    .save()
    .then((createdDis) =>
      res.json({createdDis})
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

//TODO: new post request: 
// input: paID 
// output: templates in distribution where paID == paID

//step 1: get user relatedDist with paID
//step 2: for each distID in relatedDist, get surveyDist 
//step 3: in each surveyDist's patients array match paID, and store templates ID in an array if not complete
//step 4: return an array of tempID in JSON format 

module.exports = router;
