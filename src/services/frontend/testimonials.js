import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

export const getTestimonialsList = () => {
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

export const AddTestimonials = (request) => {
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

export const ViewTestimonials = (testimonials_id) => {
  return authConfig
      .get(`/testimonials/${testimonials_id}`, {
          headers: Headers()
      })
      .then((response) => {
          return response
      })
      .catch((error) => {
          return error 
      })
}

export const UpdateTestimonials = (testimonials_id) => {
  return authConfig
      .post(`/testimonials/${testimonials_id}`, {
          headers: Headers()
      })
      .then((response) => {
          return response
      })
      .catch((error) => {
          return error 
      })
}

export const DeleteTestimonials = (testimonials_id) => {
  return authConfig
      .delete(`/testimonials/${testimonials_id}`, {
          headers: Headers()
      })
      .then((response) => {
          return response
      })
      .catch((error) => {
          return error 
      })
}