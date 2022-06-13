import axios from "axios"
const authConfig = axios.create({
  // baseURL: "https://devm2.com/backend/api/auth/"
  baseURL: "http://dsmsaudi.co.in/backend/api/auth/"
  // baseURL: "https://devm2.com/backend/api/auth/"
  // baseURL: "http://localhost:8000/api/auth"
})
const backendWebConfig = axios.create({

   baseURL: "http://dsmsaudi.co.in/dsms_web/api/auth/"
  // baseURL: "https://devm2.com/dsms_web/api/auth/"

  //  baseURL: "http://dsmsaudi.co.in/backend/api/auth/"
  // baseURL: "http://dsmsaudi.co.in/dsms_web/api/auth/"
  // baseURL: "https://devm2.com/dsms_web/api/auth/"

})
const apiConfig = axios.create({
  baseURL: "https://mysorefreelancer.in/dsms_backend/api/auth/"
})
const lookupConfig = axios.create({
  // baseURL: "http://dsmsaudi.co.in/backend/api/"
  baseURL: "https://devm2.com/backend/api/"
})
const noAuthConfig = axios.create({
  baseURL: "http://dsmsaudi.co.in/backend/api/"
  // baseURL: "http://dsmsaudi.co.in/backend/api/auth/"
  // baseURL: "http://localhost:8000/api/auth"
})
export { authConfig, backendWebConfig, apiConfig, lookupConfig, noAuthConfig }
