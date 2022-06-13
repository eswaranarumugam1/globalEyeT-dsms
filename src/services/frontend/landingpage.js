import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

export const LandingPageData = () => {
    return authConfig
        .get("/hhp_homepage_contents", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const SchoolLandingPageData = (id) => {
    return authConfig
        .get(`/school_homepage_contents/en/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}