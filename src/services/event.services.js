/**
 * This service is making an authenticated HTTP-POST request to the Pryv.io API.
 * Its inputs are respectively an account credential and an Event stucture.
 * Its corresponding output is the response of the Pryv.io API service itself.
 */

/**
 * Required External Module
 */
const fetch = require('node-fetch');

/**
 * 
 * The HTTP-POST call of this function sends a JSON object 
 * with filled Event structure. This HTTP-request is authenticated
 * according to the crendential passed through the first function's argument.
 */

const saveEvent = async function (urlAccountInfo, eventData) {
    try {
        let resp = await fetch(
            `https://${urlAccountInfo.username}.pryv.me/events?auth=${urlAccountInfo.token}`,
            {
                method: 'post',
                body: JSON.stringify({
                    "streamId": "a",
                    "type": "exercise-1/streams",
                    "content": eventData
                }),
                headers: { 'Content-Type': 'application/json' }
            });
        return (await resp.json());
    } catch (e) {
        throw (e);
    };
};

module.exports = saveEvent;
