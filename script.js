document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const animatedGif = document.getElementById('animatedGif');

    toggleButton.addEventListener('click', function() {
        if (animatedGif.style.display === 'none') {
            animatedGif.style.display = 'block';
            toggleButton.textContent = 'Hide GIF';
        } else {
            animatedGif.style.display = 'none';
            toggleButton.textContent = 'Show GIF';
        }
    });
});


const header = document.querySelector("header");
const menuBtn = document.querySelector("#menu-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");

menuBtn.addEventListener("click", () => {
  header.classList.toggle("show-mobile-menu");
})

closeMenuBtn.addEventListener("click", () => {
  menuBtn.click()
})