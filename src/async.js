const _async = require('async');
const fetch = require('node-fetch');

const req = {
    "source": {
        "username": "sw-interview-source",
        "token": "ck5h1u3o200j21hd39ymop3vj"
    },
    "backup": {
        "username": "sw-interview-backup",
        "token": "ck5h1b5mw00jf1fd3s6e0vhie"
    }
};


async function fetchStream(userAccount){
    try {
        const streamResponse = await fetch( 
            `https://${userAccount.username}.pryv.me/streams?auth=${userAccount.token}`);
        return(await streamResponse.json());
        // throw new Error('whoops');
    } catch(e) {
        console.log('inner fn' + e.message);
        throw(e);
    };  
};


async function saveEvent(urlAccountInfo, eventData){
    try {
        let resp = await fetch(
            `https://${urlAccountInfo.username}.pryv.me/events?auth=${urlAccountInfo.token}`,
            {
                method: 'post',
                body:    JSON.stringify({"streamId": "a",
                                        "type": "exercise-1/streams",
                                        "content":eventData}),
                headers: { 'Content-Type': 'application/json' }
            });
        return(await resp.json());
    } catch(e) {
        throw (e);
    };
}; 


async function saveStreamstoEvent (_req)  {
    const userAccounts = (({source, backup}) => ({source, backup}))(_req);
    try {
      const streamsResp = await _async.concatLimit(userAccounts, 5, fetchStream);
      const eventResp = await saveEvent(userAccounts.backup,
        streamsResp[0].streams.concat(streamsResp[1].streams));
       console.log(eventResp);
    //   res.send(eventResp);
    } catch(e){
      console.log('outer fn ' + e.message);
    //   res.sendStatus(500);
    };
};

saveStreamstoEvent(req);