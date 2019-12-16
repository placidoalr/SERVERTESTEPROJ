import express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');

const app: express.Application = express();

const admin = require('firebase-admin');
let serviceAccount = require('./utils/testeproj-135ab-d7e2310ad389.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export let db = admin.firestore();

var singleton = require('./kernel/singleton');
singleton.setExpressApp(app);

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

require('./actions');

const port: number = 3000;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});