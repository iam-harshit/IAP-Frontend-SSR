import { apiConnector } from "@/services/ApiConnector";
import { blogEndPoints } from "@/services/BackendApis";

export const getAllSlots = async () => {
    try {
        const response = await apiConnector('GET', blogEndPoints.GET_ALL_SLOTS, null,
            { 'Content-Type': 'application/json' }, null, true);
        return response?.data;
    } catch (error) {
        return error;
    }
};