const router = require("express").Router();
let Survey = require("../../models/survey/survey.model");
let User = require("../../models/user.model");
const auth = require("../../middleware/auth");
const SurveyDis = require("../../models/survey/surveyDis.model");
const gpt2Main = "main.py"
const pythonPath = "D:/duter/Documents/GitHub/NEUROSOFT/Main/backend/middleware/GPT2/venv/Scripts/python.exe"

router.get("/", auth, async (req, res) => {
  const distIDList = await SurveyDis.find({ docID: req.user }).distinct("_id");

  Survey.find({ surveyDisID: { $in: distIDList } })
    .then((surveys) => res.json(surveys))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const result = JSON.stringify(req.body.result);
  const userId = req.body.user;
  const distId = req.body.distID;
  var summary = "Pending Summary...";

  const execSync = require("child_process").execSync;
  const pythonProcess = execSync(
    `${pythonPath} ${gpt2Main} generateSummary ${result}`, 
    {cwd:`${__dirname}/../../middleware/GPT2`}
  );
  summary = pythonProcess.toString("utf8")

  // console.log(req.body.user)
  const newSurvey = new Survey({
    paID: userId,
    result: result,
    summary: summary,
    surveyDisID: distId,
  });
  // console.log(newSurvey)
  const changeComplete = async () => {
    const dist = await SurveyDis.findById(distId);
    var palist = dist.patients;
    for (i = 0; i < palist.length; i++) {
      if (palist[i].paID == userId) {
        palist[i].completed = true;
        break;
      }
    }
    await SurveyDis.findByIdAndUpdate(
      distId,
      { patients: palist },
      { runValidators: true },
      (err, doc) => {
        if (err) console.log(err);
      }
    );
  };
  changeComplete();
  newSurvey
    .save()
    .then(() => res.json("Survey added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get survey by id
router.route('/:id').get((req, res) => {
  Survey.findById(req.params.id)
    .then((survey) => res.json(survey))
    .catch((err) => res.status(400).json("Error: " + err));
});

// delete survey by id
router.route('/:id').delete((req, res) => {
  Survey.findByIdAndDelete(req.params.id)
    .then(() => res.json("Survey deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// update survey by id
router.route('/update/:id').post((req, res) => {
  Survey.findById(req.params.id)
    .then((survey) => {
      survey
        .save()
        .then(() => res.json("Survey updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// view survey
router.post("/view", async (req, res) => {
  try {
    // get elements to validate the view request
    const survey = await Survey.findById(req.survey);

    res.json(survey);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

// Completed Survey list
router.post("/mysurveys", auth, async (req, res) => {
  try {
    const { PaID } = req.body;
    // console.log(PaID)
    const Pa = await User.findById(PaID);
    if (Pa.userType !== "patient") {
      return res.status(400).json({ msg: "This user is not a patient." });
    }
    var list = [];
    Survey.find({ paID: PaID }, (err, docs) => {
      list = docs;
      // console.log(list)
    }).then(() => {
      list = list.map((x) => {
        const { _doc } = x;
        const { result, ...rest } = _doc;
        // console.log(rest)
        return rest;
      });
      // console.log(list)
      return res.status(200).json(list);
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
