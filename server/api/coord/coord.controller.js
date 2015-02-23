'use strict';

var _ = require('lodash');
var Coord = require('./coord.model');

// Get list of coords
exports.index = function(req, res) {
  Coord.find(function (err, coords) {
    if(err) { return handleError(res, err); }
    return res.json(200, coords);
  });
};

// Get a single coord
exports.show = function(req, res) {
  Coord.findById(req.params.id, function (err, coord) {
    if(err) { return handleError(res, err); }
    if(!coord) { return res.send(404); }
    return res.json(coord);
  });
};

exports.target = function(req, res) {
  var coordinates = [ 19.46846008, 51.75168965 ];
  if(req.method === 'POST') {
    coordinates = [req.body.lng, req.body.lat];
  }
  Coord.find({ location:
    {
      $nearSphere: {
         $geometry: {
            type : "Point",
            coordinates : coordinates
         },
         $minDistance: 0,
         $maxDistance: 10000
      }
    }
  },
  function (err, coords) {
    if(err) { return handleError(res, err); }
    var coords_restruct = [];
    coords.forEach(function (item, index) {
      coords_restruct.push({
        id: index,
        title: item.user,
        latitude: item.location[1],
        longitude: item.location[0],
      });
    });
    return res.json(200, coords_restruct);
  });
}


// // Creates a new coord in the DB.
// exports.create = function(req, res) {
//   Coord.create(req.body, function(err, coord) {
//     if(err) { return handleError(res, err); }
//     return res.json(201, coord);
//   });
// };

// // Updates an existing coord in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Coord.findById(req.params.id, function (err, coord) {
//     if (err) { return handleError(res, err); }
//     if(!coord) { return res.send(404); }
//     var updated = _.merge(coord, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.json(200, coord);
//     });
//   });
// };

// // Deletes a coord from the DB.
// exports.destroy = function(req, res) {
//   Coord.findById(req.params.id, function (err, coord) {
//     if(err) { return handleError(res, err); }
//     if(!coord) { return res.send(404); }
//     coord.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };

function handleError(res, err) {
  return res.send(500, err);
}