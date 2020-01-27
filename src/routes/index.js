/**
 * A router with a single route listening on a path '/data' and receiving HTTP POST request.
 * The data input of request is consumed by the controllers module function.
 */

/**
 * Required External Modules
 */
const express = require('express');
const { saveStreamstoEvent } = require('../controllers');

const router = express.Router();

// Route Definition
 router.post('/data', saveStreamstoEvent);

module.exports = router;
