import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";

const PowerBIAuth = ({ onTokenReceived }) => {
  const { instance, accounts } = useMsal();
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Set the active account when the component mounts or accounts change
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [accounts, instance]);

  const login = async () => {
    try {
      const loginResponse = await instance.loginPopup({
        scopes: ["https://graph.microsoft.com/.default"],
      });

      if (loginResponse && loginResponse.account) {
        instance.setActiveAccount(loginResponse.account); // Set active account
      }

      getAccessToken();
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  const getAccessToken = async () => {
    try {
      const activeAccount = instance.getActiveAccount(); // Ensure an active account is set

      if (!activeAccount) {
        console.error("No active account. Please log in.");
        return;
      }

      const tokenResponse = await instance.acquireTokenSilent({
        account: activeAccount,
        scopes: ["https://graph.microsoft.com/.default"],
      });

      setToken(tokenResponse.accessToken);
      onTokenReceived(tokenResponse.accessToken);
    } catch (error) {
      console.error("Token Fetch Error", error);
    }
  };

  return (
    <div>
      <button onClick={login} className="btn btn-primary">Login with Azure</button>
      {token && <p>Token received</p>}
    </div>
  );
};

export default PowerBIAuth;
