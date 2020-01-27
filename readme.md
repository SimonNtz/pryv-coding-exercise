This project contains an application developped in an exercice context.
It runs a server listening on a '/data' path which take as an input the following request call:

`` curl -i -X POST -H 'Content-Type: application/json' \
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
``

On client's request this web service makes some calls to the Pryv.io API with the credentials it received. 
The service responds back to the client by forwarding the Pryv.io services response.

Installation of external dependency package:

`` npm install ``


Runing the app:

`` npm start ``