const express = require('express');
const router = express.Router();

const groupAController = require ('../controllers/groupA');

router.get('/', groupAController.getAll);

router.get('/:id', groupAController.getSingle);

module.exports = router;