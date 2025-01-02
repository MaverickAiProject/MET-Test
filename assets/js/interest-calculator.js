// Function to calculate results
function calculateResults() {
  // Fetching input field values
  const initialInvestment =
    parseFloat(document.getElementById("initial-investment").value) || 0;
  const annualContribution =
    parseFloat(document.getElementById("annual-contribution").value) || 0;
  const monthlyContribution =
    parseFloat(document.getElementById("monthly-contribution").value) || 0;
  const interestRate =
    parseFloat(document.getElementById("interest-rate").value) || 0;
  const compoundingFrequency = parseInt(
    document.getElementById("compounding-frequency").value
  );
  const years =
    parseInt(document.getElementById("investment-length-years").value) || 0;
  const months =
    parseInt(document.getElementById("investment-length-months").value) || 0;
  const taxRate = parseFloat(document.getElementById("tax-rate").value) || 0;
  const inflationRate =
    parseFloat(document.getElementById("inflation-rate").value) || 0;

  const totalMonths = years * 12 + months;
  const monthlyRate = interestRate / 100 / 12;
  const totalContributions =
    annualContribution * years + monthlyContribution * totalMonths;
  let balance = initialInvestment;

  // Calculate balance over time
  for (let i = 0; i < totalMonths; i++) {
    balance += monthlyContribution;
    balance *= 1 + monthlyRate;
  }

  const totalInterest = balance - initialInvestment - totalContributions;
  const buyingPower = balance / Math.pow(1 + inflationRate / 100, years);

  // Update the UI with results
  document.getElementById("ending-balance").textContent = `$${balance.toFixed(
    2
  )}`;
  document.getElementById(
    "total-principal"
  ).textContent = `$${initialInvestment.toFixed(2)}`;
  document.getElementById(
    "total-contributions"
  ).textContent = `$${totalContributions.toFixed(2)}`;
  document.getElementById(
    "total-interest"
  ).textContent = `$${totalInterest.toFixed(2)}`;
  document.getElementById("buying-power").textContent = `$${buyingPower.toFixed(
    2
  )}`;

  // Update breakdown table
  let breakdownHTML = "";
  let yearlyBalance = initialInvestment;
  for (let year = 1; year <= years; year++) {
    // Apply the interest for the year
    let yearDeposit = initialInvestment + annualContribution * year;
    let yearInterest = 0;

    for (let month = 1; month <= 12; month++) {
      yearlyBalance += monthlyContribution; // Add monthly contribution
      yearlyBalance *= 1 + monthlyRate; // Apply interest
    }

    yearInterest =
      yearlyBalance - (initialInvestment + annualContribution * year);

    breakdownHTML += `<tr>
          <td>${year}</td>
          <td>$${yearDeposit.toFixed(2)}</td>
          <td>$${yearInterest.toFixed(2)}</td>
          <td>$${yearlyBalance.toFixed(2)}</td>
      </tr>`;
  }
  document.getElementById("breakdown-table").innerHTML = breakdownHTML;
}

// Set default calculation on page load
window.onload = calculateResults;

// Add event listener for the calculate button
document
  .getElementById("calculate-btn")
  .addEventListener("click", calculateResults);
