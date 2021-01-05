const router = require("express").Router();
const auth = require("../../middleware/auth");
let Temp = require("../../models/survey/surveyTemp.model");
let User = require("../../models/user.model");
let surveyDis = require("../../models/survey/surveyDis.model");
const mongoose = require("mongoose");

//add new distribution
router.post("/add", auth, async (req, res) => {
  const { docID, tempID, patients, dueDate } = req.body;

  const newDis = new surveyDis({
    docID: docID,
    tempID: tempID,
    patients: patients,
    dueDate: dueDate ? dueDate : undefined,
  });

  try {
    let distObj = await newDis.save()
    console.log(distObj);
    const distID = distObj._id;
    //for each patients add dist id to thier account
    patients.forEach((p) => {
      User.findByIdAndUpdate(
        p.paID,
        { $push: { relatedDist: distID } },
        { safe: true, upsert: true, new: true },
        function (err, model) {
          console.log(model)
          if (err) console.log(err);
        }
      );
    });
    res.json(distObj);
  } catch (err) {
    (err) => res.status(400).json("Error: " + err)
  }
});

//your code here
router.post("/mydistribution", auth, (req, res) => {
    try {
      const {docID} = req.body; 
      console.log(docID)
      var list = []
      SurveyDis.find({'docID':docID}, (err, docs) =>{
        list = docs
        console.log(docs)
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


module.exports = router;
