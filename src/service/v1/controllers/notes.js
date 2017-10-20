const repository = require('../../repository/notes/mongoNotesAPI.js');

const errorMessage = (stringAction) => {
  const error = {
    type: 'error',
    message: `could not ${stringAction} note(s)`,
  };
  return error;
};

const get = (req, res) => {
  const id = req.params.id;
  repository.get(id, (err, note) => {
    if (err) {
      res.status(404).json(errorMessage('find'));
    } else {
      res.status(200).json({ note });
    }
  });
};

const getAll = (req, res) => {
  repository.getAll((err, notes) => {
    if (err) {
      res.status(404).json(errorMessage('find'));
    } else {
      res.status(200).json(notes);
    }
  });
};

const add = (req, res) => {
  const note = req.body;
  repository.add(note, (err, id) => {
    if (err) {
      res.status(404).json(errorMessage('add'));
    } else {
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

const update = (req, res) => {
  const id = req.params.id;
  const note = req.body;
  repository.update(id, note, (err) => {
    if (err) {
      res.status(404).json(errorMessage('update'));
    } else {
      res.status(204).send();
    }
  });
};

module.exports = {
  get,
  getAll,
  add,
  remove,
  update,
};
