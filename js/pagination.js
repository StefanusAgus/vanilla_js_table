var pagination = 50;
var current_page = 1;


function changePagination() {
    pagination_value = document.getElementById("pagination").value;
    pagination = pagination_value;
    refreshPage(1)
}

function refreshPage(page) {
    objJson = JSON.parse(json_string)
    var previous_button = document.getElementById("previous_button");
    var next_button = document.getElementById("next_button");    
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    json_data = []
    table = document.getElementById("data_table");
    old_tbody = document.getElementById("table_content");

    if (old_tbody != null) {
        for (var i = (page-1) * pagination; i < (page * pagination); i++) {
            json_data.push(objJson[i])
        }
    
        tbody = document.createElement("tbody");
        tbody.setAttribute("id", "table_content");
    
        for (person of json_data) {
            if (person !== undefined) {
                let row = tbody.insertRow();
                for (let key of table_headers) {
                    let cell = row.insertCell();
                    if (key in person) {
                        text = document.createTextNode(person[key]);
                    } else if (capitalizeFirstLetter(key) in person) {
                        text = document.createTextNode(person[capitalizeFirstLetter(key)]);
                    } else {
                        text = document.createTextNode("-");
                    }
                    cell.appendChild(text);
                    
                }
            }
            
        }
        old_tbody.parentNode.replaceChild(tbody, old_tbody)
    }

    

    if (page == 1) {
        previous_button.style.visibility = "hidden";
    } else {
        previous_button.style.visibility = "visible";
    }

    if (page == numPages()) {
        next_button.style.visibility = "hidden";
    } else {
        next_button.style.visibility = "visible";
    }
    filter_table()
}

function previousPage() {
    if (current_page > 1) {
        current_page--;
        refreshPage(current_page);
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        refreshPage(current_page);
    }
}

function numPages() {
    return Math.ceil(objJson.length / pagination);
}

window.onload = function() {
    setTimeout(function(){
        json_string = localStorage.getItem("jsonObj");
        objJson = JSON.parse(json_string)
        refreshPage(1);
    }, 500); 
};