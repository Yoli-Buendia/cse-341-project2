const express = require('express');
const router = express.Router();

const groupBController = require ('../controllers/groupB');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', groupBController.getAll);

router.get('/:id', groupBController.getSingle);

router.post('/', isAuthenticated, validation.saveContact, groupBController.createUser);

router.put('/:id', isAuthenticated, validation.saveContact, groupBController.updateUser);

router.delete('/:id', isAuthenticated, groupBController.deleteUser);

module.exports = router;