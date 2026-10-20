// utils/countryToCurrency.ts

type Country = {
  name: string;
  code: string; // ISO Alpha-3 code
  currency: string;
};

const countries: Country[] = [
  { name: "Afghanistan", code: "AFG", currency: "usd" },
  { name: "Albania", code: "ALB", currency: "usd" },
  { name: "Algeria", code: "DZA", currency: "usd" },
  { name: "Andorra", code: "AND", currency: "gbp" },
  { name: "Angola", code: "AGO", currency: "usd" },
  { name: "Argentina", code: "ARG", currency: "usd" },
  { name: "Armenia", code: "ARM", currency: "usd" },
  { name: "Australia", code: "AUS", currency: "usd" },
  { name: "Austria", code: "AUT", currency: "eur" },
  { name: "Azerbaijan", code: "AZE", currency: "usd" },
  { name: "Bahamas", code: "BHS", currency: "usd" },
  { name: "Bahrain", code: "BHR", currency: "usd" },
  { name: "Bangladesh", code: "BGD", currency: "usd" },
  { name: "Belgium", code: "BEL", currency: "eur" },
  { name: "Brazil", code: "BRA", currency: "usd" },
  { name: "Bulgaria", code: "BGR", currency: "usd" },
  { name: "Canada", code: "CAN", currency: "usd" },
  { name: "China", code: "CHN", currency: "usd" },
  { name: "Colombia", code: "COL", currency: "usd" },
  { name: "Croatia", code: "HRV", currency: "usd" },
  { name: "Cyprus", code: "CYP", currency: "eur" },
  { name: "Czech Republic", code: "CZE", currency: "usd" },
  { name: "Denmark", code: "DNK", currency: "eur" },
  { name: "Egypt", code: "EGY", currency: "usd" },
  { name: "Estonia", code: "EST", currency: "eur" },
  { name: "Finland", code: "FIN", currency: "eur" },
  { name: "France", code: "FRA", currency: "eur" },
  { name: "Germany", code: "DEU", currency: "eur" },
  { name: "Greece", code: "GRC", currency: "usd" },
  { name: "Hong Kong", code: "HKG", currency: "usd" },
  { name: "Hungary", code: "HUN", currency: "usd" },
  { name: "Iceland", code: "ISL", currency: "usd" },
  { name: "India", code: "IND", currency: "usd" },
  { name: "Indonesia", code: "IDN", currency: "usd" },
  { name: "Ireland", code: "IRL", currency: "usd" },
  { name: "Israel", code: "ISR", currency: "usd" },
  { name: "Italy", code: "ITA", currency: "eur" },
  { name: "Japan", code: "JPN", currency: "usd" },
  { name: "Kazakhstan", code: "KAZ", currency: "usd" },
  { name: "Kenya", code: "KEN", currency: "usd" },
  { name: "Kuwait", code: "KWT", currency: "usd" },
  { name: "Latvia", code: "LVA", currency: "eur" },
  { name: "Lithuania", code: "LTU", currency: "eur" },
  { name: "Luxembourg", code: "LUX", currency: "eur" },
  { name: "Malaysia", code: "MYS", currency: "usd" },
  { name: "Malta", code: "MLT", currency: "eur" },
  { name: "Mexico", code: "MEX", currency: "usd" },
  { name: "Monaco", code: "MCO", currency: "eur" },
  { name: "Netherlands", code: "NLD", currency: "eur" },
  { name: "New Zealand", code: "NZL", currency: "usd" },
  { name: "Nigeria", code: "NGA", currency: "usd" },
  { name: "Norway", code: "NOR", currency: "usd" },
  { name: "Pakistan", code: "PAK", currency: "usd" },
  { name: "Philippines", code: "PHL", currency: "usd" },
  { name: "Poland", code: "POL", currency: "usd" },
  { name: "Portugal", code: "PRT", currency: "eur" },
  { name: "Qatar", code: "QAT", currency: "usd" },
  { name: "Romania", code: "ROU", currency: "usd" },
  { name: "Russia", code: "RUS", currency: "usd" },
  { name: "Saudi Arabia", code: "SAU", currency: "usd" },
  { name: "Singapore", code: "SGP", currency: "usd" },
  { name: "Slovakia", code: "SVK", currency: "eur" },
  { name: "Slovenia", code: "SVN", currency: "eur" },
  { name: "South Africa", code: "ZAF", currency: "usd" },
  { name: "South Korea", code: "KOR", currency: "usd" },
  { name: "Spain", code: "ESP", currency: "eur" },
  { name: "Sri Lanka", code: "LKA", currency: "usd" },
  { name: "Sweden", code: "SWE", currency: "eur" },
  { name: "Switzerland", code: "CHE", currency: "usd" },
  { name: "Thailand", code: "THA", currency: "usd" },
  { name: "Turkey", code: "TUR", currency: "usd" },
  { name: "Ukraine", code: "UKR", currency: "usd" },
  { name: "United Arab Emirates", code: "ARE", currency: "usd" },
  { name: "United Kingdom", code: "GBR", currency: "gbp" },
  { name: "United States of America", code: "USA", currency: "usd" },
  { name: "Vietnam", code: "VNM", currency: "usd" },
  { name: "Zimbabwe", code: "ZWE", currency: "usd" },
];

const countryToCurrency = (countryOrCode: string) => {
  const country = countries.find(
    (c) =>
      c.name.toLowerCase() === countryOrCode.toLowerCase() ||
      c.code.toLowerCase() === countryOrCode.toLowerCase()
  );
  return country?.currency;
};

const countryToCode = (country: string): string | null => {
  const found = countries.find((c) => c.name?.toLowerCase() === country?.toLowerCase());
  return found ? found.code : null;
};

export { countries, countryToCurrency, countryToCode };
