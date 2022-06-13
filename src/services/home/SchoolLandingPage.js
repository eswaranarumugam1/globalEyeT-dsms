import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"
import HeadersForFiles from "../../api-config/HeadersForFiles"

export const BannerEnContent = (school_id) => {
    return authConfig
        .get(`/get_subgroups_school/banner/en/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const BannerArContent = (school_id) => {
    return authConfig
        .get(`/get_subgroups_school/banner/ar/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AboutUsEnContent = (school_id) => {
    return authConfig
        .get(`/get_subgroups_school/about_us/en/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AboutUsArContent = (school_id) => {
    return authConfig
        .get(`/get_subgroups_school/about_us/ar/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const FeaturesEnContent = (school_id) => {
    return authConfig
        .get(`/get_subgroups_school/feature/en/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const FeaturesArContent = (school_id) => {
    return authConfig
        .get(`/get_subgroups_school/feature/ar/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const NewsEnContent = (school_id) => {
    return authConfig
        .get(`/get_subgroups_school/news/en/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error 
        })
}

export const NewsArContent = (school_id) => {
    return authConfig
        .get(`/get_subgroups_school/news/ar/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const TestimonialsEnContent = (school_id) => {
    return authConfig
        .get(`/get_subgroups_school/testimonial/en/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error 
        })
}

export const TestimonialsArContent = (school_id) => {
    return authConfig
        .get(`/get_subgroups_school/testimonial/ar/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const ContactUsEnContent = (school_id) => {
    return authConfig
        .get(`/get_subgroups_school/contact_us/en/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error 
        })
}

export const ContactUsArContent = (school_id) => {
    return authConfig
        .get(`/get_subgroups_school/contact_us/ar/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AddBanner = (request) => {
    return authConfig
        .post("/add_banner_settings_school", request, {
            headers: Headers()
        })
        .then((response) => {   
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AddContactUs = (request) => {
    return authConfig
        .post("/add_contact_settings_school", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AddAboutUs = (request) => {
    return authConfig
        .post("/add_about_us_settings_school", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AddFeature = (request) => {
    return authConfig
        .post("/add_feature_settings_school", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const Addnews = (formData) => {
    return authConfig
        .post("/add_news_settings_school", formData, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AddTestimonial = (request) => {
    return authConfig
        .post("/add_testimonials_settings_school", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const getLandingPGEnContent = (school_id) => {
    return authConfig
        .get(`/account-setting/data/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error 
        })
}

export const getSchoolsListApi = () => {
    return authConfig
        .get("/all_schools_list", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}