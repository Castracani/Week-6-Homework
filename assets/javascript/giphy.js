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

//startUp function generates the buttons from the given array//
function startUp() {
    for (i = 0; i < subjectsArray.length; i++) {
        var subjectsIndex = subjectsArray[i];
        newButton = $("<button>" + subjectsIndex + "</button>");
        newButton.attr( {class: "btn btn-dark work-button", value: subjectsIndex.toLowerCase()} );
        newButton.attr("data-subject", subjectsIndex.toLowerCase());
        $("#buttons-column").append(newButton);
    }
};

//on-click function for the dynamically-generated buttons//
$(document).on("click", ".work-button", function(e) {
    
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

     .then(function(response) {
         console.log(queryURL);
         console.log(response);

         //stores the data from the AJAX call into the results variable
         var results = response.data
         //creating a new row
         var output = $("<div>");
         output.attr("class", "row ");
         

        //for loop to grab the .gifs' and populate them in the HTML page
         for (i = 0; i < results.length; i++) {

            var columns = $("<div class='col-sm-6 col-md-6 col-lg-6 d-flex align-items-center justify-content-center dynamic-gif'>");
            output.append(columns);
            console.log(columns);
            var rating = $("<p>Rating: " + results[i].rating + "</p>");
            columns.append(rating);
            var subjectGIF = $("<img></img>");
            subjectGIF.attr("src", results[i].images.fixed_height_still.url);
            subjectGIF.attr("data-still", results[i].images.fixed_height_still.url);
            subjectGIF.attr("data-animate", results[i].images.fixed_height.url);
            subjectGIF.attr("data-state", "still");
            subjectGIF.attr("class", "gif");
            columns.append(subjectGIF);
            $("#gifs-here").append(output);
             

           /* if((i%5)==0)
            {
                //when the sixth .GIF is reached, a new row is created
                output.append("</div><div class='row'>" + "<div class='col-2 col-sm-2 col-md-2 col-lg-2 dynamic-gif'></div>");
                $(".dynamic-gif").append("<p>testing</p>");
            }
            else
            {
                //.GIF's are all given separate columns
                output.append("<div class='col-2 col-sm-2 col-md-2 col-lg-2 dynamic-gif'></div>");
                $(".dynamic-gif").append("<p>testing</p>");
            }
            if((i%5)!=0)
            {
                output.append("</div><div class='row'>");
            }

            $("#entire-container").append(output);*/

            //HTML output


         }




     });

});



startUp();

