"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submit_btn = document.querySelector("#submit-btn");
const breedTable = document.querySelector("#tbody");

// 1 validate

var validateHandel = () => {
  let formInput = document.querySelector("#form");
  let inputEl = formInput.querySelectorAll(".form-control");
  inputEl.forEach((item) => {
    if (item.value === "" || item.value === "Select Type") {
      item.parentElement.querySelector(".error_message").innerText =
        "Vui lòng nhập dữ liệu";
    } else {
      item.parentElement.querySelector(".error_message").innerText = "";
    }
  });
};

// 2 render data

var renderBreedData = (arr) => {
  let htmls = "";
  arr.forEach((item, index) => {
    htmls += `
    <tr>
    <td scope="col">${index + 1}</td>
    <td scope="col">${item.breed}</td>
    <td scope="col">${item.type}</td>
    <td><button class="btn btn-danger" id="edit_btn" onclick="deleteBreed('${index}')">Delete</button> </td>
    </tr>
    `;
  });
  breedTable.innerHTML = htmls;
};
const deleteBreed = (index) => {
  let handelDelet = confirm("Are you sure");
  if (handelDelet) {
    breedArr.splice(index, 1);
  }
  saveToStorage("breedArr", breedArr);
  renderBreedData(breedArr);
  // heathy_btn.innerText = "Show Healthy Pet ";
};

submit_btn.addEventListener("click", () => {
  const breedData = {
    type: typeInput.value,
    breed: breedInput.value,
  };
  validateHandel();
  let error_message = document.querySelectorAll(".error_message");
  console.log(error_message);
  let arr_Error_message = [];
  error_message.forEach((item) => {
    arr_Error_message.push(item.innerText);
  });
  let checkValidate = arr_Error_message.every((item) => item === "");
  console.log(arr_Error_message);
  console.log(checkValidate);
  if (checkValidate) {
    breedArr.push(breedData);
    saveToStorage("breedArr", breedArr);
    renderBreedData(breedArr);
  }
});
window.addEventListener("load", () => {
  renderBreedData(breedArr);
});
