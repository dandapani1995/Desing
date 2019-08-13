
var xml = new XMLHttpRequest();

function register() {
    console.log(".............open........");
    var data = {
        name: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        password_again: document.getElementById("password-again").value

    }
    console.log(data);

    xml.open("POST", "/register", true);
    xml.setRequestHeader("content-type", "application/json");
    xml.send(JSON.stringify(data));
    console.log("...........................", data);
    xml.onreadystatechange = function () {
        console.log(xml.readyState, xml.status, xml.response);
        if (xml.readyState === 4) {
            if (xml.status === 200) {
                location.href = "/Home";
            }
            else if (xml.status === 302) {
                window.location = "/register";
                document.getElementById("demo").innerHTML = "email is already exist";
                alert(xml.response);
            } else if (xml.status === 400) {
                window.location = "/register";
                document.getElementById("demo").innerHTML = "data  not found";
                alert(xml.response);
            } else {
                window.location = "/register";
                alert(xml.response);
            }
        }
    }

}










