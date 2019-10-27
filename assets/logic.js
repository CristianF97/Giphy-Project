let topics = [
  "Pokémon",
  "Thomas The Tank Engine",
  "Godzilla",
  "SpongeBob",
  "Top Gear",
  "Ocean"
];

for (let i = 0; i < topics.length; i++) {
  $("<button>")
    .addClass("newBtn btn btn-outline-primary")
    .text(topics[i])
    .attr("data", topics[i])
    .appendTo("#buttons");
}

$("#search-term").on("click", function(event) {
  event.preventDefault();

  let userSearch = $("#searchInput")
    .val()
    .trim();
  for (let j = 0; j < topics.length; j++) {
    if (userSearch === topics[j]) {
      alert("Your search term has already been created").attr(
        "alert alert-danger"
      );
      return false;
    }
    $("#searchInput").val("");
  }
  if (userSearch === "") {
    alert("Please enter a search term");
    return false;
  } else {
    let newItem = $("<button>")
      .addClass("newBtn btn btn-outline-warning")
      .text(userSearch)
      .attr("data", userSearch)
      .appendTo("#buttons");

    topics.push(newItem.attr("data"));

    $("#searchInput").val("");
  }
});

$(document.body).on("click", ".newBtn", function() {
  let userQuery = $(this).attr("data");

  const queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=7UvXtLFKeWjTdHfzYurKYvkQ1QbkmM7B&q=" +
    userQuery +
    "&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    let results = response.data;

    for (let i = 0; i < results.length; i++) {
      let rating = results[i].rating;
      let x = $("<p>")
        .text("Rating: " + rating)
        .prependTo("#queuedGifs");

      let gif = $("<img>")
        .addClass("gif", "card")
        .attr("src", results[i].images.fixed_height_still.url)
        .attr("data-animate", results[i].images.fixed_height.url)
        .attr("data-still", results[i].images.fixed_height_still.url)
        .attr("data-state", "still")
        .appendTo(x);
    }

    $(".gif").on("click", function() {
      let state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  });
});
