const today = () => {
  const dateObj = new Date();
  // var set_to =
  //   currDate.getFullYear() +
  //   "-" +
  //   (currDate.getMonth() + 1) +
  //   "-" +
  //   console.log(currDate.toISOString());

  const offsetTime = dateObj.getTimezoneOffset() * 3600;

  // dateObj.setTime(dateObj.getTime() + Math.abs(offsetTime));

  console.log(offsetTime);
  console.log(dateObj);

  return dateObj;
};

const start = (dateObj) => {
  const startDate = new Date(dateObj);

  const offsetTime = dateObj.getTimezoneOffset() * 3600;

  dateObj.setTime(dateObj.getTime() + Math.abs(offsetTime));

  // console.log(offsetTime);

  return dateObj;

  // compare_dates(new Date("11/14/2013 00:00"), new Date("11/14/2013 00:00"));
};
const end = (dateObj) => {
  const endDate = new Date();
  return dateObj;
};

module.exports.today = today;
module.exports.start = start;
module.exports.end = end;
