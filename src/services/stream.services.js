/**
 * This service is fetching two streams using using authenticated HTTP-GET calls to the Pryv.io API.
 * Its input are two objects embedding account credentials that are used in the request.
 * Its corresponding output is an array of the two concatenated streams.
 */

/**
 * Required External Module
 */
const fetch = require('node-fetch');

// After requests's execution this function is waiting on four promises in total.
// The first two promises received have each another nested promise.
async function fetchStreams(sourceAccount, backupAccount) {
    try {
        return await Promise.all([
            fetch(`https://${sourceAccount.username}.pryv.me/streams?auth=${sourceAccount.token}`)
                .then(res => res.json()),
            fetch(`https://${backupAccount.username}.pryv.me/streams?auth=${backupAccount.token}`)
                .then(res => res.json()),
        ]);
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = fetchStreams;
