import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

export const AllVehicleType = (school_id) => {
    return authConfig
        .get(`/get_vehicle_type_all`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const EditVehicleType = (id) => {
    return authConfig
        .get(`/get_vehicle_type_with_id/${id}`, {
            headers: Headers()
        }) 
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const DeleteVehicleTyp = (id) => {
    return authConfig
        .delete(`/delete_vehicle_type/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AllVehicleBrand = (school_id) => {
    return authConfig
        .get(`/get_vehicle_brand_all`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const EditVehicleBrand = (id) => {
    return authConfig
        .get(`/get_vehicle_brand_with_id/${id}`, {
            headers: Headers()
        }) 
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const DeleteVehicleBrand = (id) => {
    return authConfig
        .delete(`/delete_vehicle_brand/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const EditVehicle = (id) => {
    return authConfig
        .get(`/get_vehicle_by_id/${id}`, {
            headers: Headers()
        }) 
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const DeleteVehicles = (id) => {
    return authConfig
        .delete(`/delete_vehicle/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const AllVehicles = (school_id) => {
    return authConfig
        .get(`/list_vehicles_by_schoolid/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const AllVehiclePurpose = (school_id) => {
    return authConfig
        .get(`/get_vehicle_purpose_all`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
