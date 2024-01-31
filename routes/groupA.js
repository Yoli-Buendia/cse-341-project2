const express = require('express');
const router = express.Router();

const groupAController = require ('../controllers/groupA');

router.get('/', groupAController.getAll);

router.get('/:id', groupAController.getSingle);

router.post('/', groupAController.createUser);

router.put('/:id', groupAController.updateUser);

router.delete('/:id', groupAController.deleteUser);

module.exports = router;