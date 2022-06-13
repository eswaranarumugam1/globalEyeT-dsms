import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

const schools_id = parseInt(localStorage.getItem("schoolIdToken"))

const Index = async (params) => {
    return authConfig.get(`student/all/${schools_id}`, { params: { ...params }, headers: Headers() })
}

const Store = async (data) => {
    return authConfig.post("/student/store", data, { headers: Headers() })
}

const Show = async (id) => {
    return authConfig.get(`/student/show/${id}`, { headers: Headers() })
}

const Update = async (id, data) => {
    return authConfig.post(`/student/update/${id}`, data, { headers: Headers() })
}

const Delete = async (id) => {
    return authConfig.delete(`/student/delete/${id}`, { headers: Headers() })
} 

const Status = async (id, status) => {
    return authConfig.patch(`/student/updateStatus/${id}/${status}`, { headers: Headers() })
}

export const StudentService = {
    Index,
    Store,
    Show,
    Status,
    Update,
    Delete
}