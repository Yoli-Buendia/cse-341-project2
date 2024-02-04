const express = require('express');
const router = express.Router();

const groupAController = require ('../controllers/groupA');
const validation = require('../middleware/validate');

router.get('/', groupAController.getAll);

router.get('/:id', groupAController.getSingle);

router.post('/', validation.saveContact, groupAController.createUser);

router.put('/:id', validation.saveContact, groupAController.updateUser);

router.delete('/:id', groupAController.deleteUser);

module.exports = router;