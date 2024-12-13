document.getElementById("calculate-btn").addEventListener("click", function () {
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
  const taxRate = parseFloat(document.getElementById("tax-rate").value) || 0;
  const inflationRate =
    parseFloat(document.getElementById("inflation-rate").value) || 0;
  const years =
    parseInt(document.getElementById("investment-length-years").value) || 0;
  const months =
    parseInt(document.getElementById("investment-length-months").value) || 0;

  const totalMonths = years * 12 + months;
  const totalYears = totalMonths / 12;
  const annualRate = interestRate / 100;
  const periodicRate = annualRate / compoundingFrequency;

  let balance = initialInvestment;
  let totalContributions = 0;
  let interestFromInitial = 0;
  let interestFromContributions = 0;

  const tableBody = document.getElementById("breakdown-table");
  tableBody.innerHTML = ""; // Clear previous results.

  for (let i = 0; i < totalYears; i++) {
    let yearInterest = 0;
    let yearContributions = 0;

    for (let j = 0; j < compoundingFrequency; j++) {
      const periodicContribution =
        annualContribution / compoundingFrequency +
        (monthlyContribution * 12) / compoundingFrequency;
      yearContributions += periodicContribution;
      totalContributions += periodicContribution;

      const interest = balance * periodicRate;
      balance += interest + periodicContribution;
      yearInterest += interest;

      if (i === 0) {
        interestFromInitial += interest;
      } else {
        interestFromContributions += interest;
      }
    }

    tableBody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>$${yearContributions.toFixed(2)}</td>
                <td>$${yearInterest.toFixed(2)}</td>
                <td>$${balance.toFixed(2)}</td>
            </tr>
        `;
  }

  const totalPrincipal = initialInvestment + totalContributions;
  const totalInterest = balance - totalPrincipal;
  const inflationAdjustment = Math.pow(1 + inflationRate / 100, totalYears);
  const buyingPower = balance / inflationAdjustment;

  document.getElementById("ending-balance").textContent = `$${balance.toFixed(
    2
  )}`;
  document.getElementById(
    "total-principal"
  ).textContent = `$${totalPrincipal.toFixed(2)}`;
  document.getElementById(
    "total-contributions"
  ).textContent = `$${totalContributions.toFixed(2)}`;
  document.getElementById(
    "total-interest"
  ).textContent = `$${totalInterest.toFixed(2)}`;
  document.getElementById(
    "initial-interest"
  ).textContent = `$${interestFromInitial.toFixed(2)}`;
  document.getElementById(
    "contribution-interest"
  ).textContent = `$${interestFromContributions.toFixed(2)}`;
  document.getElementById("buying-power").textContent = `$${buyingPower.toFixed(
    2
  )}`;

  document.getElementById("result").classList.remove("hidden");
  document.getElementById("table-container").classList.remove("hidden");
});
