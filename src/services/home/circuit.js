import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

const Index = async (params) => {
    return authConfig.get("/circuit/all", { params: { ...params }, headers: Headers() })
}

const Store = async (data) => {
    return authConfig.post("/circuit/store", data, { headers: Headers() })
}

const Show = async (id) => {
    return authConfig.get(`/circuit/show/${id}`, { headers: Headers() })
}

const Update = async (id, data) => {
    return authConfig.post(`/circuit/update/${id}`, data, { headers: Headers() })
}

const Destroy = async (id) => {
    return authConfig.delete(`/circuit/delete/${id}`, { headers: Headers() })
}

export const Circuit = {
    Index,
    Store,
    Show,
    Update,
    Destroy
}