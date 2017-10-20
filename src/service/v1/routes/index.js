const express = require('express');

const notesRoute = require('./notes');
const whiteboardRoute = require('./whiteboards');

const router = express.Router();

router.use('/notes', notesRoute);
router.use('/whiteboards', whiteboardRoute);

module.exports = router;
