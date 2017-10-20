const express = require('express');

const whiteboardController = require('../controllers/whiteboards');

const router = express.Router();

router.get('/', whiteboardController.getAll);
router.post('/', whiteboardController.add);
router.delete('/:id', whiteboardController.remove);

module.exports = router;
