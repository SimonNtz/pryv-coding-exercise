/**
 * This service is making an authenticated HTTP POST request to the Pryv.io API.
 * Its input are an account credentials and Pryv event's data object.
 * Its corresponding output is the response of the Pryv service itself.
 */

/**
 * Required External Module
 */
const fetch = require('node-fetch');

// The POST request executed by this function sends a specific JSON object 
// with fields following the Event's Pryv API specification.
const saveEvent = async function(urlAccountInfo, eventData){
    try {
        let resp = await fetch(
            `https://${urlAccountInfo.username}.pryv.me/events?auth=${urlAccountInfo.token}`,
            {
                method: 'post',
                body:    JSON.stringify(createEventFields(eventData)),
                headers: { 'Content-Type': 'application/json' }
            });
        return(await resp.json());
    } catch(e) {
        throw new Error(e.message);
    };
}; 

function createEventFields(streamData){

    let eventBody = {"streamId": "a",
                    "type": "exercise-1/streams",
                    "content": streamData[0].streams.concat(streamData[1].streams)
                    };
    return eventBody;
};

module.exports = saveEvent;
