let searchResult = document.getElementById("searchTvShows");

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

const searchTvShowsUrl = "https://api.tvmaze.com/search/shows?q=star trek";
const fetchShows = () => {
  return fetch(searchTvShowsUrl).then((response) => response.json());
};

fetchShows().then((data) => {
  const listOfShowNames = createSearchResult(data);

  for (const show of listOfShowNames) {
    searchResult.appendChild(show);
  }
});

const displayShow = (showId) => {
  document.cookie =
    "clickedShowId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  document.cookie = `clickedShowId=${showId};path=/`;
  location.assign("showEpisodes.html");
};