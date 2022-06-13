import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

export const LicenseType = () => {
    return authConfig
        .get(`/all_main_license`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const LicenseTypeget = (school_id) => {
    return authConfig
        .get(`main_licenses/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const SubLicenseType = (id) => {
    return authConfig
        .get(`/sub_license_list/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const SubLicenseType1 = (id) => {
    return authConfig
        .get(`/sub_license_list_lv_one/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const SubLicenseType2 = (id) => {
    return authConfig
        .get(`/sub_license_list_lv_two/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const SubLicenseType3 = (id) => {
    return authConfig
        .get(`/sub_license_list_lv_three/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const School_list = () => {
    return authConfig
        .get(`/all_schools`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const PostSubscriptionPlan = (request) => {
    return authConfig
        .post("/add_subscription_plan", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
} 

export const getAllSubscriptionPlansApi = (id) => {
    return authConfig
        .get(`get_subscriptionplan/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
} 