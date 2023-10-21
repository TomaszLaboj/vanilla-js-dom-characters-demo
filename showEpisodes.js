const searchShowId = getCookie(document.cookie);

const tvMazeUrl = `https://api.tvmaze.com/shows/${searchShowId}/episodes`;
const fetchEpisodes = () => {
  return fetch(tvMazeUrl).then((response) => response.json());
};

const fetchTitle = () => {
  return fetch(`https://api.tvmaze.com/shows/${searchShowId}`).then(
    (response) => response.json()
  );
};

const listOfEpisodes = document.getElementById("episodesDIV");
const showTitleElement = document.getElementById("showTitle");

function showTitle(title) {
  const titleElement = document.createElement("p");
  titleElement.innerHTML = title;
  showTitleElement.appendChild(titleElement);
}

function createListOfEpisodes(episodes) {
  return episodes.map((episode) => {
    const element = document.createElement("div");
    element.setAttribute("key", episode.id);
    element.setAttribute("class", "episode");
    const name = document.createElement("h3");
    name.setAttribute("class", "episode-name");
    name.innerHTML = episode.name;
    element.appendChild(name);
    const seasonEpisodeCode = document.createElement("p");
    seasonEpisodeCode.setAttribute("class", "season-episode-code");
    seasonEpisodeCode.innerHTML = displaySeasonEpisodeCode(
      episode.season,
      episode.number
    );
    element.appendChild(seasonEpisodeCode);
    const summary = document.createElement("div");
    summary.innerHTML = episode.summary;
    element.appendChild(summary);
    element.appendChild(addImage(episode.image.medium));
    return element;
  });
}

function addImage(imgUrl) {
  const imageElement = document.createElement("img");
  imageElement.setAttribute("src", imgUrl);
  return imageElement;
}

fetchTitle().then((data) => {
  console.log(data);
  showTitle(data.name);
});

fetchEpisodes().then((episodes) => {
  const episodeLiElements = createListOfEpisodes(episodes);
  for (const ep of episodeLiElements) {
    listOfEpisodes.appendChild(ep);
  }
});

function displaySeasonEpisodeCode(seasonNumber, episodeNumber) {
  let seasonCode;
  let episodeCode;
  if (seasonNumber <= 9) {
    seasonCode = "S0" + seasonNumber.toString();
  } else {
    seasonCode = "S" + seasonNumber.toString();
  }
  if (episodeNumber <= 9) {
    episodeCode = "E0" + episodeNumber.toString();
  } else {
    episodeCode = "E" + episodeNumber.toString();
  }
  return seasonCode + episodeCode;
}

function getCookie(cookie) {
  return cookie.substring(cookie.indexOf("=") + 1);
}
