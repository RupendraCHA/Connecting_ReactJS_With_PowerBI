import { createContext, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    
    const [dashboardsData, setDashboardsData] = useState("")
    const [dashboardUrl, setDashboardUrl] = useState("")
    // {
    //     deliveryHeader: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/a55c32db-32a9-42d9-8a3b-b4acb5d156c3/f34e6781e959e79d5bc0?experience=power-bi",
    //     salesOrder: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/12256cd6-0191-4734-b9e2-26fb5da6f018/519f2f1b088001690a92?experience=power-bi",
    //     salesBilling: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/39b627f4-0188-4651-890f-d03aa68c9ab3/ce8017ebff5ddce17665?experience=power-bi",
    //     purchaseHeader: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/0c34af53-228f-49e3-a217-c7942da55d86/fc1b7f266db9a2fc9c94?experience=power-bi"
    // }
    const contextValue ={
        dashboardsData,
        setDashboardsData,
        dashboardUrl,
        setDashboardUrl
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider