


var xmlhttp = new XMLHttpRequest();
function login() {
    var value = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };
    console.log(value);
    xmlhttp.open("POST", "/login", true);
    xmlhttp.setRequestHeader("content-type", "application/json");
    xmlhttp.send(JSON.stringify(value));
    console.log("............................");
    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.status, xmlhttp.readyState, xmlhttp.response);
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 400) {

                location.href = "/login";
                alert("invalide email or password");
                return;
            }

            else (xmlhttp.status == 200)
            {
                window.localStorage.setItem("object", xmlhttp.response);

                var get = JSON.parse(localStorage.getItem('object'));
                console.log(get);
                location.href = "/Home";

            }
        }
    }

}



