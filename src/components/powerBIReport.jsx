import React, { useEffect, useRef } from "react";
import { models, Report } from "powerbi-client";
const PowerBIReport = ({ token }) => {
  const reportContainer = useRef(null);

  useEffect(() => {
    if (!token) return;

    const embedConfig = {
      type: "report",
      tokenType: models.TokenType.Aad,
      accessToken: token,
    //   embedUrl: "https://app.powerbi.com/reportEmbed?reportId=39b627f4-0188-4651-890f-d03aa68c9ab3&autoAuth=true&ctid=8f174bc0-2b3a-4aca-ab7f-ff0def96b3e3", // Get from Power BI 
      embedUrl: "https://app.powerbi.com/reportEmbed?reportId=a55c32db-32a9-42d9-8a3b-b4acb5d156c3", 
      settings: {
        panes: { filters: { expanded: false, visible: false } },
        navContentPaneEnabled: false,
      }  
    };
    const powerbi = window.powerbi
    
    powerbi.embed(reportContainer.current, embedConfig);
  }, [token]);

  return <div ref={reportContainer} />;
};

export default PowerBIReport;
 