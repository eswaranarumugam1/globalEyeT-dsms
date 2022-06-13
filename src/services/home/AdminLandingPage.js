import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"
import HeadersForFiles from "../../api-config/HeadersForFiles"

export const BannerEnContent = () => {
    return authConfig
    //add_banner_settings_school
        .get("/get_subgroups/banner/en", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const BannerArContent = () => {
    return authConfig
        .get("/get_subgroups/banner/ar", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AboutUsEnContent = () => {
    return authConfig
        .get("/get_subgroups/about_us/en", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AboutUsArContent = () => {
    return authConfig
        .get("/get_subgroups/about_us/ar", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const FeaturesEnContent = () => {
    return authConfig
        .get("/get_subgroups/feature/en", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const FeaturesArContent = () => {
    return authConfig
        .get("/get_subgroups/feature/ar", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const NewsEnContent = () => {
    return authConfig
        .get("/get_subgroups/news/en", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error 
        })
}

export const NewsArContent = () => {
    return authConfig
        .get("/get_subgroups/news/ar", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const TestimonialsEnContent = () => {
    return authConfig
        .get("/get_subgroups/testimonial/en", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error 
        })
}

export const TestimonialsArContent = () => {
    return authConfig
        .get("/get_subgroups/testimonial/ar", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const ContactUsEnContent = () => {
    return authConfig
        .get("/get_subgroups/contact_us/en", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error 
        })
}

export const ContactUsArContent = () => {
    return authConfig
        .get("/get_subgroups/contact_us/ar", {
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
        .post("/add_banner_settings", request, {
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
        .post("/add_contact_settings", request, {
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
        .post("/add_about_us_settings", request, {
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
        .post("/add_feature_settings", request, {
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
        .post("/add_news_settings", formData, {
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
        .post("/add_testimonials_settings", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const getLandingPGEnContent = () => {
    return authConfig
        .get("/account-setting/data", {
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


export const RegLink = () => {
    return authConfig
    //absher registration link including function
        .get("/registration_url", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const Update_link_url = (request) => {
    return authConfig
        .post("/registration_settings_update", request, {
            headers: Headers()
        })
        .then((response) => {   
            return response
        })
        .catch((error) => {
            return error
        })
}

export const getOrganizationiList = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await authConfig.get('organization/all')
            resolve(response)
        } catch (error) {
            reject(new Error("Unable to load organization list"))
        }
    }) 
}