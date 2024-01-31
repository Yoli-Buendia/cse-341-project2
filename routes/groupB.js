const express = require('express');
const router = express.Router();

const groupBController = require ('../controllers/groupB');

router.get('/', groupBController.getAll);

router.get('/:id', groupBController.getSingle);

module.exports = router;