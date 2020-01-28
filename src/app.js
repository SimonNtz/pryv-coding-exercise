/**
 * Script configuring and running the express server 
 * which routes the incoming HTTP requests to a router.  
*/

/**
 * Required External Modules
 */

const express = require("express");
const routes = require('./routes')

require("dotenv").config();

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || 1234;
const domain = process.env.DOMAIN || 'localhost';

/**
 *  Middlewares
 */

app.use(express.json())

/**
 * Routes Definitions
 */

app.use('/', routes);

// Start the server
app.listen(port, domain, function () {
    console.log(`app listening on http://${domain}:${port}`);
});


