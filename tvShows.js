import { getElementByIdOrFail } from "./utils.js";
// const description = createElement("div");
const tvMazeUrl = "https://api.tvmaze.com/shows/82/episodes";
const fetchEpisodes = () => {
  return fetch(tvMazeUrl).then((response) => response.json());
};

const listOfEpisodes = getElementByIdOrFail("episodesUL");

function createListOfEpisodes(episodes) {
  return episodes.map((episode) => {
    const element = document.createElement("li");
    element.setAttribute("key", episode.id);
    element.innerHTML =
      episode.name + " - S" + episode.season + "E" + episode.number;
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

fetchEpisodes().then((episodes) => {
  const episodeLiElements = createListOfEpisodes(episodes);
  for (const li of episodeLiElements) {
    listOfEpisodes.appendChild(li);
  }
});
