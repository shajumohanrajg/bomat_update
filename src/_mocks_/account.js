let local= localStorage.getItem("access_token");
let string=localStorage.getItem("User-id")
const account = 
local?{
  displayName: string[0].toUpperCase()+string.slice(1,string.indexOf("@")),
  email: string,
  photoURL: "",
}:{
  displayName: "",
  email: "",
  photoURL: "",
}

export default account;
