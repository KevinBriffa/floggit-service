const Note = require('./notes');
const logger = require('../../../utils/helpers/logger');

const mongoNotesAPI = {};

mongoNotesAPI.add = (value, callback) => {
  console.log(value.whiteboardId);
  const note = new Note({
    title: value.title,
    information: value.information,
    color: value.color,
    whiteboardId: value.whiteboardId,
  });

  note.save({}, (err, addedNote) => {
    if (err) {
      logger.error(err);
      callback(err);
    } else {
      logger.info('note added');
      callback(null, addedNote.id);
    }
  });
};

mongoNotesAPI.get = (id, callback) => {
  Note.findById(id, (err, noteFound) => {
    if (err) {
      logger.error(err);
      callback(err);
    } else if (noteFound === null) {
      logger.error('note not found');
      callback(new Error('note not found'));
    } else {
      logger.info('note retrieved');
      callback(null, noteFound);
    }
  });
};

mongoNotesAPI.getAll = (callback) => {
  Note.find({}, (err, notes) => {
    if (err) {
      logger.error(err);
      callback(err);
    } else if (notes === null) {
      logger.error('note not found');
      callback(new Error('note not found'));
    } else {
      logger.info('all notes retrieved');
      callback(null, notes);
    }
  });
};

mongoNotesAPI.remove = (id, callback) => {
  Note.remove({
    _id: id,
  }, (err, removedNote) => {
    if (err) {
      logger.error(err);
      callback(err);
    } else if (removedNote === null) {
      logger.error('note not found');
      callback(new Error('note not found'));
    } else {
      logger.info('note removed');
      callback(null, removedNote);
    }
  });
};

mongoNotesAPI.update = (id, note, callback) => {
  Note.findByIdAndUpdate(id, note, (err, noteFound) => {
    if (err) {
      logger.error(err);
      callback(err);
    } else if (noteFound === null) {
      logger.error('note not found');
      callback(new Error('note not found'));
    } else {
      logger.info('note updated');
      callback(null, noteFound);
    }
  });
};

module.exports = mongoNotesAPI;
