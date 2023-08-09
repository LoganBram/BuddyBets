/* file to get the dates for the next 7 days, which will then be used to get all games for the next 7 days in datafetch*/

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

const getYesterdayDate = async () => {
  // Get the current date
  var today = new Date();

  // Subtract one day (24 hours) from the current date
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Format the date in yyyy-mm-dd form
  var yyyy = yesterday.getFullYear();
  var mm = String(yesterday.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  var dd = String(yesterday.getDate()).padStart(2, "0");

  // Concatenate the parts to form the final date string
  var yesterdayDate = yyyy + "-" + mm + "-" + dd;
  return yesterdayDate;
};

module.exports = {
  next7days,
  getYesterdayDate,
};