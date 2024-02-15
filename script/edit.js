"use strict";

const submitBtn = document.getElementById("submit-btn");
const heathy_btn = document.querySelector("#healthy-btn");

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tbodyEl = document.querySelector("#tbody");
const btnBMI = document.querySelector("#BMI-btn");
const formEdit = document.querySelector("#container-form");

var noSpaceString = (string) => {
  let newString = [];
  //duyệt qua từng phần tử của chuỗi
  for (let i = 0; i < string.length; ++i) {
    if (string[i] !== " ") {
      // kiểm tra các phần tử của chuỗi khác kí tự trắng
      newString.push(string[i]);
      // thêm kí tự hợp lệ vào mảng newString
    }
  }
  // chuyển đổi từ mảng newString thành chuỗi newString
  newString = newString.join("");
  return newString;
};
// **************************************** noSpaceString FUNCTION****************************************

var renderPetData = (arr) => {
  /*
        renderPetData nhận vào đối số arr
  */
  let htmls = "";
  /*
        sử dụng toán tử 3 ngôi và template string để tạo biến addedDate lưu trữ 
        ngày : qua phương thức getDate() 
        tháng :qua phương thức getMonth()
        năm :qua phương thức getFullYear()
        theo dạng hiển thị " ngày/tháng/năm"
*/
  let getDate = new Date();
  let addDate = `${
    getDate.getDate() < 10 ? `0${getDate.getDate()}` : `${getDate.getDate()}`
  }/${
    getDate.getMonth() + 1 < 10
      ? `0${getDate.getMonth() + 1}`
      : `${getDate.getMonth() + 1}`
  }/${getDate.getFullYear()}`;
  /*
        duyệt qua các phần tử của mảng đối số được truyền vào hàm
        mỗi lần lấy ra các item ta đem nối chuỗi vào biến htmls với cac giá trị :
        petID,petName,petAge,petType,petWeight,petLenght,petBreed,petCl,vaccin,dewormed...
        dưới dạng template string
*/
  arr.map((item, index) => {
    htmls += `   <tr>
    <th scope="row">${item.petID}</th>
    <td>${item.petName}</td>
    <td>${item.petAge}</td>
    <td>${item.petType}</td>
    <td>${item.petWeight} kg</td>
    <td>${item.petLenght} cm</td>
    <td>${item.petBreed}</td>
    <td>
    <i class="bi bi-square-fill" style="color:${item.petCl}"></i>
    </td>
    <td><i class = ${
      item.vaccin === true
        ? `"bi bi-check-circle-fill"`
        : `"bi bi-x-circle-fill"`
    }></i></td>
    <td><i class = ${
      item.dewormed === true
        ? `"bi bi-check-circle-fill"`
        : `"bi bi-x-circle-fill"`
    }></i></td>
    <td><i class = ${
      item.steri === true
        ? `"bi bi-check-circle-fill"`
        : `"bi bi-x-circle-fill"`
    }></i></td>

    <td>${addDate}</td>
    <td>
    <button class="btn btn-danger" id="delete_btn" onclick="editPet('${index}')">Edit</button>
    </td>
  </tr>
    `;
    return htmls;
  });
  // console.log(htmls);
  /*
       sau khi có htmls ta hiển thị ra bảng bằng DOM HTML:innerHTML
 */
  tbodyEl.innerHTML = htmls;
};
function renderBreed() {
  breedInput.innerHTML = `<option>Select Breed</option>`;
  console.log(typeInput.value);
  if (typeInput.value === "Dog") {
    breedArr
      .filter((item) => item.type === "Dog")
      .forEach(function (item) {
        const option = document.createElement("option");
        option.innerHTML = `${item.breed}`;
        breedInput.appendChild(option);
      });
  } else if (typeInput.value === "Cat") {
    breedArr
      .filter((elOfArr) => elOfArr.type === "Cat")
      .forEach(function (elOfArr) {
        const option = document.createElement("option");
        option.innerHTML = `${elOfArr.breed}`;
        breedInput.appendChild(option);
      });
  }
}
typeInput.addEventListener("change", () => {
  renderBreed();
});

renderPetData(petArr);

var editPet = (index) => {
  console.log(index);
  formEdit.classList.remove("hide");
  // let petEdit = petArr.find((item) => item.petID === petID);
  document.getElementById("index").value = index;
  idInput.value = petArr[index].petID;
  nameInput.value = petArr[index].petName;
  ageInput.value = petArr[index].petAge;
  typeInput.value = petArr[index].petType;
  weightInput.value = petArr[index].petWeight;
  lengthInput.value = petArr[index].petLenght;
  breedInput.value = petArr[index].petBreed;
  vaccinatedInput.checked = petArr[index].vaccin;
  dewormedInput.checked = petArr[index].dewormed;
  sterilizedInput.checked = petArr[index].steri;
  colorInput.value = petArr[index].colorInput;
  renderBreed();
  console.log(document.getElementById("index"));
};

