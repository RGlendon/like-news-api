const router = require('express').Router();

const { getUser, logout } = require('../controllers/users');


router.get('/me', getUser);
router.delete('/me', logout);

module.exports = router;
