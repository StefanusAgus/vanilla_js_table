

function filter_table() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search_bar");
    filter = input.value.toUpperCase();
    category = document.getElementById("categories").value;

    table = document.getElementById("data_table");
    tr = table.getElementsByTagName("tr");
    // Get the category index
    
    value_index = table_headers.indexOf(category)

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[value_index];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }


// Generate the select options
function generate_categories_selection() {
    category_selector = document.getElementById("categories");
    first = false;
    for (category of table_headers) {
        var option = document.createElement("option");
        option.value = category;
        option.text = capitalizeFirstLetter( category);
        if (!first) {
            option.selected = true;
            first = true;
        }
        
        category_selector.appendChild(option);
        
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    // Your code to run since DOM is loaded and ready
    table_headers = localStorage.getItem("headers").split(',');
    generate_categories_selection();
});
