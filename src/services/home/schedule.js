import { authConfig, noAuthConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

const school_id = parseInt(localStorage.getItem("schoolIdToken"))
// const GetAllPreSchedule = async (params) => {
//     return authConfig.get("/preschedule/all", { params: { ...params }, headers: Headers() })
// }

// const PreScheduleStore = async (data) => {
//     return authConfig.post("/preschedule/store", data, { headers: Headers() })
// }

// const DeletePreSchedule = async (id) => {
//     return authConfig.delete(`/preschedule/delete/${id}`, { headers: Headers() })
// }

// const GetPreScheduleByID = async (id) => {
//     return authConfig.get(`/preschedule/show/${id}`, { headers: Headers() })
// }

const GetAllSchedule = async (params) => {
    return authConfig.get(`/schedule/all/${school_id}`, { params: { ...params }, headers: Headers() })
}

const ScheduleStore = async (data) => {
    return authConfig.post("/schedule/store", data, { headers: Headers() })
}

const ScheduleShow = async (id) => {
    return authConfig.get(`/schedule/show/${id}`, { headers: Headers() })
}

const ScheduleUpdate = async (id, data) => {
    return authConfig.post(`/schedule/update/${id}`, data, { headers: Headers() })
}

const DeleteSchedule = async (id) => {
    return authConfig.delete(`/schedule/delete/${id}`, { headers: Headers() })
}

const AllocatedData = async (school_id, data) => {
    return authConfig.post(`/schedule/available/${school_id}`, data, { headers: Headers() })
}

const GetRooms = async (school_id) => {
    return authConfig.get(`/schedule/room/${school_id}`, { headers: Headers() })
}

const GetSubscriptionPlan = async (school_id) => {
    return authConfig.get(`/get_subscriptionplan_schoolid/${school_id}`, { headers: Headers() })
}

const GetVehicleList = async (school_id) => {
    return authConfig.get(`/list_vehicles_by_schoolid/${school_id}`, { headers: Headers() })
}

// const AllocateStore = async (data) => {
//     return authConfig.post("/allocated/store", data, { headers: Headers() })
// }

const GetComponentById = async (id) => {
    return authConfig.get(`/component_get/${id}`, { headers: Headers() })
}


export const ScheduleService = {
    // PreScheduleStore,
    // GetAllPreSchedule,
    // DeletePreSchedule,
    // GetPreScheduleByID,
    GetAllSchedule,
    ScheduleStore,
    ScheduleShow,
    ScheduleUpdate,
    DeleteSchedule,
    GetRooms,
    GetSubscriptionPlan,
    GetVehicleList,
    // AllocateStore,
    GetComponentById,
    AllocatedData
    // Index,
    // Store,
    // Show,
    // Update,
    // Destroy
}