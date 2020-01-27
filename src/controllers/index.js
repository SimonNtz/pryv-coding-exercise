/**
 * This controller prepares the data received from the client's HTTP requests
 * to be used by the services methods. It responds back directly to the client.
 */

 // Required services
const { fetchStream , saveEvent} = require('../services');
const _async = require('async');

// This function is chaining two asynchronous calls to services.
const saveStreamstoEvent = async function(req, res, next)  {
    const userAccounts = (({source, backup}) => ({source, backup}))(req.body);
    try {
      const streamsResp  = await _async.concatLimit(userAccounts, 2, fetchStream);
      const eventResp = await saveEvent(userAccounts.backup,
        streamsResp[0].streams.concat(streamsResp[1].streams));
      res.send(eventResp);
    } catch(e){
      console.log(e.message);
      res.sendStatus(500);
    };
};

module.exports = {
    saveStreamstoEvent
};