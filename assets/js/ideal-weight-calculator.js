const heightInput = document.getElementById("height");
const genderSelect = document.getElementById("gender");
const calculateButton = document.getElementById("calculate");
const idealWeightElement = document.getElementById("ideal-weight");

calculateButton.addEventListener("click", (e) => {
  e.preventDefault();

  const height = parseFloat(heightInput.value);
  const gender = genderSelect.value;

  if (height <= 0) {
    alert("Please enter a valid height");
    return;
  }

  const idealWeight = calculateIdealWeight(height, gender);
  idealWeightElement.textContent = `Your ideal weight range is: ${idealWeight} kg`;
});

function calculateIdealWeight(height, gender) {
  const heightInMeters = height / 100;
  let idealWeight;

  if (gender === "male") {
    idealWeight = 50 + 0.91 * (heightInMeters - 1.5);
  } else {
    idealWeight = 45.5 + 0.91 * (heightInMeters - 1.5);
  }

  return idealWeight.toFixed(2);
}
