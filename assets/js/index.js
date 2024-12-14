const hamburger = document.getElementById("hamburger");
const navbarLinks = document.querySelector(".navbar-links");

// Hamburger click to toggle navbar
hamburger.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

// Close navbar when a link is clicked
const links = document.querySelectorAll(".navbar-links a"); // Select all links inside navbar
links.forEach((link) => {
  link.addEventListener("click", () => {
    navbarLinks.classList.remove("active");
  });
});
