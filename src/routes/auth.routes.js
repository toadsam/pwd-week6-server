const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/profile', ctrl.profile);

module.exports = router;

