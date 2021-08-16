import menues from './menu.json';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const switchTheme = document.querySelector('#theme-switch-toggle')
switchTheme.addEventListener('change', onSwithCange);
document.body.classList.add(Theme.LIGHT);
const isDarkTheme = localStorage.getItem('isDarkTheme');
checkThemeState();



function checkThemeState() {
    if (isDarkTheme === 'true') {
        document.body.classList.replace(Theme.LIGHT, Theme.DARK);
        switchTheme.checked = true;
        return
    }
    else {
        document.body.classList.replace(Theme.DARK, Theme.LIGHT);
        switchTheme.checked = false;

    }
    
}


function onSwithCange(evt) {
    
    localStorage.setItem('isDarkTheme',evt.target.checked)
    if (evt.target.checked) {
        document.body.classList.remove(Theme.LIGHT)
        document.body.classList.add(Theme.DARK)
    }
    else {
        document.body.classList.add(Theme.LIGHT)
        document.body.classList.remove(Theme.DARK)
    };
}