import { apiConnector } from "@/services/ApiConnector";
import { supportEndPoints } from "@/services/BackendApis";


export const handleContactInfo = async (payload) => {
    console.log("payload", payload)
    try {
        const response = await apiConnector('POST', supportEndPoints.SEND_MESSAGE, payload,
            { 'Content-Type': 'application/json' }, null, false);
        return response?.data;
    } catch (error) {
        return error;
    }
};