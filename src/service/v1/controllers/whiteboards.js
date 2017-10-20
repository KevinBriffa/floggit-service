const repository = require('../../repository/whiteboard/mongoWhiteboardAPI.js');

const errorMessage = (stringAction) => {
  const error = {
    type: 'error',
    message: `could not ${stringAction} note(s)`,
  };
  return error;
};

const getAll = (req, res) => {
  repository.getAll((err, whiteboards) => {
    if (err) {
      res.status(404).json(errorMessage('find'));
    } else {
      res.status(200).json(whiteboards);
    }
  });
};

const add = (req, res) => {
  const whiteboard = req.body;
  repository.add(whiteboard, (err, id) => {
    if (err) {
      res.status(404).json(errorMessage('add'));
    } else {
      console.log(id);
      res.status(201).json({ id });
    }
  });
};

const remove = (req, res) => {
  const id = req.params.id;
  repository.remove(id, (err) => {
    if (err) {
      res.status(404).json(errorMessage('remove'));
    } else {
      res.status(204).send();
    }
  });
};

module.exports = {
  getAll,
  add,
  remove,
};
