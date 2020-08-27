const router = require('express').Router();
let Survey = require('../../models/survey/survey.model');

router.route('/').get((req, res) => {
  Survey.find()
    .then(surveys => res.json(surveys))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const result = JSON.stringify(req.body.result);
  const userId = req.body.user;
  console.log(req.body.user)
  const newSurvey = new Survey({paID: userId, result : result});
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

module.exports = router;
