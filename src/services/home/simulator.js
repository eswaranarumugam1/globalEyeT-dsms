import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

const Index = async (params) => {
    return authConfig.get("/simulator/all", { params: { ...params }, headers: Headers() })
}

const Store = async (data) => {
    return authConfig.post("/simulator/store", data, { headers: Headers() })
}

const Show = async (id) => {
    return authConfig.get(`/simulator/show/${id}`, { headers: Headers() })
}

const Update = async (id, data) => {
    return authConfig.post(`/simulator/update/${id}`, data, { headers: Headers() })
}

const Destroy = async (id) => {
    return authConfig.delete(`/simulator/delete/${id}`, { headers: Headers() })
}

export const SimulatorService = {
    Index,
    Store,
    Show,
    Update,
    Destroy
}