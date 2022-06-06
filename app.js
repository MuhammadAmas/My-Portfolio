const btnMode = document.querySelector('.btn-mode');
const rootSelector = document.querySelector(':root');



btnMode.addEventListener('click',()=>{
   rootSelector.style.setProperty('--dark','hsl(0 0%, 100%)');
   rootSelector.style.setProperty('--light','hsl(0 0%, 0%)');
   rootSelector.style.setProperty('--semiDark','hsl(0 0%, 100%)');
} )
