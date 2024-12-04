// Converts calendar week to date
function wocheZuDatum(woche, jahr = new Date().getFullYear()) {
  const datum = new Date(jahr, 0, 1 + (woche - 1) * 7);
  return Utilities.formatDate(datum, Session.getScriptTimeZone(), 'dd.MM.yyyy');
}

// Returns the current calendar week
function getAktuelleWoche() {
  return parseInt(Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'w'));
}

// Formats numbers for display
function formatZahl(zahl) {
  return Utilities.formatString('%.2f', zahl);
}

// Validates input data
function validateEingabe(data) {
  if (!data.name || !data.pflanzWoche || !data.ernteWoche) {
    throw new Error('Pflichtfelder nicht ausgefüllt');
  }
  return true;
}
