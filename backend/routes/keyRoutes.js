const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createKey, listKeys, getKey } = require('../controllers/keyController');

router.use(auth);
router.post('/', createKey);
router.get('/', listKeys);
router.get('/:id', getKey);

module.exports = router;
