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

  // Calculate salaries based on the payment frequency
  let dailySalary, hourlySalary, weeklySalary, monthlySalary, yearlySalary;

  if (payPeriod === "hour") {
    hourlySalary = salaryAmount;
    dailySalary = hourlySalary * workHoursPerDay;
    weeklySalary = dailySalary * workDaysPerWeek;
    monthlySalary = weeklySalary * 4;
    yearlySalary = monthlySalary * 12;
  } else if (payPeriod === "day") {
    dailySalary = salaryAmount;
    hourlySalary = dailySalary / workHoursPerDay;
    weeklySalary = dailySalary * workDaysPerWeek;
    monthlySalary = weeklySalary * 4;
    yearlySalary = monthlySalary * 12;
  } else if (payPeriod === "week") {
    weeklySalary = salaryAmount;
    dailySalary = weeklySalary / workDaysPerWeek;
    hourlySalary = dailySalary / workHoursPerDay;
    monthlySalary = weeklySalary * 4;
    yearlySalary = monthlySalary * 12;
  } else if (payPeriod === "month") {
    monthlySalary = salaryAmount;
    weeklySalary = monthlySalary / 4;
    dailySalary = weeklySalary / workDaysPerWeek;
    hourlySalary = dailySalary / workHoursPerDay;
    yearlySalary = monthlySalary * 12;
  } else if (payPeriod === "year") {
    yearlySalary = salaryAmount;
    monthlySalary = yearlySalary / 12;
    weeklySalary = monthlySalary / 4;
    dailySalary = weeklySalary / workDaysPerWeek;
    hourlySalary = dailySalary / workHoursPerDay;
  }

  // Calculate vacation deductions
  const vacationSalaryDeducted = vacationDaysPerYear * dailySalary;
  const adjustedYearlySalary = yearlySalary - vacationSalaryDeducted;

  // Update the result table
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
});
