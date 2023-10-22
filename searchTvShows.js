let searchBarElement = document.getElementById("searchTvShows");
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

const displaySearchBar = () => {
  const inputBox = document.createElement("input");
  inputBox.setAttribute("id", "inputBox");
  const searchButton = document.createElement("button");
  searchButton.innerHTML = "Search";
  searchButton.setAttribute("id", "searchButton");
  searchButton.addEventListener("click", () => {
    const searchTerm = inputBox.value;
    console.log(inputBox.value);
    const searchTvShowsUrl = `https://api.tvmaze.com/search/shows?q=${searchTerm}`;

    const fetchShows = () => {
      return fetch(searchTvShowsUrl)
        .then((response) => response.json())
        .then((data) => {
          const listOfShowNames = createSearchResult(data);
          for (const show of listOfShowNames) {
            searchResult.appendChild(show);
          }
        });
    };
    fetchShows();
  });
  searchBarElement.appendChild(inputBox);
  searchBarElement.appendChild(searchButton);
};
displaySearchBar();

const displayShow = (showId) => {
  document.cookie =
    "clickedShowId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  document.cookie = `clickedShowId=${showId};path=/`;
  location.assign("showEpisodes.html");
};
