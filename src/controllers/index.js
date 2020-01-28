/**
 * This controller prepares its HTTP requests data objects input
 * to be used by two chained asynchronous services. 
 * The corresponding output is directly forwarded to the client.
 */

// Required services
const { fetchStream, saveEvent } = require('../services');
const _async = require('async');

/** 
 * This function chained two asynchronous services.
 * The first fetches two Stream structures in parallel.
 * The second creates and saves an an Event structure with the concatenated streams.
 * The function's input contains credentials information used by the services
 * from which the final output is forwarded to the client in the HTTP response function input.
 */
const saveStreamstoEvent = async function (req, res) {
  const userAccounts = (({ source, backup }) => ({ source, backup }))(req.body);
  try {
    const streamsResp = await _async.concatLimit(userAccounts, 2, fetchStream);
    const eventResp = await saveEvent(userAccounts.backup,
      streamsResp[0].streams.concat(streamsResp[1].streams));
    res.send(eventResp);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  };
};

module.exports = {
  saveStreamstoEvent
};