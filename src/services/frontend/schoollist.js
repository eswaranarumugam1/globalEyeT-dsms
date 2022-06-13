import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

export const fetchSchoolList = (id) => {
    return authConfig
        .get(`/listing_schools?page=${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const fetchLicenses = (id) => {
    return authConfig
        .get(`/school_licenses/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const fetchPlanData = (id) => {
    return authConfig
        .get(`/get_subscriptionplan_schoolid/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const fetchSchoolData = (id) => {
    //console.log
    return authConfig
    .get(`/school_data/${id}`, {
        headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const fetchSubLicenses = (request) => {
    return authConfig
        .post(`/category_tab_licenses`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const fetchSubcategory = (request) => {
    return authConfig
        .post(`/select_tab_licenses`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const fetchGetProvince = () => {
    return authConfig
    .get(`/get_province`, {
        headers: Headers()
    })
    .then((response) => {
        return response
    })
    .catch((error) => {
        return error
    })
}