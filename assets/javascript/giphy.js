//Global Variables//
var subjectsArray = ["Art", "History", "Poetry", "Math", "Physics", "Geometry", "Biology", "Philosophy"];
var APIkey = "69ycAJq916QcNVDqkghlLHb2IrLfz4g5";

/*$.ajax({
    url: queryURL,
    method: "GET",
})

.then(function(response) {
    console.log(queryURL);
    console.log(response);

});*/

$(window).ready(function() {
$("#entire-container").fadeIn(4000);
});
//startUp function generates the buttons from the given array//
function startUp() {
    for (i = 0; i < subjectsArray.length; i++) {
        var subjectsIndex = subjectsArray[i];
        newButton = $("<button>" + subjectsIndex + "</button>");
        newButton.attr({ class: "btn btn-dark work-button", value: subjectsIndex.toLowerCase() });
        newButton.attr("data-subject", subjectsIndex.toLowerCase());
        $("#buttons-column").append(newButton);
    }
};

//function for taking user-input and creating it into a button
$("#submit").on("submit", function(e){
    e.preventDefault();
 var valuedUserInput = $("input[name='input']").val().trim();
 console.log(valuedUserInput);
 $("#submit-field").val('');
 valuedUserInput = firstCap(valuedUserInput);
 console.log(valuedUserInput);
 subjectsArray.push(valuedUserInput);
 console.log(subjectsArray);
 $("#buttons-column").empty();
 startUp();
});

//valuedUserInput.addEventListener("keyup", function(f) {
//    f.preventDefault();
//    if (f.keyCode === 13) {
//        $("#submit-btn").click();
//    }
//});

//function to take the user input and capitalize the first letter of every word
function firstCap(str)
{
 return str.toString().replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + 
 txt.substr(1).toLowerCase();});
}


//on-click function for the dynamically-generated buttons//
$(document).on("click", ".work-button", function (e) {

    //prevents default action of ...whatever these buttons do
    e.preventDefault();

    //empties the text input field
    $("input[name=input]").empty();

    //empties the #gifs-here div so we don't constantly increment the total amount of .gifs on the Web page
    $("#gifs-here").empty();

    //grabs and stores the value of whichever button is clicked
    var grabbedValue = $(this).attr("data-subject");

    //queryURL utilizing the taken value previously acquired
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + grabbedValue + "&rating=pg&limit=10&api_key=" + APIkey;

    //initiating the AJAX call
    $.ajax({
        url: queryURL,
        method: "GET",
    })

        .then(function (response) {
            console.log(queryURL);
            console.log(response);

            //stores the data from the AJAX call into the results variable
            var results = response.data
            //creating a new row
            var output = $("<div>");
            output.attr("class", "row ");


            //for loop to grab the .gifs' and populate them in the HTML page
            for (i = 0; i < results.length; i++) {

                //creates a global variable with necessary class attributes in one step
                var columns = $("<div class='col-sm-6 col-md-6 col-lg-6 d-flex align-items-center justify-content-center dynamic-gif'>");
                //appending the new column to the output div
                output.append(columns);
                console.log(columns);
                //creating a new global variable holding the rating inside of a paragraph tag
                var rating = $("<p>Rating: " + results[i].rating + "</p>");
                //appending this rating to the newly created column
                columns.append(rating);
                //creating a new global variable holding the image tag and all of the necessary data values
                var subjectGIF = $("<img></img>");
                subjectGIF.attr("src", results[i].images.fixed_height_still.url);
                subjectGIF.attr("data-still", results[i].images.fixed_height_still.url);
                subjectGIF.attr("data-animate", results[i].images.fixed_height.url);
                subjectGIF.attr("data-state", "still");
                subjectGIF.attr("class", "gif");
                //appending this image tag to the columns tag, appearing after the rating element
                columns.append(subjectGIF);
                //appending everything to the HTML page
                $("#gifs-here").append(output);
            }
        });
});

//Function for on-click events for the .gifs
$(document).on("click", ".gif", function(f) {
    //prevents default action(?)
    f.preventDefault();

    //grabs the value of the data-state for whichever .gif is clicked
   var state = $(this).attr("data-state");

   // If the clicked image's state is still, update its src attribute to what its data-animate value is.
   //Then set the image's data-state to animate
   //Else set src to the data-still value
   if (state === "still") {
       $(this).attr("src", $(this).attr("data-animate"));
       $(this).attr("data-state", "animate");
   } else {
       $(this).attr("src", $(this).attr("data-still"));
       $(this).attr("data-state", "still");
   } 
});

startUp();

