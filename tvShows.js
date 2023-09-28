import { episodes } from "./episodes.js";
import { getElementByIdOrFail } from "./utils.js";

function fetchFromAPI() {
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => response.json())
    .then((response) => console.log(response));
}
fetchFromAPI();
const listOfEpisodes = getElementByIdOrFail("episodesUL");

function createListOfEpisodes() {
  return episodes.map((episode) => {
    const element = document.createElement("li");
    element.innerHTML =
      episode.name + " - S" + episode.season + "E" + episode.number;
    return element;
  });
}
const episodeLiElements = createListOfEpisodes();
for (const li of episodeLiElements) {
  listOfEpisodes.appendChild(li);
}
