import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

export const AllClassRoomsType = (school_id) => {
    return authConfig
        .get(`/get_room_types_with_school_id/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const EditClassRoomsType = (id) => {
    return authConfig
        .get(`/get_room_types_with_id/${id}`, {
            headers: Headers()
        }) 
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const DeleteRoomTyp = (id) => {
    return authConfig
        .delete(`/delete_room_type/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AllClassRoomsFunction = (school_id) => {
    return authConfig
        .get(`/get_room_functions_with_school_id/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const EditClassRoomsFunction = (id) => {
    return authConfig
        .get(`/get_room_functions_with_id/${id}`, {
            headers: Headers()
        }) 
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const DeleteRoomFunction = (id) => {
    return authConfig
        .delete(`/delete_room_functions/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const EditClassRooms = (id) => {
    return authConfig
        .get(`/get_classroom_with_id/${id}`, {
            headers: Headers()
        }) 
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const DeleteClassRoom = (id) => {
    return authConfig
        .delete(`/delete_classroom/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const AllClassRooms = (school_id) => {
    return authConfig
        .get(`/get_classroom_with_school_id/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
