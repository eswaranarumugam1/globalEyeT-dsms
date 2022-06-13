import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"
export const All_sessions = (component_id, mode_of_learning_id) => {
    return authConfig
        .get(`/get_sessions_with_ids/${component_id}/${mode_of_learning_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const DeleteSession = (id) => {
    return authConfig
        .delete(`/component_session/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const UpdateSession = (id) => {
    return authConfig
        .put(`/component_session/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const Editsession = (id) => {
    return authConfig
        .get(`/component_session/editdetails/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const GetSessionTotal = (comp_id, mol_id) => {
    return authConfig
        .get(`get_sessions_with_ids/${comp_id}/${mol_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

