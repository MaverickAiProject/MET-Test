document.getElementById("calculate-btn").addEventListener("click", function () {
  const sd = document.getElementById("start-date").value;
  const ed = document.getElementById("end-date").value;

  if (!sd || !ed) {
    alert("Empty dates! Please fill the dates correctly.");
    return;
  }

  const startDate = new Date(sd);
  const endDate = new Date(ed);

  if (startDate >= endDate) {
    alert("End Date must be greater than Start Date.");
    return;
  }

  // Calculate the difference in total days
  const timeDifference = endDate - startDate;
  const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Calculate years, months, and remaining days
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Calculate months in total
  const totalMonths = years * 12 + months;

  // Calculate weeks and remaining days
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  // Convert days to other units
  const hours = totalDays * 24;
  const minutes = hours * 60;
  const seconds = minutes * 60;

  // Display Results
  document.getElementById(
    "date-result"
  ).textContent = `${years} years ${months} months ${days} days 
or, ${totalMonths} months ${days} days 
or, ${totalWeeks} weeks ${remainingDays} days
or, ${totalDays} days
or, ${hours.toLocaleString()} hours
or, ${minutes.toLocaleString()} minutes
or, ${seconds.toLocaleString()} seconds
  `;
});
