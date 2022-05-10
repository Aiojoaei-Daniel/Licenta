function GetCurrentDateTime(props) {
  const currentDate = new Date();

  const date =
    currentDate.getFullYear() +
    "/" +
    (currentDate.getMonth() + 1 <= 9 ? 0 : "") +
    (currentDate.getMonth() + 1) +
    "/" +
    (currentDate.getDate() + 1 <= 9 ? 0 : "") +
    currentDate.getDate();

  const time =
    (currentDate.getHours() <= 9 ? 0 : "") +
    currentDate.getHours() +
    ":" +
    (currentDate.getMinutes() <= 9 ? 0 : "") +
    currentDate.getMinutes();

  console.log(
    "ziua si luna",
    currentDate.getDate(),
    currentDate.getMonth() + 1,
    "          ",
    "ora si minutu",
    currentDate.getHours(),
    currentDate.getMinutes()
  );

  return { date, time };
}

export default GetCurrentDateTime;
