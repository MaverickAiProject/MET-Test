document.getElementById("calculate-btn").addEventListener("click", function () {
  const startDate = new Date(document.getElementById("start-date").value);
  const endDate = new Date(document.getElementById("end-date").value);

  if (startDate >= endDate) {
    alert("End Date must be greater than Start Date.");
    return;
  }

  // Calculate Total Days
  const timeDifference = endDate - startDate;
  const totalDays = timeDifference / (1000 * 3600 * 24);

  // Calculate Months and Days
  const months =
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear());
  const monthsDays = new Date(endDate.setMonth(endDate.getMonth() - months));
  const diffDays = Math.floor((endDate - monthsDays) / (1000 * 3600 * 24));

  // Calculate Weeks and Days
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  // Display Results
  document.getElementById(
    "months-days"
  ).textContent = `Difference: ${months} months and ${diffDays} days`;
  document.getElementById(
    "weeks-days"
  ).textContent = `Or, ${totalWeeks} weeks and ${remainingDays} days`;
  document.getElementById(
    "total-days"
  ).textContent = `Total days: ${totalDays} days`;

  document.getElementById("result").classList.remove("hidden");
});
