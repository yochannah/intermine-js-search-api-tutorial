var mines = { FlyMine: { name: 'FlyMine', url: 'http://www.flymine.org/query' },
  HumanMine: { name: 'HumanMine', url: 'http://www.humanmine.org/humanmine' },
  MouseMine: { name: 'MouseMine', url: 'http://www.mousemine.org/mousemine' },
  YeastMine:
   { name: 'YeastMine',
     url: 'http://yeastmine.yeastgenome.org/yeastmine' },
  'YeastMine Dev':
   { name: 'YeastMine Dev',
     url: 'http://yeastmine-test-aws.yeastgenome.org/yeastmine-dev/' },
  ZebrafishMine: { name: 'ZebrafishMine', url: 'http://www.zebrafishmine.org/' },
  WormMine:
   { name: 'WormMine',
     url: 'http://intermine.wormbase.org/tools/wormmine' },
  SoyMine: { name: 'SoyMine', url: 'http://mines.legumeinfo.org/soymine' },
  BeanMine:
   { name: 'BeanMine',
     url: 'http://mines.legumeinfo.org/beanmine' },
  MedicMine:
   { name: 'MedicMine',
     url: 'http://medicmine.jcvi.org/medicmine' },
  PeanutMine:
   { name: 'PeanutMine',
     url: 'http://mines.legumeinfo.org/peanutmine' },
  LegumeMine:
   { name: 'LegumeMine',
     url: 'https://intermine.legumefederation.org/legumemine' },
  RatMine: { name: 'RatMine', url: 'http://ratmine.mcw.edu/ratmine' },
  Wheat3BMine:
   { name: 'Wheat3BMine',
     url: 'http://urgi.versailles.inra.fr/Wheat3BMine' },
  RepetDB:
   { name: 'RepetDB',
     url: 'http://urgi.versailles.inra.fr/repetdb' },
  ThaleMine: { name: 'ThaleMine', url: 'https://apps.araport.org/thalemine' },
  BovineMine:
   { name: 'BovineMine',
     url: 'http://bovinegenome.org/bovinemine' },
  PhytoMine:
   { name: 'PhytoMine',
     url: 'https://phytozome.jgi.doe.gov/phytomine' },
  FlyTF: { name: 'FlyTF', url: 'http://www.flytf.org/flytfmine' },
  HymenopteraMine:
   { name: 'HymenopteraMine',
     url: 'http://hymenopteragenome.org/hymenopteramine' },
  Mitominer:
   { name: 'Mitominer',
     url: 'http://mitominer.mrc-mbu.cam.ac.uk/release-4.0' },
  TargetMine:
   { name: 'TargetMine',
     url: 'http://targetmine.mizuguchilab.org/targetmine' },
  ToxoMine: { name: 'ToxoMine', url: 'http://toxomine.org/beta/' },
  INDIGO: { name: 'INDIGO', url: 'http://www.cbrc.kaust.edu.sa/indigo' },
  Shaare: { name: 'Shaare', url: 'http://www.shaare.org.uk/release-1.0' },
  XenMine: { name: 'XenMine', url: 'http://www.xenmine.org/xenmine' },
  GrapeMine:
   { name: 'GrapeMine',
     url: 'http://urgi.versailles.inra.fr/GrapeMine' },
  PlanMine: { name: 'PlanMine', url: 'http://planmine.mpi-cbg.de/planmine' },
  TetraMine:
   { name: 'TetraMine',
     url: 'http://adenine.bradley.edu/tetramine' },
  modMine:
   { name: 'modMine',
     url: 'http://intermine.modencode.org/release-33' } };


var mineToQuery = mines.HumanMine;

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
  $.ajax(mineToQuery.url + "/service/search?q=" + searchTerm).done(function(response) {

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
