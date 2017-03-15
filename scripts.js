var mineUrl = "http://yeastmine.yeastgenome.org/yeastmine/service/search?q=";

//find the searchform
var searchForm = document.getElementById("searchForm");

// so, we want to listen to the search form and search
// for whatever is in the input box when the user presses enter.
searchForm.addEventListener("submit", function(event){
  //this line stops the page from refreshing when you press the submit button.
  event.preventDefault();

  //get the input that was typed in the search box
  var searchTerm = document.getElementById("searchTerm").value;

  //use jquery's "ajax" method to run a get request against the endpoint.
  $.ajax(mineUrl + searchTerm).done(function(response) {

    //get the HTML element where we'll put the results:
    var resultsBox = document.getElementById("results");

    //clear out the old results (if any)
    resultsBox.innerHTML = "";

    //go over the fields for the results and output them to the screen
    for (key in response.results) {
      var singleResult = response.results[key];
      //here we're adding one div row per result, and highlighting the result type in bold.
      resultsBox.innerHTML += "<div class='result'>"
      //output the result type (e.g. Gene, Protein, publication)
      + "<strong>" + singleResult.type + ": </strong>"
      //output all the results in the "fields" section of the json:
      + fieldsList(singleResult.fields)
      + "</div>"
    };
  });
});

//This function outputs an HTML list, given a javascript object containing keys and values
// so the input {"symbol": "PPARG", "organism.name": "Homo sapiens"} will become
// <ul>
//   <li><strong>symbol: </strong> PPARG</li>
//   <li><strong>organism.name: </strong> Homo sapiens</li>
// </ul>
function fieldsList(fields){
  //create a variable to store the html in, and open a list tag.
  //<ul> stands for 'unordered list'
  var fieldsHTML = "<ul>";
  //loop over the values in the javascript object
    for (var key in fields) {
      //access the value inside the object and store in in a variable
      var value = fields[key];
      //add the key and value to the HTML we'll be returning
      //<li> stands for list item
      fieldsHTML = fieldsHTML + "<li> "
        // <strong> makes things bold by default
        + "<strong>" + key + ":</strong> " + value + "</li>";
    };
    //close the unordered list tag and return the value to whatever function called it.
  return fieldsHTML + "</ul>";
}
