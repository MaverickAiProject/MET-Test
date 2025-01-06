document.getElementById("dob").value = new Date().toISOString().split("T")[0];
document.getElementById("age-date").value = new Date()
  .toISOString()
  .split("T")[0];

document.getElementById("calculate").addEventListener("click", calculateAge);

function calculateAge() {
  const dob = new Date(document.getElementById("dob").value);
  const ageDate = new Date(document.getElementById("age-date").value);

  if (ageDate < dob) {
    alert("Age at the Date cannot be earlier than Date of Birth.");
    return;
  }

  const diffTime = ageDate - dob;

  // Calculate the difference in days, hours, minutes, and seconds
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = days * 24;
  const minutes = hours * 60;
  const seconds = minutes * 60;

  // Calculate years, months, and weeks
  const years = Math.floor(days / 365.25);
  const remainingDaysForMonths = days % 365.25;
  const months = Math.floor(remainingDaysForMonths / 30.44);
  const remainingDays = Math.round(remainingDaysForMonths % 30.44);
  const weeks = Math.floor(days / 7);

  // Format the result
  const result = `
        ${years} years ${months} months ${remainingDays} days
        or ${years * 12 + months} months ${remainingDays} days
        or ${weeks} weeks ${days % 7} days
        or ${days} days
        or ${hours.toLocaleString()} hours
        or ${minutes.toLocaleString()} minutes
        or ${seconds.toLocaleString()} seconds
    `;

  // Display the result
  document.getElementById("age-result").innerText = result.trim();
}
