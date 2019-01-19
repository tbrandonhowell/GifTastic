// ============================
// declaring variables:
var pullLimit = 50; // # of gifs we're requesting from API
var scrubbedLimit = 10; // # of gifs we'll write that match our aspect ratio
var scrubbedCount = 0; // # of matches we've had to our aspect ratio (used in the click watch function)
var aspectHigh = 1.78; // upper limit of our aspect ratio matching
var aspectLow = 1; // lower limit of our aspect ratio matching
// ============================


// ============================
// create our array of topics:
var topics = [
    "James Bond",
    "Sean Connery",
    "George Lazenby",
    "Roger Moore",
    "Timothy Dalton",
    "Pierce Brosnan",
    "Daniel Craig"];
console.log(topics);
// ============================


// ============================
// writeButtons() - function to write the buttons for the gif topics:
var writeButtons = function() {
    $("#buttons").empty(); // clear out the #buttons div
    for (i=0;i<topics.length;i++) { // loop through the array
        var newButton = $("<button>"); // create the new button
        newButton.addClass("gifButton btn btn-danger m-1"); // give gifButton class
        newButton.attr("data-value",topics[i]); // assign the search term to the button
        newButton.text(topics[i]); // write the button name
        $("#buttons").append(newButton); // add the button to the buttons div
        console.log("new button: " + topics[i]); // console log
    }
}; // close writeButtons() function
// ============================


// ============================
// call writeButtons once on page load:
writeButtons();
// ============================


// ============================
// watch for the click on a search term button
$(document).on("click", ".gifButton", function() { // watch for the click from one of the buttons
    console.log("word click captured"); // console log
    $("#images").empty(); // clear out the images div
    scrubbedCount = 0; // reset scrubbed count
    var offset = Math.floor(Math.random() * 20); // get our random offset to include in the API call so our images are a little different each time
    var searchTerm = $(this).attr("data-value"); // capture the search term in the clicked button
    $.get("https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=" + pullLimit + "&offset=" + offset + "&api_key=IZubHW9HEDubsdACK9Q1xxiHHbfKg99c").then(function(response) { // poll the API and put returning info into the response variable
        console.log(response); // log the data returned
        for(i=0;i<response.data.length;i++) { // loop through the returned array
            var width = response.data[i].images.original.width; // get width of image
            var height = response.data[i].images.original.height; // get height of image
            var ratio = width / height; // get ratio
            console.log(width);
            console.log(height);
            console.log(ratio);
            if (ratio < aspectHigh && ratio > aspectLow && scrubbedCount < scrubbedLimit) {
                console.log("entry " + i);
                var newDiv = $("<div>").addClass("gifDiv"); // make a wrapper for image + rating, add .gifDiv class
                var newImg = $("<img>").addClass("gifClick img-thumbnail m-3"); // make the img tag, add classes
                newImg.attr("src",response.data[i].images.fixed_width_still.url); // img src
                newImg.attr("id",response.data[i].id); // img id
                newImg.attr("altImg", response.data[i].images.fixed_width.url); // alternate image URL for the swap
                newDiv.append(newImg); // add the image to this image's wrapper div
                var newRating = $("<p>").text("Rating: " + response.data[i].rating.toUpperCase()); // create the <p> with the rating info
                newDiv.append(newRating); // add the rating into the newDiv
                $("#images").append(newDiv); // add the newDiv to the images div on the screen
                scrubbedCount++; // increment scrubbedCount
            } else {
                // do nothing
                console.log("doing nothing");
            };
        } // close for loop
    }); // close api call
}); // close click watch
// ============================


// ============================
// watch for the click on a gif to make it animate
$(document).on("click", ".gifClick", function() { // watch for the click from one of the buttons
    console.log("gif click captured");
    var currentImg = $(this).attr("src"); // capture the current image URL
    var replacementImg = $(this).attr("altImg"); // capture the alternate image URL
    $(this).attr("src", replacementImg); // swap the two image URLs
    $(this).attr("altImg", currentImg); // swap the two image URLs
}); // close click watch
// ============================


// ============================
// watch for the click from the text submit button
$("form").submit(function(event){ // watch for the form submit
    event.preventDefault(); // prevent the form from reloading the page
    console.log("gif addition click captured");
    topics.push($("#newGif").val().trim()); // push the input text field into the topics array
    writeButtons(); // call to update the topics buttons on the screen
});
// ============================