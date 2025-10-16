const router = require('express').Router();
const ctrl = require('../controllers/submissions.controller');

router.get('/', ctrl.getAll);
router.post('/', ctrl.create);
router.post('/:id/review', ctrl.review);

module.exports = router;

