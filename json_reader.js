//var DATA_JSON_URL = "https://gist.githubusercontent.com/HeroSizy/d80eb59def9c116948eee7664799b485/raw/1415d62b4e91e621f21ee016accc2e68b7e4b7e1/data.json"
var DATA_JSON_URL = "https://raw.githubusercontent.com/StefanusAgus/vanilla_js_table/master/data.json";
var json_object;
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}  

function getTableHeaders(json_data) {
    var headers = []
    for (person of json_data) {
        let current_headers = Object.keys(person);
        for (let header of current_headers) {
            if (headers.indexOf(header.toLowerCase()) === -1) {
                headers.push(header.toLowerCase());
            }
        }
        if (headers.length === current_headers.length) {
            headers = current_headers;
        }
    }
    return headers;
}


function create_table_from_JSON(JSON_URL) {
    getJSON(JSON_URL, function(error_code, json_data) {
        if (error_code !== null) {
            alert("Error code: " + error_code);
        } else {
            // Process and create the table here
            table = document.getElementById("data_table");
            // Retrieve the table header from the keys
            table_headers = getTableHeaders(json_data);
            localStorage.setItem("headers", table_headers);
            localStorage.setItem("jsonObj", JSON.stringify(json_data));
            json_object = json_data;
            
            var tbody = document.createElement("tbody");
            tbody.setAttribute("id", "table_content");
            

            // Create table entry for each person in the retrieved JSON Data
            for (person of json_data) {
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
            table.appendChild(tbody);


            // Generate table headers
            let thead = table.createTHead();
            let row = thead.insertRow();
            for (let header_index in table_headers) {
                // Create th element
                var th = document.createElement("th");
                let text = document.createTextNode(capitalizeFirstLetter(table_headers[header_index]));
                
                // Add onClick listener to the the sort table function
                th.onclick = function() {
                    sortTable(header_index);
                }
                th.appendChild(text);
                row.appendChild(th);
            }
        }
    });
}
create_table_from_JSON(DATA_JSON_URL)
