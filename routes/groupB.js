const express = require('express');
const router = express.Router();

const groupBController = require ('../controllers/groupB');

router.get('/', groupBController.getAll);

router.get('/:id', groupBController.getSingle);

router.post('/', groupBController.createUser);

router.put('/:id', groupBController.updateUser);

router.delete('/:id', groupBController.deleteUser);

module.exports = router;