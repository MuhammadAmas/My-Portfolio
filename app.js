const btnMode = document.querySelector(".btn-mode");
const rootSelector = document.querySelector(":root");

const dark = "hsl(0, 0%, 0%)";
const light = "hsl(46, 100%, 54%)";
const semiDark = "hsl(100, 0%, 0%)";
const semiLight = "hsl(0, 0%, 100%)";

let mode = "darkMode";
btnMode.addEventListener("click", () => {
  if (mode === "darkMode") {
    rootSelector.style.setProperty("--dark", dark);
    rootSelector.style.setProperty("--light", light);
    rootSelector.style.setProperty("--semiDark", semiDark);
    rootSelector.style.setProperty("--semiLight", semiLight);
    mode = "lightMode";
  } 
  else {
    rootSelector.style.setProperty("--dark", light);
    rootSelector.style.setProperty("--light", dark);
    rootSelector.style.setProperty("--semiDark", semiLight);
    rootSelector.style.setProperty("--semiLight", semiDark);
    mode = "darkMode";
  }
});
