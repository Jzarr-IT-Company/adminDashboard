// import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState, } from "react";
import Cookies from "js-cookie";

const GlobalContext = createContext();

const useGlobalState = () => useContext(GlobalContext)

let GlobalStates = (children) => {
    const [lloading, setlLoading] = useState(false);
    const [isuser, setisuser] = useState(true);
    const [userToken, setUserToken] = useState("");
    const [settToken, setSettToken] = useState("");
    const [paymToken, setPaymToken] = useState("");
    const [physToken, setPhysiToken] = useState("");
    const [faqsToken, setFaqsToken] = useState("");
    const [userId, setUserId] = useState("");
    const [settId, setSettId] = useState("");
    const [paymtId, setPaymeId] = useState("");
    const [physiId, setPhysiId] = useState("");
    const [faqsId, setFaqsId] = useState("");

    return <GlobalContext.Provider value={{
        userToken, setUserToken,
        userId, setUserId,
        settToken, setSettToken,
        paymToken, setPaymToken,
        physToken, setPhysiToken,
        faqsToken, setFaqsToken,
        settId, setSettId,
        paymtId, setPaymeId,
        physiId, setPhysiId,
        faqsId, setFaqsId,
    }}>
        {children.children}
    </GlobalContext.Provider>
}

export {
    GlobalStates,
    useGlobalState
}