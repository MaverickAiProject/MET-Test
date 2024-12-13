document
  .getElementById("investment-time")
  .addEventListener("change", function () {
    const selectedOption = this.value;
    const manualTimeField = document.getElementById("manual-time");
    const datesTimeField = document.getElementById("dates-time");

    if (selectedOption === "manual") {
      manualTimeField.style.display = "block";
      datesTimeField.style.display = "none";
    } else {
      manualTimeField.style.display = "none";
      datesTimeField.style.display = "block";
    }
  });

document.getElementById("calculate-btn").addEventListener("click", function () {
  const amountInvested = parseFloat(
    document.getElementById("amount-invested").value
  );
  const amountReturned = parseFloat(
    document.getElementById("amount-returned").value
  );
  const investmentTimeOption = document.getElementById("investment-time").value;

  let investmentDuration = 0;

  if (investmentTimeOption === "manual") {
    investmentDuration = parseFloat(
      document.getElementById("investment-years").value
    );
  } else if (investmentTimeOption === "dates") {
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);
    investmentDuration = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365.25); // years
  }

  if (
    investmentDuration <= 0 ||
    isNaN(amountInvested) ||
    isNaN(amountReturned)
  ) {
    alert("Please fill in all the fields correctly.");
    return;
  }

  const investmentGain = amountReturned - amountInvested;
  const roi = ((investmentGain / amountInvested) * 100).toFixed(2);
  const annualizedROI = (
    (Math.pow(amountReturned / amountInvested, 1 / investmentDuration) - 1) *
    100
  ).toFixed(2);

  // Display Results
  document.getElementById(
    "investment-gain"
  ).textContent = `Investment Gain: $${investmentGain.toFixed(2)}`;
  document.getElementById("roi").textContent = `ROI: ${roi}%`;
  document.getElementById(
    "annualized-roi"
  ).textContent = `Annualized ROI: ${annualizedROI}%`;
  document.getElementById(
    "investment-length"
  ).textContent = `Investment Length: ${investmentDuration.toFixed(2)} years`;

  document.getElementById("result").classList.remove("hidden");
});
