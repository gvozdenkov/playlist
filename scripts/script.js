const content = document.querySelector(".content");
const themeButton = document.querySelector(".theme-btn");
const songsContainer = content.querySelector(".songs-list");
const addButton = content.querySelector(".form__submit_action_add");
const resetButton = content.querySelector(".form__submit_action_reset");
const noSongElement = content.querySelector(".playlist__no-songs");
const addSongForm = document.forms.addSongForm;
const artist = addSongForm.elements.author;
const title = addSongForm.elements.title;

// ====================== Theme change
doc = document.documentElement;
doc.className = "theme-light";
// ====================== toggle button switch

// function to set a given theme/color-scheme
function setTheme(themeName) {
  doc.className = themeName;
}

// function to toggle between light and dark theme
const toggleTheme = () => {
  const buttonIcon = themeButton.querySelector(".icon-button__icon");

  if (doc.className === "theme-light") {
    setTheme("theme-dark");
    buttonIcon.src = "../images/light_mode.svg";
  } else {
    setTheme("theme-light");
    buttonIcon.src = "../images/dark_mode.svg";
  }
};

themeButton.addEventListener("click", toggleTheme);

// ============= Add songs
function renderHasSongs() {
  resetButton.removeAttribute("disabled", true);
  resetButton.classList.remove("button_disabled");
  noSongElement.classList.add("playlist__no-songs_hidden");
}

function renderNoSongs() {
  resetButton.setAttribute("disabled", true);
  resetButton.classList.add("button_disabled");
  noSongElement.classList.remove("playlist__no-songs_hidden");
}

function getFormInputsValues(form) {
  const formData = new FormData(form);
  const formProps = Object.fromEntries(formData);
  return formProps;
}

function clearFormInputsValues(form) {
  [...form.elements].forEach((input) => {
    input.nodeName === "INPUT" ? (input.value = "") : null;
  });
}

const generateSong = (song) => {
  const songTemplate = document.querySelector("#song-template").content;
  const songElement = songTemplate.querySelector(".song").cloneNode(true);
  const songLikeButtonElement = songElement.querySelector(".song__like-btn");

  songElement.querySelector(".song__title").textContent = song.title;
  songElement.querySelector(".song__author").textContent = song.author;

  return songElement;
};

function renderSong(song, container) {
  container.append(generateSong(song));
}

function handleAddSong(evt) {
  evt.preventDefault();

  const song = getFormInputsValues(addSongForm);

  renderSong(song, songsContainer);
  clearFormInputsValues(addSongForm);
  renderHasSongs();
  setSubmitButtonState(false);
}

function setSubmitButtonState(isFormValid) {
  if (isFormValid) {
    addButton.removeAttribute("disabled");
    addButton.classList.remove("button_disabled");
  } else {
    addButton.setAttribute("disabled", true);
    addButton.classList.add("button_disabled");
  }
}

addSongForm.addEventListener("submit", handleAddSong);
addSongForm.addEventListener("input", (evt) => {
  const isValid =
    artist.value.length > 0 && title.value.length > 0 ? true : false;
  setSubmitButtonState(isValid);
});

resetButton.addEventListener("click", () => {
  const songs = document.querySelectorAll(".song");
  songs.forEach((song) => song.remove());
  renderNoSongs();
});

songsContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("song__like-btn")) {
    evt.target.classList.toggle("song__like-btn_active");
  }
});

renderNoSongs();
