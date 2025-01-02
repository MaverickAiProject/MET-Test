const optionSelect = document.getElementById("calculate-option");
const principalField = document.getElementById("input-principal");
const termField = document.getElementById("input-term");
const interestRateField = document.getElementById("input-interest-rate");
const balanceField = document.getElementById("input-balance");

// Function to toggle fields based on selected option
function toggleFields() {
  const option = optionSelect.value;

  // Enable all fields initially
  principalField.style.display = "block";
  termField.style.display = "block";
  interestRateField.style.display = "block";
  balanceField.style.display = "block";

  // Disable the field that corresponds to the selected option
  if (option === "principal") {
    principalField.style.display = "none";
  } else if (option === "term") {
    termField.style.display = "none";
  } else if (option === "interest-rate") {
    interestRateField.style.display = "none";
  } else if (option === "balance") {
    balanceField.style.display = "none";
  }
}

// Attach event listener to the dropdown to toggle fields dynamically
optionSelect.addEventListener("change", toggleFields);

// Call the toggleFields function once to apply the initial state
toggleFields();

document.getElementById("calculate-btn").addEventListener("click", function () {
  const option = document.getElementById("calculate-option").value;
  const principalInput =
    parseFloat(document.getElementById("principal").value) || 0;
  const termInput = parseFloat(document.getElementById("term").value) || 0;
  const interestRateInput =
    parseFloat(document.getElementById("interest-rate").value) || 0;
  const balanceInput =
    parseFloat(document.getElementById("balance").value) || 0;

  let principal = principalInput;
  let term = termInput;
  let interestRate = interestRateInput / 100;
  let balance = balanceInput;

  let resultText = "";

  if (option === "principal") {
    principal = balance / (1 + interestRate * term);
    resultText = `The required Principal is $${principal.toFixed(2)}.`;
  } else if (option === "term") {
    term = (balance - principal) / (principal * interestRate);
    resultText = `The required Term is ${term.toFixed(2)} years.`;
  } else if (option === "interest-rate") {
    interestRate = (balance - principal) / (principal * term);
    resultText = `The required Interest Rate is ${(interestRate * 100).toFixed(
      2
    )}%.`;
  } else if (option === "balance") {
    balance = principal * (1 + interestRate * term);
    resultText = `The Final Balance is $${balance.toFixed(2)}.`;
  }

  // Show the result
  document.getElementById("result-text").textContent = resultText;
  document.getElementById("result").classList.remove("hidden");
});
