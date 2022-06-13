function Headers() {
  if (localStorage.getItem("Access_Token")) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Access_Token")}`,
       Pragma: 'no-cache'
    }
  } else {
    return {
      "Content-Type": 'application/json',
      Authorization: ""
    }
  }
}
export default Headers
