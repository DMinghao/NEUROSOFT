const router = require('express').Router();
const auth = require("../../middleware/auth");
let Temp = require('../../models/survey/surveyTemp.model');
let User = require('../../models/user.model');
let surveyDis = require("../../models/survey/surveyDis.model")
// let Page = require('../../models/survey/pageTemp.model');
// let Question = require('../../models/survey/questionTemp.model');
const mongoose = require('mongoose');
const SurveyDis = require('../../models/survey/surveyDis.model');

router.post("/add", auth, (req, res) => {
  const { docID,  tempID, patients, dueDate } = req.body;
  const newDis = new surveyDis({
       docID: docID,
       tempID: tempID,
       patient: patients,
       dueDate : dueDate? dueDate : undefined
      }) 
  newDis
    .save()
    .then((createdDis)=>
    res.json({createdDis})
    )
    .catch((err)=> res.status(400).json("Error: " + err));
})

module.exports = router;

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