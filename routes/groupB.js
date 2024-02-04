const express = require('express');
const router = express.Router();

const groupBController = require ('../controllers/groupB');
const validation = require('../middleware/validate');

router.get('/', groupBController.getAll);

router.get('/:id', groupBController.getSingle);

router.post('/', validation.saveContact, groupBController.createUser);

router.put('/:id', validation.saveContact, groupBController.updateUser);

router.delete('/:id', groupBController.deleteUser);

module.exports = router;