
var msal = require("@azure/msal-node");

const msalConf = {
    auth: {
        clientId: "30b7ddff-1254-4834-90ba-4554c4211b2c",
        tenant: "07e373ad-d334-46f4-a926-dd2f68a616c0",
        authority: `https://login.microsoftonline.com/07e373ad-d334-46f4-a926-dd2f68a616c0`,
        clientSecret: "k7G7Q~eE.dSiX~bJ5jeyN~0a5E-IaW5zbpzpp"
    }
};

const cca = new msal.ConfidentialClientApplication(msalConf);

const usernamePasswordRequest = {
    scopes: ["user.read"],
    username: "USERNAME",
    password: "USER_PASS",
};

cca.acquireTokenByUsernamePassword(usernamePasswordRequest).then((response) => {
    console.log("acquired token by password grant in confidential clients");
    console.log(response);
}).catch((error) => {
    console.log(error);
});



