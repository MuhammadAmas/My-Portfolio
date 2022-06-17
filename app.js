const btnMode = document.querySelector(".btn-mode");
const rootSelector = document.querySelector(":root");

const dark = "#b2e7e8";
const light = "#304d63";

let mode = "darkMode";
btnMode.addEventListener("click", () => {
  if (mode === "darkMode") {
    rootSelector.style.setProperty("--dark", light);
    rootSelector.style.setProperty("--light", dark);
    mode = "lightMode";
  } 
  else {
    rootSelector.style.setProperty("--dark", dark);
    rootSelector.style.setProperty("--light", light);
    mode = "darkMode";
  }
});
