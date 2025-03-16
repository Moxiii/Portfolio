// on déclare nos pointeurs
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const groceryList = document.querySelector(".grocery-list");
const groceryItm = document.querySelector(".itm");
const clearBtn = document.querySelector(".clear-btn");

// les options :

let editElement;
let editFlag = false;
let editID = "";

// les eventlistener
form.addEventListener("submit", addItem);
// clear
clearBtn.addEventListener("click", clearITM);
//charger l'item:
window.addEventListener("DOMContentLoaded", setupITM);
// les fonctions :
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value !== "" && !editFlag) {
    createListITM(id, value);
    container.classList.add("show-container");
    addToLocaleStorage(id, value);
    setBackToDefault();
    console.log("add");
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    editLocaleStorage(editID, value);
    setBackToDefault();
  } else {
    console.log("empty value");
  }
}
function clearITM() {
  const itm = document.querySelectorAll(".grocery-item");
  if (itm.length > 0) {
    itm.forEach(function (item) {
      groceryList.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  setBackToDefault();
  // remove to localeStorage
  localStorage.removeItem("list");
}
//delete / edit function
function deleteITM(e) {
  console.log("item deleted");
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  groceryList.removeChild(element);
  if (groceryList.children.length === 0) {
    container.classList.remove("show-container");
  }
  setBackToDefault();
  removeFromLocalStorage(id);
}
function editITM(e) {
  console.log("item edited");
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}
//retour au default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}
// LOCAL STORAGE :
function addToLocaleStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
  console.log(items);
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
    console.log(items);
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function editLocaleStorage(id, value) {
  let items = getLocalStorage();
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
// option d'items
function setupITM() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListITM(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}
function createListITM(id, value) {
  const element = document.createElement("article");
  element.classList.add("grocery-item");
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `
  <p class="title">${value}</p>
          <div class="btn-container">
            <button type="button" class="edit-btn">
              <ion-icon name="create-outline"></ion-icon>
            </button>
            <button type="button" class="del-btn">
              <ion-icon name="close-circle-outline"></ion-icon>
            </button>
          </div>`;
  const delBtn = element.querySelector(".del-btn");
  const editBtn = element.querySelector(".edit-btn");
  delBtn.addEventListener("click", deleteITM);
  editBtn.addEventListener("click", editITM);
  groceryList.appendChild(element);
}
