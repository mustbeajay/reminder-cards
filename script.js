const formContainer = document.querySelector("#form-container");
const form = document.querySelector("#myForm");
const imgurl = document.querySelector("#imgurl");
const fullname = document.querySelector("#fullname");
const hometown = document.querySelector("#hometown");
const purpose = document.querySelector("#purpose");
const categoryError = document.querySelector("#category-error");



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

    // Show Data in cards

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