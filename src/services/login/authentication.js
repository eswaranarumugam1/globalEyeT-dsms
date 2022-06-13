import { authConfig } from "../../api-config/authConfig"
// Login
export const LoginApi = (request) => {
    return authConfig
        .post("/superadmin_login", request)
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const SchoolAdminApiold = (request) => {
    return authConfig
        .post("/schooladmin_login", request)
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const SchoolAdminApi = (request) => {
    return authConfig
        .post("/admin_login_with_schoolid", request)
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const OrganizationLogin = (request) => {
    return authConfig.post('/organization_login', request)
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}