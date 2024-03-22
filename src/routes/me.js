const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');
//slug là sockpass
router.get('/stored/posters', meController.storedPosters);
router.get('/trash/posters', meController.trashPosters);

module.exports = router;