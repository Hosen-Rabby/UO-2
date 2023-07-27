const hamburg = document.querySelector(".hamburg");
const headerUl = document.querySelector(".nav_menu");

hamburg.addEventListener("click", () => {
  hamburg.classList.toggle("active");
  headerUl.classList.toggle("active");
});

document.querySelectorAll(".nav_link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburg.classList.remove("active");
    headerUl.classList.remove("active");
  })
);

console.log("connected");
