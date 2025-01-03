document.addEventListener("DOMContentLoaded", function () {
  // Set default values
  const incomeInput = document.getElementById("income");
  const incomeTypeSelect = document.getElementById("income-type");
  const debtInput = document.getElementById("debt");

  incomeInput.value = 60000; // Default yearly income
  incomeTypeSelect.value = "yearly"; // Default income type
  debtInput.value = 500; // Default monthly debt

  // Calculate and display initial dummy results
  calculateAndDisplayResults();

  // Add event listener to Calculate button
  document
    .getElementById("calculate-btn")
    .addEventListener("click", function () {
      calculateAndDisplayResults();
    });

  function calculateAndDisplayResults() {
    const income = parseFloat(incomeInput.value);
    const incomeType = incomeTypeSelect.value;
    const debt = parseFloat(debtInput.value);

    if (isNaN(income) || isNaN(debt)) {
      alert("Please enter valid numbers.");
      return;
    }

    const monthlyIncome = incomeType === "yearly" ? income / 12 : income;
    const maxAffordableRent = monthlyIncome * 0.3 - debt;
    const recommendedRent = monthlyIncome * 0.25;

    // Update result text with calculated values
    document.getElementById(
      "affordable-rent"
    ).textContent = `$${maxAffordableRent.toFixed(2)}`;
    document.getElementById(
      "recommended-rent"
    ).textContent = `$${recommendedRent.toFixed(2)}`;
  }
});
