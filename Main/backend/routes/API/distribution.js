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
    const { docID } = req.body;
    console.log(req.body)
    var list = []
    surveyDis.find({ 'docID': docID }, (err, docs) => {
      list = docs
      console.log(docs)
    }).then(() => {
      list = list.map(x => {
        const { _doc } = x
        const { template, createdAt, updatedAt, __v, ...rest } = _doc
        return rest
      })
      return res.status(200).json(list)
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: error.message });
  }

});
    

router.post("/pendingsurvey", auth, async (req, res) => {
  try {
    const { paID } = req.body;
    const patient = await User.findById(paID);
    //console.log(patient)
    //var patienttojson = JSON.parse(patient)
    //console.log(patienttojson)
    //const { _doc } = patienttojson
    var list = []
    // list = patient.relatedDist
    try {list = patient.relatedDist}
    catch(e) {res.status(201).json({message: "This patient has no distribution in Hartford Healthcare"})}
    
    var temlist = []
    //console.log(list)
    for (i = 0; i < list.length; i++){
      var id = list[i]
      const dist = await surveyDis.findById(id)
      const palist = dist.patients
      palist.forEach(pa => {
        if (pa.paID == paID && pa.completed == false) {
          var dueDate = dist.hasOwnProperty('dueDate') ? dist.dueDate: ""
          var item = {distID: dist._id, tempID: dist.tempID, dueDate: dueDate}
          temlist.push(item)
          //console.log(dist.tempID)
        }
      })
    }
    res.status(200).json(temlist)
  }
  catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: error.message });
  }
});
module.exports = router;
