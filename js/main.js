const hamburg = document.querySelector(".hamburg");
const headerUl = document.querySelector(".nav_menu");
const hamBtn = document.querySelector(".humbarger");
const modalMenu = document.querySelector(".modal_menu");

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

hamBtn.addEventListener("click", () => {
  console.log("Clicked");
  modalMenu.classList.add("modal_menu_active");
});

console.log("connected");
