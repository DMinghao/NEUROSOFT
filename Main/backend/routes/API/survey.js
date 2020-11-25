const router = require('express').Router();
let Survey = require('../../models/survey/survey.model');
let User = require('../../models/user.model');
const auth = require("../../middleware/auth");

router.route('/').get((req, res) => {
  Survey.find()
    .then(surveys => res.json(surveys))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const result = JSON.stringify(req.body.result);
  const userId = req.body.user;
  console.log(req.body.user)
  const newSurvey = new Survey({ paID: userId, result: result });
  console.log(newSurvey)

  newSurvey.save()
    .then(() => res.json('Survey added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Survey.findById(req.params.id)
    .then(survey => res.json(survey))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Survey.findByIdAndDelete(req.params.id)
    .then(() => res.json('Survey deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Survey.findById(req.params.id)
    .then(survey => {
      // exercise.username = req.body.username;
      // exercise.description = req.body.description;
      // exercise.duration = Number(req.body.duration);
      // exercise.date = Date.parse(req.body.date);

      survey.save()
        .then(() => res.json('Survey updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// check if user is patient


// get date and time
const dateInfo = new Date();
const date = dateInfo.toString().substring(4, 15);
const time = dateInfo.toString().substring(15, 25);

// view survey
router.post("/view", async (req, res) => {
  try {
    // get elements to validate the view request
    const survey = await Survey.findById(req.survey);

    res.json(survey);

  } catch (error) {
    res
      .status(500)
      .json({ error: err.message });
  }

});

// Completed Survey list
router.post("/mysurveys", auth, async (req, res) => {
  try {
    const { PaID } = req.body;
    console.log(PaID)
    const Pa = await User.findById(PaID);
    if (Pa.userType !== "patient") {
      return res
        .status(400)
        .json({ msg: "This user is not a patient." });
    }
    var list = []
    Survey.find({ 'paID': PaID }, (err, docs) => {
      list = docs
      // console.log(list)
    }).then(() => {
      list = list.map(x => {
        const {_doc} = x
        const { result, ...rest } = _doc
        // console.log(rest)
        return rest
      })
      // console.log(list)
      return res.status(200).json(list)
    })
  } catch (error) {
    res
      .status(500)
      .json({ error: err.message });
  }

});

module.exports = router;
