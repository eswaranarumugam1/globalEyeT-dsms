import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

export const fetchRole = () => {
    return authConfig
        .get("/all_roles", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AddRoles = (id, request) => {
    return authConfig
        .post(`/add_role/${id}`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const getRole = (id) => {
    return authConfig
        .get(`/get_role/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const UpdateRole = (id, request) => {
    return authConfig
        .post(`/update_role/${id}`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const deleteRole = (id) => {
    return authConfig
        .delete(`/delete_role/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const next_role_list = (currentPage) => {
    return authConfig
        .get(`/all_roles?page=${currentPage}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}