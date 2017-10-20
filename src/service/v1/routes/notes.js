const express = require('express');

const notesController = require('../controllers/notes');

const router = express.Router();

router.get('/', notesController.getAll);
router.get('/:id', notesController.get);
router.post('/', notesController.add);
router.put('/:id', notesController.update);
router.delete('/:id', notesController.remove);

module.exports = router;
