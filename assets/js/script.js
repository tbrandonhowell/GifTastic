
// misc variables:

var pullRating; // rating for the gifs we're requesting
var pullLimit; // # of gifs we're requesting

// create our array of topics

var topics = [
    "Laser Cat",
    "Piano Cat",
    "Grumpy Cat",
    "Space Cat",
    "Watermelon Cat",
    "Smart Cat",
    "Dumb Cat",
    "Cute Cat"];

console.log(topics);

// writeButtons() - write the buttons for the gif topics

var writeButtons = function() {
    $("#buttons").empty(); // clear out the #buttons div
    for (i=0;i<topics.length;i++) {
        var newButton = $("<button>");
        newButton.addClass("gifButton");
        newButton.attr("data-value",topics[i]);
        newButton.text(topics[i]);
        $("#buttons").append(newButton);
        console.log("new button: " + topics[i]);
    }
};

// call writeButtons once to start the page

writeButtons();

// watch for the click on a word button

$(document).on("click", ".gifButton", function() { // watch for the click from one of the buttons
    console.log("word click captured");
    var searchTerm = $(this).attr("data-value"); // capture the search term
    var newDiv = $("<div>"); // create new div to hold the images
    var apiResponse = $.get("https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=10&api_key=IZubHW9HEDubsdACK9Q1xxiHHbfKg99c");
    apiResponse.done(function(data) { //  build out the images
        console.log(data); // log the data
        for(i=0;i<data.data.length;i++) {
            console.log("entry " + i);
            var newImg = $("<img>");
            newImg.attr("src",data.data[i].images.fixed_width_still.url);
            newImg.attr("arrayId",i);
            newImg.attr("id",data.data[i].id);
            newImg.attr("gPlay", "stopped");
            newImg.attr("altImg", data.data[i].images.fixed_width.url);
            newImg.addClass("gifClick");
            newDiv.append(newImg);
            var newRating = $("<p>");
            newRating.text(data.data[i].rating);
            newDiv.append(newRating);
        }
    });
    $("#images").html(newDiv); // add the images to the DOM

}); // close click watch

// watch for the click on a gif to make it animate

$(document).on("click", ".gifClick", function() { // watch for the click from one of the buttons
    console.log("gif click captured");
    var currentImg = $(this).attr("src"); // capture the current image URL
    var replacementImg = $(this).attr("altImg"); // capture the alternate image URL
    $(this).attr("src", replacementImg);
    $(this).attr("altImg", currentImg);
}); // close click watch

// watch for the click from the faux submit button

$(document).on("click", "#submit", function() { 
    console.log("gif addition click captured");
    topics.push(document.getElementById('newGif').value) // add the input to the topics array
    writeButtons(); // call write buttons to update the topics on the screen
}); // close click watch

// from giphy documentation: 
// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
// xhr.done(function(data) { console.log("success got data", data); });