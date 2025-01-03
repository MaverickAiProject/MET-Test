document.getElementById("calculateBtn").addEventListener("click", function () {
  const loanAmount = parseFloat(document.getElementById("loanAmount").value);
  const annualInterestRate =
    parseFloat(document.getElementById("interestRate").value) / 100;
  const loanTerm = parseInt(document.getElementById("loanTerm").value);

  if (
    isNaN(loanAmount) ||
    isNaN(annualInterestRate) ||
    isNaN(loanTerm) ||
    loanAmount <= 0 ||
    annualInterestRate <= 0 ||
    loanTerm <= 0
  ) {
    alert("Please enter valid inputs!");
    return;
  }

  const monthlyInterestRate = annualInterestRate / 12;
  const totalPayments = loanTerm * 12;
  const monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

  let balance = loanAmount;
  let totalInterest = 0;
  let amortizationTable = "";

  for (let month = 1; month <= totalPayments; month++) {
    const interest = balance * monthlyInterestRate;
    const principal = monthlyPayment - interest;
    balance -= principal;
    totalInterest += interest;

    amortizationTable += `<tr>
        <td>${month}</td>
        <td>${monthlyPayment.toFixed(2)}</td>
        <td>${principal.toFixed(2)}</td>
        <td>${interest.toFixed(2)}</td>
        <td>${balance > 0 ? balance.toFixed(2) : "0.00"}</td>
      </tr>`;

    if (balance <= 0) break;
  }

  document.getElementById("amortizationTable").innerHTML = amortizationTable;
  document.getElementById("totalPayments").textContent = totalPayments;
  document.getElementById("totalAmount").textContent = (
    monthlyPayment * totalPayments
  ).toFixed(2);
  document.getElementById("totalInterest").textContent =
    totalInterest.toFixed(2);
});
