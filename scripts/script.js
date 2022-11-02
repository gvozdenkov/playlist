const content = document.querySelector(".content");
const songsList = content.querySelector(".songs-list");
let songs = songsList.querySelectorAll(".song");
const addButton = content.querySelector(".form__submit_action_add");
const resetButton = content.querySelector(".form__submit_action_reset");
const themeButton = document.querySelector(".theme-btn");

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
  const buttonText = themeButton.querySelector(".icon-button__text");
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

// =============
if (songs.length === 0) {
  resetButton.setAttribute("disabled", true);
}
