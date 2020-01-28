/**
 * This service is fetching two streams by making two authenticated HTTP-GET requests to the Pryv.io API.
 * Its input are two objects embedding accounts credentials with username and token.
 * Its corresponding output is an array of the the two concatenated streams.
 */

/**
 * Required External Module
 */
const fetch = require('node-fetch');



// After requests execution this function is waiting on four promises in total.
// The first two promises received have each another nested promise.
const fetchStream = async function (userAccount) {
    try {
        const streamResponse = await fetch(
            `https://${userAccount.username}.pryv.me/streams?auth=${userAccount.token}`);
        return (await streamResponse.json());
        // throw new Error('whoops');
    } catch (e) {
        throw (e);
    };
};



module.exports = fetchStream;