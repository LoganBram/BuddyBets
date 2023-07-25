var request = require("request");
// Get the current date

const next7days = async () => {
  const currentDate = new Date();

  // Function to format a date as "yyyy-mm-dd"
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Calculate the next 7 days
  const next7Days = [];
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date();
    nextDate.setDate(currentDate.getDate() + i + 1);
    next7Days.push(formatDate(nextDate));
  }

  console.log("Current Date:", formatDate(currentDate));
  console.log("Next 7 Days:", next7Days);
  return next7Days;
};

next7days();

module.exports = {
  next7days,
};
