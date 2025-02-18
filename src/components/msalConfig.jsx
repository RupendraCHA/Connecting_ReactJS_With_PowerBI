import { PublicClientApplication } from "@azure/msal-browser";
const msalConfig = {
    auth: {
        clientId: "f32cac14-4c0d-4951-9c54-1691ed9750ea", // Your Application (client) ID
        authority: "https://login.microsoftonline.com/8f174bc0-2b3a-4aca-ab7f-ff0def96b3e3", // Replace with your tenant ID
        redirectUri: "http://localhost:5173", // Your redirect URI
        // redirectUri: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/a55c32db-32a9-42d9-8a3b-b4acb5d156c3/aa6705bbc3b7ef0d4147?experience=power-bi&clientSideAuth=0 ", // Your redirect URI
      },  
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
};
const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;