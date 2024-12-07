const hamburger = document.getElementById("hamburger");
const navbarLinks = document.querySelector(".navbar-links");

hamburger.addEventListener("click", () => {
  navbarLinks.classList.toggle("active"); // Toggle the "active" class to show/hide navbar
});
