This project contains an application developped in an exercice context.
It runs a server listening on a '/data' route which takes as an input the following HTTP-POST request:

``` 
curl -i -X POST -H 'Content-Type: application/json'  
-d '{  
"source": {
  "username": "my_source_username",
  "token": "my_source_token"
},
"backup": {
  "username": "my_backup_username",
  "token": "my_backup_token"
}
}' "http://localhost:1234/data"
```

On client's request this web service makes some authenticaed calls to the Pryv.io API using the accounts credentials received.
Finally, it responds back to the client by forwarding the Pryv.io services HTTP response.

Installation of external dependency package:

`` npm install ``


Runing the app:

`` npm start ``