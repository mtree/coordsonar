/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Coord = require('./coord.model');

exports.register = function(socket) {
  Coord.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Coord.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('coord:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('coord:remove', doc);
}