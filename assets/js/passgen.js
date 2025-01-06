var passLengthRange = document.querySelector("#passLengthRange");
var passLength = document.querySelector("#passLength");

var capitalLettersCheck = document.querySelector("#capitalLettersCheck");
var smallLetterCheck = document.querySelector("#smallLetterCheck");
var numbersCheck = document.querySelector("#numbersCheck");
var symbolsCheck = document.querySelector("#symbolsCheck");
var submitPass = document.querySelector("#submitPass");
var passBox = document.querySelector("#passBox");
var copyPass = document.querySelector("#copyPass");

passLengthRange.addEventListener("input", () => {
  passLength.innerHTML = passLengthRange.value;
});

function passwordGenerator(passwordLength) {
  let allCapitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let allSmallLetter = "abcdefghijklmnopqrstuvwxyz";
  let allNumbers = "1234567890";
  let allSymbols = "!@#$%^&*_-";
  let allChars = "";

  // we can use if else statement or we can use ternery operator

  if (capitalLettersCheck.checked) {
    allChars += allCapitalLetters;
  }
  if (smallLetterCheck.checked) {
    allChars += allSmallLetter;
  }
  if (numbersCheck.checked) {
    allChars += allNumbers;
  }

  allChars += symbolsCheck.checked ? allSymbols : "";

  let finalPassword = "";
  for (i = 0; i < passwordLength; i++) {
    var random = allChars.charAt(Math.floor(Math.random() * allChars.length));
    finalPassword = finalPassword + random;
  }

  passBox.value = finalPassword;
}

submitPass.addEventListener("click", () => {
  var passwordLength = passLengthRange.value;
  passwordGenerator(passwordLength);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    var passwordLength = passLengthRange.value;
    passwordGenerator(passwordLength);
  }
});

copyPass.addEventListener("click", () => {
  if (passBox.value != "" || passBox.value.length >= 1) {
    navigator.clipboard.writeText(passBox.value);
    copyPass.innerHTML = "check";
    copyPass.title = "Password Copied";

    setTimeout(() => {
      copyPass.innerHTML = "content_copy";
      alert("Password Copied Successfully!");
    }, 500);
  } else {
    alert("Please generate a password before copying.");
  }
});
