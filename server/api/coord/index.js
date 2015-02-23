'use strict';

var express = require('express');
var controller = require('./coord.controller');

var router = express.Router();

router.get('/', controller.index);
// router.get('/:id', controller.show);
router.get('/target', controller.target);
router.post('/target', controller.target);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;