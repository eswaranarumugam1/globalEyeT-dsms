import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

export const AllPermissions = () => {
    return authConfig
        .get("/roles_and_permissions", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const GetlistPermission = (id) => {
    return authConfig
        .get(`/role_permissions/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
} 

export const Permission_Update = (request) => {
    return authConfig
        .post("/assign_role_permission", request, {
            headers: Headers()            
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
