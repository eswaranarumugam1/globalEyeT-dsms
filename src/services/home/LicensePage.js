import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

//main licence apis start
export const AllLicenceType = (school_id) => {
    return authConfig
        .get(`/all_main_license_paginate/${school_id}?page=1`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
export const next_LicenceType = (currentPage, school_id) => {
    return authConfig
        .get(`/all_main_license/${school_id}?page=${currentPage}`, {
            headers: Headers()
        }) 
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}


export const Addlicensetype = (request) => {
    return authConfig
        .post("/add_license", request, {
            headers: Headers(
                'multipart/form-data'
            )
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
} 
//school list dropdown removed no need to this api method///
// export const Schools = () => {
//     return authConfig
//         .get("/all_schools", {
//             headers: Headers()
//         })
//         .then((response) => {
//             return response
//         })
//         .catch((error) => {
//             return error
//         })
// } 

export const getLicenceTypeId = (id, school_id) => {
    return authConfig
        .get(`/license/${id}/${school_id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const UpdateLicenceTypes = (request) => {
    return authConfig
        .post(`/update_license`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const DeleteLicTyp = (id) => {
    return authConfig
        .delete(`/delete_license/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
//main licence apis end


//sub licence apis start
export const AllSubLicenceType = (school_id) => {
    return authConfig
        .get(`/list_sub_licenses/${school_id}?page=1`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
//wrong method need to delete
// export const GetLicence_Type = (id) => {
//     return authConfig
//         .post(`/update_license/${id}`, {
//             headers: Headers()
//         })
//         .then((response) => {
//             return response
//         })
//         .catch((error) => {
//             return error
//         })
// }

export const DeleteSubLicTyp = (id) => {
    return authConfig
        .delete(`/delete_sublicense/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
//main license dropdown api
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


export const AddSublicensetype = (request) => {
    return authConfig
        .post("/add_sublicense", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

//sub license dropdown api
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

export const getSubLicenceTypeId = (id) => {
    return authConfig
        .get(`/sub_license/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const UpdateSublicensetypes = (id, request) => {
    return authConfig
        .post(`/update_sublicense/${id}`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const next_SubLicenceType = (currentPage, school_id) => {
    return authConfig
        .get(`/list_sub_licenses/${school_id}?page=${currentPage}`, {
            headers: Headers()
        }) 
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
//a complete api for one crud
// sub license api methods ends

//license type level1 api methods start
export const AllSubLicenceType1 = (school_id) => {
    return authConfig 
        .get(`/list_sublicense_levels/lv1/${school_id}?page=1`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const next_SubLicenceType1 = (currentPage, school_id) => {
    return authConfig
        .get(`/list_sublicense_levels/lv1/${school_id}?page=${currentPage}`, {
            headers: Headers()
        }) 
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const DeleteSubLicTyp1 = (id) => {
    return authConfig
        .delete(`/delete_sublicense_one/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
} 

export const AddSubLicenceType1 = (request) => {
    return authConfig
        .post("/add_sublicense_one", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const getSubLicenceType1Id = (id) => {
    return authConfig
        .get(`/get_sublicense_level1/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            console.log(response)
            return response
        })
        .catch((error) => {
            return error
        })
}

export const UpdateSublicensetypes1 = (id, request) => {
    return authConfig
        .post(`/update_sublicense_one/${id}`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
//code end here
//license type level1 api methods ends


//license type level2 api methods start
export const AllSubLicenceType2 = (school_id) => {
    return authConfig 
        .get(`/list_sublicense_levels/lv2/${school_id}?page=1`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const next_SubLicenceType2 = (currentPage, school_id) => {
    return authConfig
        .get(`/list_sublicense_levels/lv2/${school_id}?page=${currentPage}`, {
            headers: Headers()
        }) 
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const DeleteSubLicTyp2 = (id) => {
    return authConfig
        .delete(`/delete_sublicense_two/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
} 

export const AddSubLicenceType2 = (request) => {
    return authConfig
        .post("/add_sublicense_two", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const getSubLicenceType2Id = (id) => {
    return authConfig
        .get(`/get_sublicense_level2/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const UpdateSublicensetypes2 = (id, request) => {
    return authConfig
        .post(`/update_sublicense_two/${id}`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}
//license type level2 api methods ends


//license type level3 api methods start
export const AllSubLicenceType3 = (school_id) => {
    return authConfig
        .get(`/list_sublicense_levels/lv3/${school_id}?page=1`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const next_SubLicenceType3 = (currentPage, school_id) => {
    return authConfig
        .get(`/list_sublicense_levels/lv3/${school_id}?page=${currentPage}`, {
            headers: Headers()
        }) 
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const DeleteSubLicTyp3 = (id) => {
    return authConfig
        .delete(`/delete_sublicense_three/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
} 

export const AddSubLicenceType3 = (request) => {
    return authConfig
        .post("/add_sublicense_three", request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const getSubLicenceType3Id = (id) => {
    return authConfig
        .get(`/get_sublicense_level3/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const UpdateSublicensetypes3 = (id, request) => {
    return authConfig
        .post(`/update_sublicense_three/${id}`, request, {
            headers: Headers()
        })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}