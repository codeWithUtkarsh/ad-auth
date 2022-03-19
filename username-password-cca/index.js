
var msal = require("@azure/msal-node");

const msalConf = {
    auth: {
        clientId: "30b7ddff-1254-4834-90ba-4554c4211b2c",
        // authority: "https://login.microsoftonline.com/07e373ad-d334-46f4-a926-dd2f68a616c0",
        authority: "https://login.microsoftonline.com/57ebf52b-400a-4db6-a524-b07f4888055a",
        clientSecret: "k7G7Q~eE.dSiX~bJ5jeyN~0a5E-IaW5zbpzpp"
    }
};

const cca = new msal.ConfidentialClientApplication(msalConf);

const usernamePasswordRequest = {
    scopes: ["user.read"],
    username: "john@utkarshocthotmailcom.onmicrosoft.com",
    password: "jd55*poiu",
};

cca.acquireTokenByUsernamePassword(usernamePasswordRequest).then((response) => {
    console.log("acquired token by password grant in confidential clients");
    console.log(response);
}).catch((error) => {
    console.log(error);
});



