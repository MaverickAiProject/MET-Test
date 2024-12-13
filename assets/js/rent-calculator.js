document.getElementById("calculate-btn").addEventListener("click", function () {
  const income = parseFloat(document.getElementById("income").value);
  const incomeType = document.getElementById("income-type").value;
  const debt = parseFloat(document.getElementById("debt").value);

  if (isNaN(income) || isNaN(debt)) {
    alert("Please enter valid numbers.");
    return;
  }

  const monthlyIncome = incomeType === "yearly" ? income / 12 : income;
  const maxAffordableRent = monthlyIncome * 0.3 - debt;
  const recommendedRent = monthlyIncome * 0.25;

  document.getElementById(
    "affordable-rent"
  ).textContent = `$${maxAffordableRent.toFixed(2)}`;
  document.getElementById(
    "recommended-rent"
  ).textContent = `$${recommendedRent.toFixed(2)}`;
  document.getElementById("result").classList.remove("hidden");
});
