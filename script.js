const formContainer = document.querySelector("#form-container");
const form = document.querySelector("#myForm");
const imgurl = document.querySelector("#imgurl");
const fullname = document.querySelector("#fullname");
const hometown = document.querySelector("#hometown");
const purpose = document.querySelector("#purpose");
const categoryError = document.querySelector("#category-error");

const container = document.querySelector("#card-container");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");


// Handling Form open-close
document.querySelector("#add-note-btn").addEventListener("click", (evt) => {
  formContainer.style.display = "block";
});
document.querySelector("#form-closebtn").addEventListener("click", (evt) => {
  formContainer.style.display = "none";
});


// Form Validation and Submission Handling

function showError(input) {
  input.classList.add("shake", "red");
  setTimeout(() => input.classList.remove("shake"), 500);
}

function clearError(input) {
  input.classList.remove("red");
}

function isValidUrl(value) {
  const pattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-z]{2,}(\/.*)?$/;
  return pattern.test(value);
}

function isAlpha(value) {
  return /^[A-Za-z\s]+$/.test(value);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formError = false;

  // Image URL
  if (imgurl.value.trim() === "" || !isValidUrl(imgurl.value.trim())) {
    showError(imgurl);
    formError = true;
  } else {
    clearError(imgurl);
  }

  // Full name
  if (fullname.value.trim() === "" || !isAlpha(fullname.value.trim())) {
    showError(fullname);
    formError = true;
  } else {
    clearError(fullname);
  }

  // Hometown
  if (hometown.value.trim() === "" || !isAlpha(hometown.value.trim())) {
    showError(hometown);
    formError = true;
  } else {
    clearError(hometown);
  }

  // Purpose
  if (purpose.value.trim() === "" || purpose.value.trim().length < 5) {
    showError(purpose);
    formError = true;
  } else {
    clearError(purpose);
  }

  // Category (radio check)
  const selectedCategory = document.querySelector("input[name='pref']:checked");
  if (!selectedCategory) {
    categoryError.style.display = "inline";
    formError = true;
  } else {
    categoryError.style.display = "none";
  }

  if (!formError) {
    // Save Data in Local Storage.
    saveData(
      imgurl.value,
      fullname.value,
      hometown.value,
      purpose.value,
      selectedCategory.id
    );
    // Show Data in cards
    showData() // reflects changes in cards as soon form submitted.
    // Remove Error messages, Reset and Hide form
    formContainer.style.display="none"
    form.reset();
    categoryError.style.display = "none";
  }
});

// Remove errors on focus/typing
[imgurl, fullname, hometown, purpose].forEach((input) => {
  input.addEventListener("focus", () => clearError(input));
  input.addEventListener("input", () => clearError(input));
});

// Remove category error if user selects something
document.querySelectorAll("input[name='pref']").forEach((radio) => {
  radio.addEventListener("change", () => {
    categoryError.style.display = "none";
  });
});


// Saving Data to localStorage
function saveData(imgurl, fullname, hometown, purpose, preference) {
  if (localStorage.getItem("reminders") === null) {
    let oldReminders = [];

    oldReminders.push({
      imgurl: imgurl,
      fullname: fullname,
      hometown: hometown,
      purpose: purpose,
      preference: preference,
    });
    oldReminders = JSON.stringify(oldReminders);
    localStorage.setItem("reminders", oldReminders);
  } else {
    let oldReminders = JSON.parse(localStorage.getItem("reminders"));
    console.log(oldReminders);
    oldReminders.push({
      imgurl: imgurl,
      fullname: fullname,
      hometown: hometown,
      purpose: purpose,
      preference: preference,
    });
    oldReminders = JSON.stringify(oldReminders);
    localStorage.setItem("reminders", oldReminders);
  }
}

// Showing Data on Cards
function showData() {
  container.innerHTML=""
  let reminders = JSON.parse(localStorage.getItem("reminders"));
  if(reminders){
    reminders.forEach((person) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
            <img src="${person.imgurl}" alt="${person.fullname}">
            <h4 class="card-username">${person.fullname}</h4>
            <div class="hometown-div">
                <span>Hometown</span>
                <span>${person.hometown}</span>
            </div>
            <div class="purpose-div">
                <span>Purpose</span>
                <span>${person.purpose}</span>
            </div>
            <div class="action-div">
                <button><i class="ri-phone-fill"></i> Call</button>
                <button>Message</button>
            </div>
        `;

    container.appendChild(card);
  });
  }
  
}
showData() // Shows the cards on page load


// Navigate Between cards using up & down button


upBtn.addEventListener("click",function(){
  let lastElem=container.lastElementChild
  if(lastElem){
      container.insertBefore(lastElem,container.firstElementChild)
  }
})
downBtn.addEventListener("click",function(){
  let firstElem=container.firstElementChild
  if(firstElem){
      container.appendChild(firstElem)
  }
})