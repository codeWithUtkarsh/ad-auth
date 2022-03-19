const express = require("express");
const msal = require('@azure/msal-node');

const SERVER_PORT = process.env.PORT || 3000;
const AD_APP_CLIENT_ID = process.env.AD_APP_CLIENT_ID || "30b7ddff-1254-4834-90ba-4554c4211b2c"
const AD_APP_AUTHORITY = process.env.AD_APP_AUTHORITY || "https://login.microsoftonline.com/07e373ad-d334-46f4-a926-dd2f68a616c0"
const AD_APP_CLIENT_SECRET = process.env.AD_APP_CLIENT_SECRET || "k7G7Q~eE.dSiX~bJ5jeyN~0a5E-IaW5zbpzpp"

const app = express();

app.listen(SERVER_PORT, () => console.log(`Msal Node Auth Code Sample app listening on port ${SERVER_PORT}!`))

const config = {
    auth: {
        clientId: AD_APP_CLIENT_ID,
        authority: AD_APP_AUTHORITY,
        clientSecret: AD_APP_CLIENT_SECRET
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};


// Create msal application object
const cca = new msal.ConfidentialClientApplication(config);

app.get('/auth', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/redirect",
    };

    // get url to sign user in and consent to scopes needed for application
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});

app.get('/redirect', (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/redirect",
    };

    cca.acquireTokenByCode(tokenRequest).then((response) => {
        console.log("\nResponse: \n:", response);
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
});

app.get('/hello', (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/redirect",
    };

    cca.acquireTokenByCode(tokenRequest).then((response) => {
        console.log("\nResponse: \n:", response);
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
});

