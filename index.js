const baseUrl = "https://calendarific.com/api/v2/holidays";
const apiKey = "?api_key=43a75a2919ecc56c4b8bc87a8bff47343d03fe0e";

getHolidays = async () => {
  let holidayDate = document.getElementById("holidayDate").value;
  if (holidayDate.length === 0) {
    alert("Choose a date");
    return;
  }
  let holidayDates = [...holidayDate.matchAll(/(\d\d\d\d)-(\d\d)-(\d\d)/g)];
  let country = document.getElementById("country").value.toUpperCase();
  let url = `${baseUrl}${apiKey}&country=${country}&year=${holidayDates[0][1]}&month=${holidayDates[0][2]}&day=${holidayDates[0][3]}`;
  console.log(url);
  let results = await fetch(url);
  let jsonRes = await results.json();
  if (jsonRes.response.holidays.length === 0) {
    alert("No holidays found!");
    return;
  }
  showHolidays(jsonRes);
};

showHolidays = (results) => {
  console.log(results);
  let holidays = results.response.holidays;
  let country = holidays[0].country.id.toLowerCase();
  let holidayDiv = document.getElementById("holidayDiv");
  let flagDiv = document.getElementById("flagDiv");
  while (flagDiv.firstChild) {
    flagDiv.removeChild(flagDiv.lastChild);
  }
  while (holidayDiv.firstChild) {
    holidayDiv.removeChild(holidayDiv.lastChild);
  }
  flag = document.createElement("img");
  flag.src = `https://flagcdn.com/256x192/${country}.png`;
  flag.className = "mx-auto d-block";
  flagDiv.appendChild(flag);
  holidayDiv.appendChild(flagDiv);
  for (let holiday in holidays) {
    let holidayName = holidays[holiday].name;
    let holidayInfo = holidays[holiday].description;
    let col = document.createElement("div");
    col.className = "col-lg-4 col-md-8 mb-4";
    let card = document.createElement("div");
    card.className = "card h-100";
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    let cardTitle = document.createElement("h4");
    cardTitle.className = "card-title";
    cardTitle.innerText = holidayName;
    cardBody.appendChild(cardTitle);
    let cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.innerText = holidayInfo;
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);
    holidayDiv.appendChild(card);
  }
};

document.getElementById("button").addEventListener("click", getHolidays);
