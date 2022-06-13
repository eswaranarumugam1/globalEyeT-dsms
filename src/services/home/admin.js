import { authConfig, noAuthConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"
// School
export const AddSchoolApi = (request) => {
    // console.log("ser", request)
    return authConfig
        .post("/add_school", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const fetchSchools = () => {
    return authConfig
        .get("/all_schools", {
            headers: Headers()
        })
        .then((response) => {
            // console.log(response)

            return response
        })
        .catch((error) => {
            return error
        })
}

export const getTestimonial = (id) => {
    return authConfig
        .get(`/testimonials/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const UpdateTestimonial = (id, request) => {
    return authConfig
        .post(`/testimonials/${id}`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const getAllSubscriptionPlansApi = (school_id) => {

    return authConfig
        .get(`/get_subscriptionplan_schoolid/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            // console.log(response)

            return response
        })
        .catch((error) => {
            return error
        })
}

export const next_Subscriptionplan = (school_id, currentPage) => {
    return authConfig
        .get(`/get_subscriptionplan_schoolid/${school_id}?page=${currentPage}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const getAllSubscriptionPlansApi_pagination = (school_id) => {

    return authConfig
        .get(`/get_subscriptionplan_schoolid_pagination/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            // console.log(response)

            return response
        })
        .catch((error) => {
            return error
        })
}

export const next_Subscriptionplan_pagination = (school_id, currentPage) => {
    return authConfig
        .get(`/get_subscriptionplan_schoolid_pagination/${school_id}?page=${currentPage}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}


export const next_SchoolList = (currentPage) => {
    return authConfig
        .get(`/all_schools?page=${currentPage}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const fetchSchool = (id) => {
    return authConfig
        .get(`/school/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const updateSchoolApi = (id, request) => {

    return authConfig
        .post(`/update_school/${id}`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const deleteSchoolApi = (id) => {
    return authConfig
        .delete(`/delete_school/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const changestatusSchoolApi = (id, status) => {
    return authConfig
        .post(`/update_school_status/${id}`, status, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}


//for students
export const AddStudent = (request) => {
    return authConfig
        .post("/student/store", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
            console.log(response)
        })
        .catch((error) => {
            return error
        })
}


export const getStudentById = (id) => {
    return authConfig
        .get(`/student/show/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const editStudent = (id, request) => {
    return authConfig
        .post(`/student/update/${id}`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const DeleteStudent = (id) => {
    return authConfig
        .delete(`/student/delete/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const studentStatusUpdate = (id, status) => {
    return authConfig
        .patch(`/student/updateStatus/${id}/${status}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const trainerStatusUpdate = (id, status) => {
    return authConfig
        .patch(`/trainer/updateStatus/${id}/${status}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AddGroup = (request) => {
    return authConfig
        .post("/organization/store", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const FindGroupById = (id) => {
    return authConfig
        .get(`/organization/show/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const UpdateGroup = (id, request) => {
    return authConfig
        .post(`organization/update/${id}`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const DeleteGroup = (id) => {
    return authConfig
        .delete(`/organization/delete/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}


export const AddTrainer = (request) => {
    return authConfig
        .post("/trainer/store", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}


export const GetTrainerById = (id) => {
    return authConfig
        .get(`get_trainer_profile/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const EditTrainer = (request, id) => {
    return authConfig
        .post(`trainer/update/${id}`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const DeleteTrainer = (id) => {
    return authConfig
        .delete(`/trainer/delete/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const Simulator = () => {
    return authConfig
        .get("/simulator/all", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const AddSimulator = (request) => {
    return authConfig
        .post("/simulator/store", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const GetSimulatorById = (id) => {
    return authConfig
        .get(`/simulator/show/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const EditSimulator = (id, request) => {
    return authConfig
        .post(`/simulator/update/${id}`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const DeleteSimulator = (id) => {
    return authConfig
        .delete(`/simulator/delete/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const Schools = () => {
    return authConfig
        .get("/all_schools", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const LicenseType = (id) => {
    return authConfig
        .get(`/all_main_license/${id}`, {
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

export const getCertification = (school_id) => {
    return authConfig
        .get(`/get_trainer_certification/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const getemployeeType = (school_id) => {
    return authConfig
        .get(`/get_employee_type/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const trainer_position = (school_id) => {
    return authConfig
        .get(`/get_trainer_position/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const Trainer_speciality = (school_id) => {
    return authConfig
        .get(`/get_trainer_speciality/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const get_training_languages = (school_id) => {
    return authConfig
        .get(`/get_training_languages/${school_id}`, {
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

export const Trainers = (school_id, currentPage) => {
    return authConfig
        .get(`/trainer/all/${school_id}?page=${currentPage}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const Students = (school_id, currentPage) => {
    return authConfig
        .get(`/student/all/${school_id}?page=${currentPage}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const Organization = () => {
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

export const Testimonial_list = () => {
    return authConfig
        .get("/testimonials", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const Testimonial_list_hhp = () => {
    return authConfig
        .get("/testimonials_hhp", {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const Testimonial_list_id = (id) => {
    return authConfig
        .get(`/testimonials_id/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const addTestimonial = (request) => {
    return authConfig
        .post("/testimonials", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const DeleteTestimonial = (id) => {
    return authConfig
        .delete(`/testimonials/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
