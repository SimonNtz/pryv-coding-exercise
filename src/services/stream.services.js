/**
 * This service is making two authenticated HTTP GET requests to the Pryv.io API.
 * Its input are two objects embedding accounts credentials with username and token.
 * Its corresponding output is an array of the the two concatenated streams.
 */

/**
 * Required External Module
 */
const fetch = require('node-fetch');

// After requests execution this function is waiting on four promises in total.
// The first two promises received have each another nested promise.
async function fetchStreams(sourceAccount, backupAccount) {
    try {
        let streamsArray = await Promise.all([
            fetch(`https://${sourceAccount.username}.pryv.me/streams?auth=${sourceAccount.token}`),
            fetch(`https://${backupAccount.username}.pryv.me/streams?auth=${backupAccount.token}`),
        ]);
        let streamsJson = await Promise.all([
            streamsArray[0].json(),
            streamsArray[1].json()
        ]);
        return streamsJson;
    } catch(e) {
        throw new Error(e.message);
    };
};

module.exports = fetchStreams;