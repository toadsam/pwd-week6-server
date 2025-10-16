const router = require('express').Router();
const ctrl = require('../controllers/users.controller');

router.get('/', ctrl.getAll);
router.post('/:id/role', ctrl.changeRole);

module.exports = router;

