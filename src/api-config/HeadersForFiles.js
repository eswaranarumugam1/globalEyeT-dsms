function HeadersForFiles() {
    if (localStorage.getItem("Access_Token")) {
      return {
        "Content-Type": "application/json",
        // "Content-Type": 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem("Access_Token")}`
      }
    } else {
      return {
        "Content-Type": "application/json",
        // "Content-Type": 'multipart/form-data',
        Authorization: ""
      }
    }
  }
  export default HeadersForFiles
  