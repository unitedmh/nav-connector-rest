const express = require('express');
const router = express.Router();
const apiController = require('../app/api/controllers/api');
const cache = require('../cache'); // Cache Middleware

router.get('/:type/:id', cache.cache(10), apiController.get);
router.post('/:type/:id', apiController.post);
router.get('/clearcache', cache.clear(), apiController.clear);

module.exports = router;