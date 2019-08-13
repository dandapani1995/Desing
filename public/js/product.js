var get = JSON.parse(localStorage.getItem('object'));
var xml = new XMLHttpRequest();
function first() {
    location.href = "/insert";
}
function logout() {
    window.localStorage.removeItem('object');
    window.localStorage.removeItem('Edit_data');
    location.href = "/login";
}

function insert_product_value() {


    var pro_data = {
        // product_id: document.getElementById("pro_id").value,
        product_name: document.getElementById("pro_name").value,
        product_owner: get.uname,
        product_url: document.getElementById("pro_url").value,
        product_owner_id: get._id
    }
    console.log(pro_data);
    xml.open("POST", "/insert", true);
    xml.setRequestHeader("content-type", "application/json");
    xml.send(JSON.stringify(pro_data));

    xml.onreadystatechange = function () {
        console.log(xml.readyState, xml.status);
        if (xml.readyState === 4) {
            if (xml.status === 200) {
                location.href = "/Home";
                console.log(xml.response);
            }
            else (xml.status === 400)
            {
                console.log("the error", xml.response);
            }
        }
    }
}

function Data_insert() {
    console.log(",...................");
    var doc = { name: get.uname };
    console.log(doc);
    xml.open("POST", "/Home", true);
    xml.setRequestHeader("content-type", "application/json");
    xml.send(JSON.stringify(doc));
    xml.onreadystatechange = function () {
        // console.log(xml.readyState, xml.status);
        if (xml.readyState === 4) {
            if (xml.status === 200) {

                var table1 = JSON.parse(xml.response);

                console.log("sasifvbiasvf ", table1);
                var table = document.getElementById('table');
                for (let i = 0; i < table1.length; i++) {
                    var row = table.insertRow()
                    row.insertCell(0).innerHTML = table1[i]._id;
                    row.insertCell(1).innerHTML = table1[i].name;
                    row.insertCell(2).innerHTML = table1[i].owner;
                    row.insertCell(3).innerHTML = table1[i].url;
                    row.insertCell(4).innerHTML = table1[i].owner_id;
                    row.insertCell(5).innerHTML = ' <a class="btn waves-effect waves-light col s8" type="button" href="/edit?id=' + table1[i]._id + '">Edit</a>';
                    // row.insertCell(6).innerHTML = ' <a class="btn waves-effect waves-light col s8" type="button"  onclick="delt(1)" href="/Home?id=' + table1[i]._id + '">Delete</a>';


                    var button1 = document.createElement('input');
                    button1.setAttribute('type', 'button');
                    button1.setAttribute('value', 'delete');
                    button1.setAttribute('onclick', 'delt(this)');
                    button1.setAttribute('product_id', table1[i]._id);
                    button1.setAttribute('id', 'delete');
                    row.insertCell(6).appendChild(button1);

                }
                return;

            }
            else (xml.status === 400)
            {
                console.log("the error");
            }
        }
    }

    // function edit()

}

// function edit(id) {
//     var temp = { object_id: id.getAttribute("product_id") };
//     console.log(temp);
//     xml.open("POST", "/edit", true);
//     xml.setRequestHeader("content-type", "application/json");
//     xml.send(JSON.stringify(temp));
//     xml.onreadystatechange = function () {
//         if (xml.readyState === 4) {
//             if (xml.status === 400) {
//                 console.log("the edit page error");
//             }
//             else (xml.status === 200)
//             {
//                 console.log("edit response.....", xml.response);
//                 location.href = "/edit";
//                 console.log("The response for edit page");
//                 window.localStorage.setItem("Edit_data", xml.response);

//             }
//         }
//     }
// }

function delt(dlt) {


    var object_data_id = { object_id: dlt.getAttribute('product_id') };

    // console.log(".....................", object_id);
    xml.open("POST", "/delete", true);
    xml.setRequestHeader("content-type", "application/json");
    xml.send(JSON.stringify(object_data_id));
    xml.onreadystatechange = function () {
        if (xml.readyState === 4) {
            if (xml.status === 400) {
                console.log("the delete page error");
            }
            else (xml.status === 200)
            {
                console.log("Delete response.....", xml.response);
                location.href = "/Home";


            }
        }
    }
}







function Update() {
    let params = (new URL(window.location.href)).searchParams;
    var id_get = { id: params.get('id') };
    console.log(id_get);
    xml.open("POST", "/edit", true);
    xml.setRequestHeader("content-type", "application/json");
    xml.send(JSON.stringify(id_get));
    xml.onreadystatechange = function () {
        if (xml.readyState === 4) {
            if (xml.status === 400) {
                console.log("the edit page error");
            }
            else (xml.status === 200)
            {
                console.log("update response.....");


                Edit_datas = JSON.parse(xml.response);
                console.log(Edit_datas);

                document.getElementById("pro_name").value = Edit_datas.name;
                document.getElementById("pro_url").value = Edit_datas.url;

            }

        }

    }

}


// var Edit_datas = JSON.parse(localStorage.getItem('Edit_data'));
// console.log("update efunction called..........", Edit_datas);
//document.getElementById("pro_name").value = Edit_datas.name;
//document.getElementById("pro_url").value = Edit_datas.url;


function update_product_value() {
    let params = (new URL(window.location.href)).searchParams;
    var id_get = params.get('id');
    var input = {
        name: document.getElementById("pro_name").value,
        url: document.getElementById("pro_url").value,
        id: id_get
    };
    console.log(input);
    xml.open("POST", "/update", true);
    xml.setRequestHeader("content-type", "application/json");
    xml.send(JSON.stringify(input));
    xml.onreadystatechange = function () {
        if (xml.readyState === 4) {
            if (xml.status === 400) {
                console.log("the edit page error");
            }
            else (xml.status === 200)
            {
                console.log("update response.....");

                location.href = "/Home";
                console.log("The response for edit page");

            }

        }

    }
}
