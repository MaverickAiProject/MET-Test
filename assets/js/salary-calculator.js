document.getElementById("calculate-btn").addEventListener("click", function () {
  const salaryAmount =
    parseFloat(document.getElementById("salary-amount").value) || 0;
  const payPeriod = document.getElementById("pay-period").value;
  const workHoursPerDay =
    parseFloat(document.getElementById("work-hours-per-day").value) || 0;
  const workDaysPerWeek =
    parseFloat(document.getElementById("work-days-per-week").value) || 0;
  const vacationDaysPerYear =
    parseFloat(document.getElementById("vacation-days").value) || 0;

  // Calculate total working days per year (excluding vacation days)
  const workingDaysPerYear = workDaysPerWeek * 52 - vacationDaysPerYear;

  // Calculate daily salary based on the base salary amount
  let dailySalary, hourlySalary, weeklySalary, monthlySalary, yearlySalary;

  if (payPeriod === "hour") {
    hourlySalary = salaryAmount;
    dailySalary = hourlySalary * workHoursPerDay;
    weeklySalary = dailySalary * workDaysPerWeek;
    monthlySalary = weeklySalary * 4; // Approx 4 weeks per month
    yearlySalary = monthlySalary * 12; // 12 months in a year
  } else if (payPeriod === "day") {
    dailySalary = salaryAmount;
    hourlySalary = dailySalary / workHoursPerDay;
    weeklySalary = dailySalary * workDaysPerWeek;
    monthlySalary = weeklySalary * 4; // Approx 4 weeks per month
    yearlySalary = monthlySalary * 12; // 12 months in a year
  } else if (payPeriod === "week") {
    weeklySalary = salaryAmount;
    dailySalary = weeklySalary / workDaysPerWeek;
    hourlySalary = dailySalary / workHoursPerDay;
    monthlySalary = weeklySalary * 4; // Approx 4 weeks per month
    yearlySalary = monthlySalary * 12; // 12 months in a year
  } else if (payPeriod === "month") {
    monthlySalary = salaryAmount;
    weeklySalary = monthlySalary / 4; // Approx 4 weeks per month
    dailySalary = weeklySalary / workDaysPerWeek;
    hourlySalary = dailySalary / workHoursPerDay;
    yearlySalary = monthlySalary * 12; // 12 months in a year
  } else if (payPeriod === "year") {
    yearlySalary = salaryAmount;
    monthlySalary = yearlySalary / 12;
    weeklySalary = monthlySalary / 4; // Approx 4 weeks per month
    dailySalary = weeklySalary / workDaysPerWeek;
    hourlySalary = dailySalary / workHoursPerDay;
  }

  // Calculate the salary after deducting the vacation days
  const vacationSalaryDeducted = vacationDaysPerYear * dailySalary;
  const adjustedYearlySalary = yearlySalary - vacationSalaryDeducted;

  // Populate the result table with salary breakdown, including vacation deduction
  const salaryBreakdown = document.getElementById("salary-breakdown");
  salaryBreakdown.innerHTML = `
        <tr>
            <td>Hourly Salary</td>
            <td>$${hourlySalary.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Daily Salary</td>
            <td>$${dailySalary.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Weekly Salary</td>
            <td>$${weeklySalary.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Monthly Salary</td>
            <td>$${monthlySalary.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Annual Salary (before vacation deduction)</td>
            <td>$${yearlySalary.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Vacation Salary Deducted</td>
            <td>-$${vacationSalaryDeducted.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Adjusted Annual Salary (after vacation deduction)</td>
            <td>$${adjustedYearlySalary.toFixed(2)}</td>
        </tr>
    `;

  // Show the result
  document.getElementById("result").classList.remove("hidden");
});
