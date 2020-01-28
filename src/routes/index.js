/**
 * This script runs a router listening to HTTP-POST calls on a '/data' route.
 * The received requests are forwarded to a controller.
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
