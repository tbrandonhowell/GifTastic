
// declaring variables variables:

var pullLimit = 10; // # of gifs we're requesting

// create our array of topics

var topics = [
    "James Bond",
    "Sean Connery",
    "George Lazenby",
    "Roger Moore",
    "Timothy Dalton",
    "Pierce Brosnan",
    "Daniel Craig"];

console.log(topics);

// writeButtons() - write the buttons for the gif topics

var writeButtons = function() {
    $("#buttons").empty(); // clear out the #buttons div
    for (i=0;i<topics.length;i++) { // loop through the array
        var newButton = $("<button>"); // create the new button
        newButton.addClass("gifButton"); // give gifButton class
        newButton.attr("data-value",topics[i]); // assign the search term to the button
        newButton.text(topics[i]); // write the button name
        $("#buttons").append(newButton); // add the button to the buttons div
        console.log("new button: " + topics[i]); // console log
    }
}; // close writeButtons() function

// call writeButtons once to start the page:

writeButtons();

// watch for the click on a search term button

$(document).on("click", ".gifButton", function() { // watch for the click from one of the buttons
    console.log("word click captured"); // console log
    $("#images").empty(); // clear out the images div
    var searchTerm = $(this).attr("data-value"); // capture the search term
    $.get("https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=" + pullLimit + "&api_key=IZubHW9HEDubsdACK9Q1xxiHHbfKg99c").then(function(response) { // poll the API and put returning info into the response variable
        console.log(response); // log the data returned
        for(i=0;i<response.data.length;i++) { // loop through the returned array
            console.log("entry " + i);
            var newDiv = $("<div>"); // make a wrapper for image + rating
            newDiv.addClass("gifDiv"); // add this for styling
            var newImg = $("<img>"); // make the img tag
            newImg.attr("src",response.data[i].images.fixed_width_still.url); // img src
            newImg.attr("id",response.data[i].id); // img id
            newImg.attr("altImg", response.data[i].images.fixed_width.url); // alternate image URL for the swap
            newImg.addClass("gifClick"); // add so we can watch for the click later
            newDiv.append(newImg); // add the image to this image's wrapper div
            var newRating = $("<p>").text(response.data[i].rating); // create the <p> with the rating info
            newDiv.append(newRating); // add the rating into the newDiv
            $("#images").append(newDiv); // add the newDiv to the images div on the screen
        } // close for loop
    }); // close api call
}); // close click watch

// watch for the click on a gif to make it animate

$(document).on("click", ".gifClick", function() { // watch for the click from one of the buttons
    console.log("gif click captured");
    var currentImg = $(this).attr("src"); // capture the current image URL
    var replacementImg = $(this).attr("altImg"); // capture the alternate image URL
    $(this).attr("src", replacementImg); // swap the two image URLss
    $(this).attr("altImg", currentImg); // swap the two image URLs
}); // close click watch

// watch for the click from the faux submit button

$("form").submit(function(event){ // watch for the form submit
    event.preventDefault(); // prevent the form from reloading the page
    console.log("gif addition click captured");
    topics.push(document.getElementById('newGif').value) // push the newGif value from the text field into the gif topics array
    writeButtons(); // call write buttons to update the topics on the screen
});

// from giphy documentation: 
// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
// xhr.done(function(data) { console.log("success got data", data); });