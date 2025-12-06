const table = document.querySelector("#table");

const countries = [
  {
    name: "United States",
    mainCity: "Washington, D.C.",
    attractions: ["Statue of Liberty", "Grand Canyon", "Disney World"],
    population: 331002651,
    currency: "United States Dollar (USD)",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png",
  },
  {
    name: "United Kingdom",
    mainCity: "London",
    attractions: ["Big Ben", "Buckingham Palace", "Stonehenge"],
    population: 67886011,
    currency: "British Pound Sterling (GBP)",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1920px-Flag_of_the_United_Kingdom.svg.png",
  },
  {
    name: "France",
    mainCity: "Paris",
    attractions: ["Eiffel Tower", "Louvre Museum", "Versailles Palace"],
    population: 65273511,
    currency: "Euro (EUR)",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1920px-Flag_of_France.svg.png",
  },
  {
    name: "China",
    mainCity: "Beijing",
    attractions: ["Great Wall of China", "Forbidden City", "Terracotta Army"],
    population: 1439323776,
    currency: "Chinese Yuan (CNY)",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1920px-Flag_of_the_People%27s_Republic_of_China.svg.png",
  },
  {
    name: "Australia",
    mainCity: "Canberra",
    attractions: ["Sydney Opera House", "Great Barrier Reef", "Uluru"],
    population: 25499884,
    currency: "Australian Dollar (AUD)",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1920px-Flag_of_Australia_%28converted%29.svg.png",
  },
  {
    name: "Brazil",
    mainCity: "Brasília",
    attractions: ["Christ the Redeemer", "Amazon Rainforest", "Iguaçu Falls"],
    population: 212559417,
    currency: "Brazilian Real (BRL)",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1920px-Flag_of_Brazil.svg.png",
  },
];

countries.map((country) => {
  table.innerHTML += `
    <tr>
        <td>${country.name}</td>
        <td>${country.mainCity}</td>
        <td>${country.population}</td>
        <td>${country.currency}</td>
        <td>
            <img
            src=${country.flag}
            alt="USA Flag"
            width="30"
            />
        </td>
        <td>
            <div>
                ${country.attractions.map((atraction) => {
                  return `<a class="dropdown-item" href="#">${atraction}</a>`;
                })}
            </div>
        </td>
    </tr>
    `;
});
