import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"
// 
export const countries = () => {
    return authConfig
        .get("/get_countries", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const cities = (id) => {
    return authConfig
        .get(`/get_city/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const id_types = () => {
    return authConfig
        .get("/id_type", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const levels = () => {
    return authConfig
        .get("/levels", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const gender = () => {
    return authConfig
        .get("/schools_gender_list", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const branches = () => {
    return authConfig
        .get("/organization/all", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}