document.getElementById("calculate-btn").addEventListener("click", function () {
  const initialDeposit =
    parseFloat(document.getElementById("initial-deposit").value) || 0;
  let annualContribution =
    parseFloat(document.getElementById("annual-contribution").value) || 0;
  const annualIncrease =
    parseFloat(document.getElementById("annual-increase").value) / 100 || 0;
  let monthlyContribution =
    parseFloat(document.getElementById("monthly-contribution").value) || 0;
  const monthlyIncrease =
    parseFloat(document.getElementById("monthly-increase").value) / 100 || 0;
  const interestRate =
    parseFloat(document.getElementById("interest-rate").value) / 100 || 0;
  const yearsToSave =
    parseInt(document.getElementById("years-to-save").value) || 0;
  const taxRate =
    parseFloat(document.getElementById("tax-rate").value) / 100 || 0;

  let balance = initialDeposit;
  let totalContributions = 0;
  let totalInterest = 0;

  const tableBody = document.getElementById("breakdown-table");
  tableBody.innerHTML = ""; // Clear previous table rows.

  for (let year = 1; year <= yearsToSave; year++) {
    let yearDeposit = annualContribution + monthlyContribution * 12;
    let yearInterest = 0;

    for (let month = 0; month < 12; month++) {
      const monthlyInterest = balance * (interestRate / 12) * (1 - taxRate);
      balance += monthlyInterest + monthlyContribution;
      yearInterest += monthlyInterest;
    }

    balance += annualContribution; // Add annual contribution at the end of the year.
    totalContributions += yearDeposit;
    totalInterest += yearInterest;

    // Add row to the table.
    const row = `
            <tr>
                <td>${year}</td>
                <td>$${yearDeposit.toFixed(2)}</td>
                <td>$${yearInterest.toFixed(2)}</td>
                <td>$${balance.toFixed(2)}</td>
            </tr>
        `;
    tableBody.innerHTML += row;

    // Adjust contributions for the next year.
    annualContribution *= 1 + annualIncrease;
    monthlyContribution *= 1 + monthlyIncrease;
  }

  // Update results.
  document.getElementById("ending-balance").textContent = `$${balance.toFixed(
    2
  )}`;
  document.getElementById(
    "initial-deposit-result"
  ).textContent = `$${initialDeposit.toFixed(2)}`;
  document.getElementById(
    "total-contributions"
  ).textContent = `$${totalContributions.toFixed(2)}`;
  document.getElementById(
    "total-interest"
  ).textContent = `$${totalInterest.toFixed(2)}`;

  document.getElementById("result").classList.remove("hidden");
  document.getElementById("table-container").classList.remove("hidden");
});
