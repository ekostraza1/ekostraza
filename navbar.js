const menuBtn = document.querySelector(".menuBtn");
const navBar = document.querySelector(".navBar");
menuBtn.addEventListener("click", navToggle);

function navToggle() {
  menuBtn.classList.toggle("openmenu");
  navBar.classList.toggle("open");
  if (navBar.classList.contains("open")) {
    navBar.style.maxHeight = navBar.scrollHeight + "px";
  } else {
    navBar.removeAttribute("style");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const logo = document.getElementById('logo');
  logo.style.animation = 'rotateGlow 3s ease-in-out forwards';
});