var validateHandle = (data) => {
  // -------------------------------------- 1 KIỂM TRA ĐIỀU KIỆN TRÙNG ID------------------------------------
  /* *********************************************************************************************************

        sử dụng vòng for duyệt qua từng phần tử của mảng petArr 
        kiểm tra với điều kiện dữ liệu idInput từ ô idInput sau khi đã loại bỏ kí tự trống có trùng với id của phần tử
        nào trong mảng petArr hay không
        true ==> alert("ID must be unique!");
        false ==> trả về hàm validateHandle()= false;


  // --------------------------------- 2 KIỂM TRA ĐIỀU KIỆN CÁC Ô INPUT TRỐNG---------------------------------
  /* *********************************************************************************************************
    biến formEl: lưu trữ kết quả trả về khi dùng Dom Element lấy ra element có class .form trong file Html.
    biến inputEl: lưu trữ nodelist trả về khi đứng từ " formEl " truy cập vào tất cả các ô input có class .form-control
                  trong file Html

    ***********************************************************************************************************/
  let condition_1;
  let formEl = document.querySelector(".form");
  let inputEl = formEl.querySelectorAll(".form-control");
  /* *********************************************************************************************************
     ý tưởng giải thuật : 
    a) Sinh viên tạo thêm các div.error_message trong file Html dưới mỗi ô input ==> các div.error_message này dùng
    để hiển thị thông báo lỗi nếu người dùng để trống ô dữ liệu. ban đầu div.error_message này có value="";
    b) Sinh viên duyệt qua các phần tử được lưu trong " inputEl " 
      mỗi lần lấy ra 1 phần tử (item) đem item đi kiểm tra với điều kiện 
      dữ liệu = rỗng hoặc dữ liệu = chuỗi "Select Breed" hoặc "Select Type"
      true ==> innerText vào các div.error_message thông báo lỗi
      false==> innerText vào các div.error_message chuỗi rỗng

    ***********************************************************************************************************/
  inputEl.forEach((item) => {
    if (
      noSpaceString(item.value) === "" ||
      item.value === "Select Breed" ||
      item.value === "Select Type"
    ) {
      item.parentElement.querySelector(
        ".error_message"
      ).innerText = `vui long nhap du lieu`;
    } else {
      item.parentElement.querySelector(".error_message").innerText = "";
    }
  });
  /* *********************************************************************************************************
    biến error_message: lưu trữ node list các div.error_message 
    mảng arr_Error_Message : lưu trữ giá trị của các div.error_message

    duyệt qua mảng error_message lấy ra từng phần tử 
    mỗi lần duyệt qua từng item đem push value của item đó vào mảng arr_Error_Message
    kiểm tra tất cả các phần tử của mảng arr_Error_Message bằng rỗng hết thì điều kiện đúng 
    ***********************************************************************************************************/
  let arr_Error_Message = [];
  let error_message = document.querySelectorAll(".error_message");
  console.log(error_message);
  error_message.forEach((item) => {
    arr_Error_Message.push(item.innerText);
  });
  // --------------------------------------------------------------
  condition_1 = arr_Error_Message.every((item) => item === "");
  /* *********************************************************************************************************
      sử dụng cấu trúc rẽ nhánh if else if để lần lượt kiểm tra các điều kiện từ trên xuống dưới
      nếu có 1 trong các điều kiện sai trả về false
      còn lại trả về true
    ***********************************************************************************************************/
  if (condition_1 === false) {
    return false;
  } else if (ageInput.value < 1 || ageInput.value > 15) {
    alert("Age must be between 1 and 15!");
    ageInput.value = "";
    return false;
  } else if (weightInput.value < 1 || weightInput.value > 15) {
    alert("Weight must be between 1 and 15!");
    weightInput.value = "";
    return false;
  } else if (lengthInput.value < 1 || lengthInput.value > 100) {
    alert("Length must be between 1 and 100!");
    lengthInput.value = "";
    return false;
  } else {
    return true;
  }
};

var cleareInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
  colorInput.value = "000";
};

// main app

submitBtn.addEventListener("click", () => {
  let index = document.getElementById("index").value;
  console.log(index);
  petArr[index] = {
    petID: idInput.value,
    petName: noSpaceString(nameInput.value),
    petAge: ageInput.value,
    petType: typeInput.value,
    petWeight: weightInput.value,
    petLenght: lengthInput.value,
    petBreed: breedInput.value,
    vaccin: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    ster: sterilizedInput.checked,
    petCl: colorInput.value,
  };
  let checkValidate = validateHandle(petArr[index]);
  if (checkValidate) {
    saveToStorage("petArr", petArr);
    renderPetData(getFromStorage("petArr", petArr));
    cleareInput();
  }

  // petArr[index]
});
