import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

const getOrganizations = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await authConfig.get('/organization/all', {
                headers: Headers()
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

export const getNextOrganization = (currentPage) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await authConfig.get(`/organization/all?page=${currentPage}`)
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

const Index = async (params) => {
    return authConfig.get(`organization/all`, { params: { ...params }, headers: Headers() })
}

const Store = async (data) => {
    return authConfig.post("/organization/store", data, { headers: Headers() })
}

const Show = async (id) => {
    return authConfig.get(`/organization/show/${id}`, { headers: Headers() })
}

const Update = async (id, data) => {
    return authConfig.post(`/organization/update/${id}`, data, { headers: Headers() })
}

const Delete = async (id) => {
    return authConfig.delete(`/organization/delete/${id}`, { headers: Headers() })
} 

export const OrganizationService = {
    Index,
    Store,
    Show,
    Update,
    Delete,
    getOrganizations,
    getNextOrganization
}