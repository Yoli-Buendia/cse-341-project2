const express = require('express');
const router = express.Router();

const groupAController = require ('../controllers/groupA');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', groupAController.getAll);

router.get('/:id', groupAController.getSingle);

router.post('/', isAuthenticated, validation.saveContact, groupAController.createUser);

router.put('/:id', isAuthenticated, validation.saveContact, groupAController.updateUser);

router.delete('/:id', isAuthenticated, groupAController.deleteUser);

module.exports = router;