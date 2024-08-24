const header = document.querySelector("header");
const menuBtn = document.querySelector("#menu-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");

menuBtn.addEventListener("click", () => {
header.classList.toggle("show-mobile-menu");
})

closeMenuBtn.addEventListener("click", () => {
menuBtn.click()
})

function validateForm() {
  document.querySelectorAll('.error').forEach(error => error.textContent = '');
  let valid = true;

  if (document.getElementById('data_2').value.trim() === '') {
    document.getElementById('error_data_2').textContent = 'First name is required!';
    valid = false;
  }
  if (document.getElementById('data_3').value.trim() === '') {
    document.getElementById('error_data_3').textContent = 'Last name is required!';
    valid = false;
  }
  const email = document.getElementById('data_4').value.trim();
  if (email && !validateEmail(email)) {
    document.getElementById('error_data_4').textContent = 'Email must be a valid email address!';
    valid = false;
  }
  return valid;
}

function validateEmail(email) {
  const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,15}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

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

