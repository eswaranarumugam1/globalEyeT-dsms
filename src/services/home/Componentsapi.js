import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

export const LoadResourcesList = () => {
    return authConfig
        .get("/resources_list", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const getCommunicationMode = () => {
    return authConfig
        .get("/communicationmode", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const getCommunicationtype = () => {
    return authConfig
        .get("/trainingmode", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AddComponents = (request) => {
    return authConfig
   
        .post("/components_add", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const AllComponent = (school_id) => {
    const schoolId = localStorage.getItem('schoolIdToken')
    return authConfig
        .get(`/components_list/${schoolId}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AllComponent_with_session = (school_id) => {
    const schoolId = localStorage.getItem('schoolIdToken')
    return authConfig
        .get(`/components_list_with_sessions/${schoolId}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}


export const GetPriceandhours = (component_id) => {
    
    return authConfig
        .get(`/get_price_hours/${component_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const deleteComponent = (id) => {
    return authConfig
        .get(`/components_delete/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const updateComponent = (id, request) => {
    return authConfig
        .post(`/components_update/${id}`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const fetchComponent = (id) => {
    return authConfig
        .get(`/component_get/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
//coniguration components

export const ConfigComponentSave = (request) => {
    return authConfig
        .post(`/component_map`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const getConfigComponent = (id) => {
    return authConfig
        .get(`/component_map/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const updateConfigComponent = (id, request) => {
    return authConfig
        .post(`/component_map/${id}`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
    }

 export const Addsession = (request) => {
            return authConfig
           
                .post("/component_session", request, {
                    headers: Headers()
                })
                .then((response) => {
                    return response
                })
                .catch((error) => {
                    return error
                })
        }

