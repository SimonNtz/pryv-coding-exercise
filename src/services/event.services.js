/**
 * This service is saving an Event structure using authenticated HTTP-POST
 * calls to the Pryv.io API. Its inputs are used for request authentication and
 * to fill the Event structure content.
 * Its output is the response of the Pryv service itself.
 */

/**
 * Required External Module
 */
const fetch = require('node-fetch');

const saveEvent = async function (urlAccountInfo, eventData) {
    try {
        const resp = await fetch(
            `https://${urlAccountInfo.username}.pryv.me/events?auth=${urlAccountInfo.token}`,
            {
                method: 'post',
                body: JSON.stringify(createEventFields(eventData)),
                headers: { 'Content-Type': 'application/json' }
            }
        );
        return await resp.json();
    } catch (e) {
        throw new Error(e.message);
    }
};

function createEventFields(eventContent) {
    const eventBody = {
        streamId: 'a',
        type: 'exercise-1/streams',
        content: eventContent
    };

    return eventBody;
}

module.exports = saveEvent;
