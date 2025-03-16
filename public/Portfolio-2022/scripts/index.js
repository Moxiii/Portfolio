const list = document.querySelectorAll(".list");
function activeLink() {
  list.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}
list.forEach((item) => item.addEventListener("click", activeLink));

const body = document.querySelector("body");
const toggle = document.getElementById("toggle");
toggle.onclick = function () {
  body.classList.toggle("active");
};
document.getElementById("theme-toggle").addEventListener("click", (e) => {
  const checked = e.target.checked;
  document.body.setAttribute("theme", checked ? "dark" : "light");

  if ((setAttribute = "dark")) {
    body.classList.toggle("active");
  }
});
