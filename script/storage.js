"use strict";

const sideBar = document.querySelector("#sidebar");

const breed1 = {
  type: "Dog",
  breed: "Mixed Breed",
};
const breed2 = {
  type: "Dog",
  breed: "Husky",
};
const breed3 = {
  type: "Dog",
  breed: "Doberman Pinscher",
};
const breed4 = {
  type: "Cat",
  breed: "Tabby",
};
const breed5 = {
  type: "Cat",
  breed: "Mixed Breed",
};
const breed6 = {
  type: "Cat",
  breed: "Domestic Short Hair",
};

// Lưu breed mẫu vào localstorage
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", [breed1, breed2, breed3, breed4, breed5, breed6]);
}

// Thêm Animation cho Sidebar
sideBar.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});

// // Lưu data vào LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key, defaultVal) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultVal;
}

const petArr = getFromStorage("petArr", []);
const breedArr = getFromStorage("breedArr", []);
let heathyPettArr = getFromStorage("heathyPettArr", []);
