let searchResult = document.getElementById("searchTvShows");

function createSearchResult(shows) {
  return shows.map((show) => {
    const element = document.createElement("div");
    element.innerHTML = show.show.name;
    return element;
  });
}

const searchTvShowsUrl = "https://api.tvmaze.com/search/shows?q=star trek";
const fetchShows = () => {
  return fetch(searchTvShowsUrl).then((response) => response.json());
};

fetchShows().then((data) => {
  const listOfShowNames = createSearchResult(data);
  console.log("after list of shows", listOfShowNames);
  for (const show of listOfShowNames) {
    searchResult.appendChild(show);
  }
});
