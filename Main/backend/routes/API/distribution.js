const router = require('express').Router();
const auth = require("../../middleware/auth");
let Temp = require('../../models/survey/surveyTemp.model');
let User = require('../../models/user.model');
let surveyDis = require("../../models/survey/surveyDis.model")
// let Page = require('../../models/survey/pageTemp.model');
// let Question = require('../../models/survey/questionTemp.model');
const mongoose = require('mongoose');


//your code here
router.post("/mydistribution", auth, async (req, res) => {
    try {
      const {docID} = req.body; 
      var list = []
      await Temp.find({'docID':docID}, (err, docs) =>{
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

module.exports = router;