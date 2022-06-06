const btnMode = document.querySelector(".btn-mode");
const rootSelector = document.querySelector(":root");

let mode = "darkMode";
btnMode.addEventListener("click", () => {
  if (mode === "darkMode") {
    rootSelector.style.setProperty("--dark", "hsl(0, 0%, 100%)");
    rootSelector.style.setProperty("--light", "hsl(0, 0%, 0%)");
    rootSelector.style.setProperty("--semiDark", "hsl(0, 2%, 76%)");
    rootSelector.style.setProperty("--semiLight", "hsl(0, 3%, 6%)");
    mode = "lightMode";
  } 
  else {
    rootSelector.style.setProperty("--dark", "hsl(0, 0%, 0%)");
    rootSelector.style.setProperty("--light", "hsl(0, 0%, 100%)");
    rootSelector.style.setProperty("--semiDark", "hsl(0, 2%, 6%)");
    rootSelector.style.setProperty("--semiLight", "hsl(0, 3%, 76%)");
    mode = "darkMode";
  }
});
