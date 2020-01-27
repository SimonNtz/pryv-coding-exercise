/**
 * This controller prepares the data received from the client's HTTP requests
 * to be used by the services methods. It responds back directly to the client.
 */

 // Required services
const { fetchStreams , saveEvent} = require('../services');;

// This function is chaining two asynchronous calls to services.
const saveStreamstoEvent = async function(req, res, next)  {
    const {source, backup} = req.body;
    try {
      const streams = await fetchStreams(source, backup);
      const eventResp = await saveEvent(backup, streams);
      res.send(eventResp);
      next();
    } catch(e) {
      console.log(e.message);
      res.sendStatus(500) && next(error);
    };
  };
   
module.exports = {
    saveStreamstoEvent
};