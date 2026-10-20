function calculateTotalRate(data: any) {
  let total = 0;
  for (let key in data) {
    total += data[key]?.Rate?.Amount || 0;
  }
  return total?.toFixed(2);
}

function lbAndOunceToOunces(lb: number, oz: number) {
  return lb * 16 + oz;
}

function kgAndGramToGrams(kg: number, g: number) {
  return kg * 1000 + g;
}

function getFirstRate(data: any) {
  const firstKey = Object?.keys(data)[0]; // Get the first key in the object
  return data[firstKey]?.Rate?.CurrencyCode; // Return the amount from the first item
}

function lbAndOzToLbAndOz(lb: number, oz: number) {
  let newLb = lb;
  let newOz = oz;

  if (oz >= 16) {
    newLb = Math?.floor(oz / 16) + lb;
    newOz = oz % 16;
  }

  return { lb: newLb, oz: newOz };
}

function kgAndGmToKgAndGm(kg: number, gm: number) {
  let newKg = kg;
  let newGm = gm;

  if (gm >= 1000) {
    newKg = Math?.floor(gm / 1000) + kg;
    newGm = gm % 1000;
  }

  return { kg: newKg, gm: newGm };
}

function cmToInches(cm: number) {
  return +(cm * 0.393701)?.toFixed(2);
}

function convertGmToKGAndGm(gm: number) {
  return {
    kg: Math.floor(gm / 1000),
    gm: gm % 1000,
  };
}

function convertGmToLbAndOz(gm: number) {
  const oz = gm * 0.035274;
  return {
    lb: Math.floor(oz / 16),
    oz: oz % 16,
  };
}

export {
  calculateTotalRate,
  cmToInches,
  convertGmToKGAndGm,
  convertGmToLbAndOz,
  getFirstRate,
  kgAndGmToKgAndGm,
  kgAndGramToGrams,
  lbAndOunceToOunces,
  lbAndOzToLbAndOz,
};
