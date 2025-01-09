const hamburger = document.getElementById("hamburger");
const navbarLinks = document.querySelector(".navbar-links");

// Toggle navbar and hamburger animation
hamburger.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close navbar when a link is clicked
const links = document.querySelectorAll(".navbar-links a"); // Select all links inside navbar
links.forEach((link) => {
  link.addEventListener("click", () => {
    navbarLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});
