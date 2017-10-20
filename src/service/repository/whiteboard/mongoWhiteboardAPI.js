const Whiteboard = require('./whiteboard');
const logger = require('../../../utils/helpers/logger');

const mongoNotesAPI = {};

mongoNotesAPI.add = (value, callback) => {
  const whiteboard = new Whiteboard({
    title: value.title,
  });

  whiteboard.save({}, (err, addedWhiteboard) => {
    if (err) {
      logger.error(err);
      callback(err);
    } else {
      logger.info('note added');
      callback(null, addedWhiteboard.id);
    }
  });
};

mongoNotesAPI.getAll = (callback) => {
  Whiteboard.find({}, (err, whiteboards) => {
    if (err) {
      logger.error(err);
      callback(err);
    } else if (whiteboards === null) {
      logger.error('note not found');
      callback(new Error('note not found'));
    } else {
      logger.info('all notes retrieved');
      callback(null, whiteboards);
    }
  });
};

mongoNotesAPI.remove = (id, callback) => {
  Whiteboard.remove({
    _id: id,
  }, (err, removedWhiteboard) => {
    if (err) {
      logger.error(err);
      callback(err);
    } else if (removedWhiteboard === null) {
      logger.error('note not found');
      callback(new Error('note not found'));
    } else {
      logger.info('note removed');
      callback(null, removedWhiteboard);
    }
  });
};


module.exports = mongoNotesAPI;
