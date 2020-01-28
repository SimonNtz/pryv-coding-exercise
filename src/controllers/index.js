/**
 * This controller prepares the data received from the client's HTTP requests
 * to be used by the services methods. After completition, it foward its output to the client.
 */

// Required services
const { fetchStreams, saveEvent } = require('../services');

// This function is chaining two asynchronous calls to services.
const saveStreamstoEvent = async function (req, res) {
    const { source, backup } = req.body;
    try {
        const streamsResp = await fetchStreams(source, backup);
        const eventResp = await saveEvent(backup, 
            streamsResp[0].streams.concat(streamsResp[1].streams));
        res.json(eventResp);
    } catch (e) {
        console.error('Error while fetching stream or saving event', e);
        res.sendStatus(500);
    }
};

module.exports = {
    saveStreamstoEvent
};
