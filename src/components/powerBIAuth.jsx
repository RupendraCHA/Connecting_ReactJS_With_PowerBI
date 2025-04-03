import React, { useState, useEffect, useContext } from "react";
import { useMsal } from "@azure/msal-react";
import { StoreContext } from "../context/storeContext";
import { PublicClientApplication, InteractionType } from "@azure/msal-browser";



const PowerBIAuth = ({ onTokenReceived }) => {
  const { instance, accounts } = useMsal();
  const [token, setToken] = useState(null);

  const {setDashboardsData, setDashboardUrl} = useContext(StoreContext)

  useEffect(() => {
    // Set the active account when the component mounts or accounts change
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [accounts, instance]);
  

  const login = async (dashboardType, dashboardUrl) => {
    setDashboardsData(dashboardType)
    setDashboardUrl(dashboardUrl)
    console.log(dashboardType)
    console.log(dashboardUrl)
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

  const dashboardsTypes = [{
    headerText: "Delivery Header Data",
    dataText: "delivery",
    url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/a55c32db-32a9-42d9-8a3b-b4acb5d156c3/aa6705bbc3b7ef0d4147?experience=power-bi&clientSideAuth=0",
  },
  {
    headerText: "Sales Order Data",
    dataText: "order",
    url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/12256cd6-0191-4734-b9e2-26fb5da6f018/519f2f1b088001690a92?experience=power-bi&clientSideAuth=0",
  },
  {
    headerText: "Sales Billing Data",
    dataText: "billing",
    url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/39b627f4-0188-4651-890f-d03aa68c9ab3/ce8017ebff5ddce17665?experience=power-bi&clientSideAuth=0",
  },
  {
    headerText: "Purchase Header Data",
    dataText: "purchase",
    url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/0c34af53-228f-49e3-a217-c7942da55d86/9399d3c37b14e9f48649?experience=power-bi&clientSideAuth=0",
  }
]

  return (
    <div className="text-center">
      <div className="flex items-center flex-row justify-center gap-5 flex-wrap">
        {dashboardsTypes.map((type) => {
          return (
            <div key={type.dataText} className="bg-white p-5 h-[60vh] w-[20vw] flex items-center flex-col justify-center gap-2 rounded-2xl shadow-lg shadow-blue-500">
          <h1 className="font-bold text-2xl">{type.headerText}</h1>
          <button onClick={() => login(`${type.dataText}`, `${type.url}`)} className="p-2 bg-[#716fdeb4] rounded-xl text-[#0a0943] font-bold text-xl">
            {/* <a href={type.url} target="_blank">Click to View</a> */}
            <p>View Dashboard</p>
          </button>

        </div>
          )
        })}
        </div>      
    </div>
  );
};

export default PowerBIAuth;
