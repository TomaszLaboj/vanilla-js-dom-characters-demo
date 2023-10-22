const searchTvShowsUrl = "https://api.tvmaze.com/search/shows?q=star trek";

const fetchShows = () => {
  return fetch(searchTvShowsUrl).then((response) => response.json());
};

let searchBar = document.getElementById("searchTvShows");
let searchResult = document.getElementById("searchResult");

function createSearchResult(shows) {
  return shows.map((show) => {
    const element = document.createElement("div");
    element.innerHTML = show.show.name;
    const btn = document.createElement("button");
    btn.textContent = "show info";
    btn.addEventListener("click", () => displayShow(show.show.id));
    element.appendChild(btn);
    return element;
  });
}

fetchShows().then((data) => {
  const listOfShowNames = createSearchResult(data);

  for (const show of listOfShowNames) {
    searchResult.appendChild(show);
  }
});

const displaySearchBar = () => {
  const inputBox = document.createElement("input");
  const searchButton = document.createElement("button");
  searchButton.innerHTML = "Search";
  searchBar.appendChild(inputBox);
  searchBar.appendChild(searchButton);
};
displaySearchBar();

const displayShow = (showId) => {
  document.cookie =
    "clickedShowId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  document.cookie = `clickedShowId=${showId};path=/`;
  location.assign("showEpisodes.html");
};
