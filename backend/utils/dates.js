/* file to get the dates for the next 7 days, which will then be used to get all games for the next 7 days in datafetch*/

// Get the current date

const next7days = async () => {
  const currentDateUTC = new Date();

  // Function to format a date as "yyyy-mm-dd"
  function formatDateUTC(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Calculate the next 7 days in UTC
  const next7DaysUTC = [];
  for (let i = 0; i < 7; i++) {
    const nextDateUTC = new Date(currentDateUTC);
    nextDateUTC.setUTCDate(currentDateUTC.getUTCDate() + i);
    next7DaysUTC.push(formatDateUTC(nextDateUTC));
  }

  console.log("Current Date (UTC):", formatDateUTC(currentDateUTC));
  console.log("Next 7 Days (UTC):", next7DaysUTC);
  return next7DaysUTC;
};

//gets todays date BASED ON UTC because the API updates based on UTC
const getTodayDate = () => {
  // Get the current date in UTC
  var todayUTC = new Date();

  // Format the date in yyyy-mm-dd form
  var yyyy = todayUTC.getUTCFullYear();
  var mm = String(todayUTC.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  var dd = String(todayUTC.getUTCDate()).padStart(2, "0");

  // Concatenate the parts to form the final date string
  var todayDateUTC = yyyy + "-" + mm + "-" + dd;

  return todayDateUTC;
};

const getFutureDate = (days) => {
  // Get the current date in UTC
  var todayUTC = new Date();

  // Calculate the future date by adding the specified number of days
  var futureDateUTC = new Date(todayUTC.getTime() + days * 24 * 60 * 60 * 1000);

  // Format the future date in yyyy-mm-dd form
  var yyyy = futureDateUTC.getUTCFullYear();
  var mm = String(futureDateUTC.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  var dd = String(futureDateUTC.getUTCDate()).padStart(2, "0");

  // Concatenate the parts to form the final date string
  var futureDateFormatted = yyyy + "-" + mm + "-" + dd;

  return futureDateFormatted;
};

module.exports = {
  next7days,
  getTodayDate,
  getFutureDate,
};
