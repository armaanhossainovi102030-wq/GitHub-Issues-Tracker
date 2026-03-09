
function login(){
    let userName= document.getElementById("username").value
let userPassword= document.getElementById("password").value

if (userName === "admin" && userPassword==="admin123"){
    window.location.href = "main.html"
}
else{
    console.log("not ok")
}
}

