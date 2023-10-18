const {
  getFutureDate,
} = require("D:/DesktopGIT/friendlybetting/backend/utils/dates.js");

test = async () => {
  const date = await getFutureDate(7);
  console.log(date);
};

test();
