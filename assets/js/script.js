// create our array of topics

var topics = ["Bass Player","Transformers","Volvo","Music","Antiques Roadshow","Volkswagen","Cheese","Samurai"];

console.log(topics);

// write the buttons

for (i=0;i<topics.length;i++) {
    var newButton = $("<button>");
    newButton.addClass("button");
    newButton.attr("data-value",topics[i]);
    newButton.text(topics[i]);
    $("#buttons").append(newButton);
    console.log("new button: " + topics[i]);
}