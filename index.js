const baseUrl = "https://calendarific.com/api/v2";
const apiKey = "?api_key=43a75a2919ecc56c4b8bc87a8bff47343d03fe0e";

getHolidays = async () => {
  let holidayDate = document.getElementById("holidayDate").value;
  if (holidayDate.length === 0) {
      alert("Choose a date");
      return;
  }
  let holidayDates = holidayDate.matchAll(/^(\d\d\d\d)-(\d\d)-(\d\d)$/g);
  let country = document.getElementById("country").value.toUpperCase();
  let url = `${baseUrl}${apiKey}&country=${country}&year=${holidayDates[1]}&month=${holidayDates[2]}&day=${holidayDates[3]}`;
  let results = await fetch(url);
  let jsonRes = await results.json();
  showHolidays(jsonRes);
}

showHolidays = (holidays) => {
    console.log(holidays);
}