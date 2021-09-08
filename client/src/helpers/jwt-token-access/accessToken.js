let accessToken = "";
if (localStorage.getItem("authUser")) {
  const obj = JSON.parse(localStorage.getItem("authUser"));
  accessToken = obj.token;
}
export default accessToken;
