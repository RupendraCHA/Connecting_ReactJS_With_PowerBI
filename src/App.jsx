import React, { useState } from "react";
import { MsalProvider } from "@azure/msal-react";

import msalInstance from "./components/msalConfig"
import PowerBIAuth from "./components/powerBIAuth";
import PowerBIReport from "./components/powerBIReport";
function App() {
  const [token, setToken] = useState(null);

  return (
    <MsalProvider instance={msalInstance}>
      <div>
        <h1 className="text-3xl font-bold align-center">Power BI in React</h1>
        <PowerBIAuth onTokenReceived={setToken} />        
        {token && <PowerBIReport token={token} />}
      </div></MsalProvider>  );
}
export default App;