'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CoordSchema = new Schema({
  user: String,
  location: { type: [Number], index: '2d'}
});

module.exports = mongoose.model('Coord', CoordSchema);