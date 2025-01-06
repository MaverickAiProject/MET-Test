// Wait for the DOM to fully load before adding event listener
document.addEventListener("DOMContentLoaded", function () {
  // Select the button and add event listener
  document
    .getElementById("calculate-btn")
    .addEventListener("click", calculateCalories);
});

function calculateCalories(e) {
  // Prevent form submission
  e.preventDefault();

  // Get values from form inputs
  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const activity = parseFloat(document.getElementById("activity").value);

  // Validate inputs
  if (
    isNaN(age) ||
    isNaN(weight) ||
    isNaN(height) ||
    age <= 0 ||
    weight <= 0 ||
    height <= 0
  ) {
    alert("Please enter valid inputs!");
    return;
  }

  // Calculate BMR (Basal Metabolic Rate)
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Calculate total calorie needs
  const calorieNeeds = bmr * activity;

  // Display the result
  document.getElementById(
    "calorieOutput"
  ).textContent = `You need approximately ${calorieNeeds.toFixed(
    2
  )} calories per day.`;
  document.getElementById("result").style.display = "block"; // Show the result
}
