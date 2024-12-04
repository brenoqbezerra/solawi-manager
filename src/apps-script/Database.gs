// Constants for table names
const SHEETS = {
  CALENDAR: 'Anbau-Kalender',
  CROPS: 'Satze',
  HARVEST: 'Erntemengen'
};

// Returns the active spreadsheet tab
function getActiveSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

// Get the total harvest quantity for a specific culture
function getHarvestedAmount(kulturName, sorte) {
    try {
        const harvestSheet = getActiveSpreadsheet().getSheetByName(SHEETS.HARVEST);
        const data = harvestSheet.getDataRange().getValues();
        
        // Filtere und summiere die Erntemengen
        const totalHarvested = data.slice(1)
            .filter(row => row[0] === kulturName && row[1] === sorte)
            .reduce((sum, row) => sum + (parseFloat(row[8]) || 0), 0);
            
        return totalHarvested;
    } catch (error) {
        Logger.log('Fehler beim Abrufen der Erntemenge: ' + error);
        return 0;
    }
}

// Fetches data from the cultivation calendar
function getCalendarData() {
  try {
    const sheet = getActiveSpreadsheet().getSheetByName(SHEETS.CALENDAR);
    
    if (!sheet) {
      Logger.log('Sheet nicht gefunden: ' + SHEETS.CALENDAR);
      return [];
    }

    const lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      return [];
    }

    const data = sheet.getRange(2, 1, lastRow - 1, 10).getValues();
    
    const formattedData = data
      .filter(row => row[1]) // Filtert Zeilen ohne Bezeichnung
      .map(row => ({
        id: row[0],                    // Kultur_ID
        name: row[1],                  // Bezeichnung
        sorte: row[2],                 // Sorte
        pflanzWoche: typeof row[3] === 'object' ? row[3].getWeek() : row[3], // Pflanz_KW
        ernteWoche: row[4],            // Ernte_KW
        status: row[5] || 'Aktiv',     // Status
        standort: row[6],              // Standort
        anbauTyp: row[7],              // Anbautyp
        erwarteteErnte: row[8],        // Erwartete_Erntemenge
        einheit: row[9],                // Einheit
        geernteteErnte: getHarvestedAmount(row[1], row[2])
      }));

    Logger.log('Formatierte Daten: ' + JSON.stringify(formattedData));
    return formattedData;
    
  } catch (error) {
    Logger.log('Fehler beim Laden der Daten: ' + error.toString());
    throw error;
  }
}

// Save new culture
function saveCrop(data) {
  try {
    const sheet = getActiveSpreadsheet().getSheetByName(SHEETS.CALENDAR);
    
    // Generate new ID
    const lastRow = sheet.getLastRow();
    const newId = lastRow === 1 ? 1 : parseInt(sheet.getRange(lastRow, 1).getValue()) + 1;
    
    // Planting week as a number
    const pflanzWoche = parseInt(data.pflanzWoche);
    
    // Prepare data for the row
    const rowData = [
      newId,                    // Kultur_ID
      data.name,                // Bezeichnung
      data.sorte,               // Sorte
      pflanzWoche,              // Pflanz_KW
      parseInt(data.ernteWoche),// Ernte_KW
      data.status,              // Status
      data.standort,            // Standort
      data.anbauTyp,            // Anbautyp
      data.erwarteteErnte,      // Erwartete_Erntemenge
      data.einheit              // Einheit
    ];
    
    sheet.appendRow(rowData);
    return true;
  } catch (error) {
    Logger.log('Fehler beim Speichern: ' + error.toString());
    throw error;
  }
}

// Fetches dashboard statistics
function getDashboardStats() {
  try {
    const sheet = getActiveSpreadsheet().getSheetByName(SHEETS.CALENDAR);
    if (!sheet) return { aktivePflanzen: 0, geplantErnten: 0, inBearbeitung: 0 };

    const data = getCalendarData();
    const aktuelleWoche = getCurrentWeek();
    
    Logger.log('Aktuelle Woche: ' + aktuelleWoche);
    
    const stats = {
      aktivePflanzen: data.filter(row => row.status === 'Aktiv').length,
      geplantErnten: data.filter(row => row.ernteWoche === aktuelleWoche).length,
      inBearbeitung: data.filter(row => row.status === 'In Bearbeitung').length
    };
    
    Logger.log('Stats calculados: ' + JSON.stringify(stats));  // Modificado aqui
    return stats;
    
  } catch (error) {
    Logger.log('Fehler bei Stats: ' + error.toString());
    return { aktivePflanzen: 0, geplantErnten: 0, inBearbeitung: 0 };
  }
}

// Helper function for calendar week
Date.prototype.getWeek = function() {
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
};

// Fetch active cultures for harvest dropdown
function getActiveCrops() {
  const sheet = getActiveSpreadsheet().getSheetByName(SHEETS.CALENDAR);
  const data = sheet.getDataRange().getValues();
  
  return data.slice(1)
    .filter(row => row[5] === 'Aktiv' || row[5] === 'In Bearbeitung') // Aktive und in Bearbeitung
    .map(row => ({
      id: row[0],
      name: row[1],
      sorte: row[2],
      standort: row[6],
      einheit: row[9]
    }));
}

// Save harvest
function saveHarvest(data) {
  try {
    const harvestSheet = getActiveSpreadsheet().getSheetByName(SHEETS.HARVEST);
    const calendarSheet = getActiveSpreadsheet().getSheetByName(SHEETS.CALENDAR);
    
    // Calculate calendar week from date
    const harvestDate = new Date(data.harvestDate);
    const kw = Utilities.formatDate(harvestDate, Session.getScriptTimeZone(), 'w');
    
    // Fetch culture/plant details
    const cropData = calendarSheet.getDataRange().getValues()
      .find(row => row[0].toString() === data.cropId.toString());
    
    if (!cropData) {
      throw new Error('Kultur nicht gefunden');
    }
    
    // Calculate previous harvest quantity
    const previousHarvests = harvestSheet.getDataRange().getValues()
      .filter(row => row[0] === cropData[1] && row[1] === cropData[2])
      .reduce((sum, row) => sum + (row[8] || 0), 0);
    
    // New total harvest quantity
    const totalHarvested = previousHarvests + parseFloat(data.amount);
    
    // New row in harvest quantities
    const rowData = [
      cropData[1],  // Bezeichnung
      cropData[2],  // Sorte
      kw,          // KW
      '',          // abw. Lieferwochen
      data.unit,   // Einheit
      '',          // Anzahl Anteile
      '',          // benötigte Erntemenge je Anteil
      '',          // benötigte Erntemenge gesamt
      data.amount, // Erwartete Erntemenge
      cropData[6], // Schlag (Standort)
      'Ja',        // geerntet
      data.unit    // Einheit
    ];
    
    harvestSheet.appendRow(rowData);
    
    // Update status based on total harvest quantity
    const row = calendarSheet.getDataRange().getValues()
      .findIndex(row => row[0].toString() === data.cropId.toString()) + 1;
      
    let newStatus;
    if (totalHarvested >= cropData[8]) {  // If total harvest quantity >= expected quantity
      newStatus = 'Abgeschlossen';
    } else if (totalHarvested > 0) {      // If partially harvested
      newStatus = 'In Bearbeitung';
    } else {
      newStatus = 'Aktiv';
    }
    
    calendarSheet.getRange(row, 6).setValue(newStatus);
    
    return true;
  } catch (error) {
    Logger.log('Fehler beim Speichern der Ernte: ' + error.toString());
    throw error;
  }
}

// Get current calendar week
function getCurrentWeek() {
    return parseInt(Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'w'));
}

// Update the status of a culture/plant
function updateCropStatus(cropId, harvestedAmount, expectedAmount) {
    const sheet = getActiveSpreadsheet().getSheetByName(SHEETS.CALENDAR);
    const data = sheet.getDataRange().getValues();
    
    const rowIndex = data.findIndex(row => row[0].toString() === cropId.toString());
    if (rowIndex === -1) return;
    
    let newStatus;
    if (harvestedAmount >= expectedAmount) {
        newStatus = 'Abgeschlossen';
    } else if (harvestedAmount > 0) {
        newStatus = 'In Bearbeitung';
    } else {
        newStatus = 'Aktiv';
    }
    
    sheet.getRange(rowIndex + 1, 6).setValue(newStatus);
}

// Delete culture/plant
function deleteCrop(id) {
    try {
        const calendarSheet = getActiveSpreadsheet().getSheetByName(SHEETS.CALENDAR);
        const data = calendarSheet.getDataRange().getValues();
        
        // Find the row with the ID
        const rowIndex = data.findIndex(row => row[0].toString() === id.toString());
        
        if (rowIndex === -1) {
            throw new Error('Kultur nicht gefunden');
        }
        
        // Delete the row
        calendarSheet.deleteRow(rowIndex + 1);
        
        // Optional: Also delete associated harvest entries
        const harvestSheet = getActiveSpreadsheet().getSheetByName(SHEETS.HARVEST);
        const harvestData = harvestSheet.getDataRange().getValues();
        const kulturName = data[rowIndex][1];
        const kulturSorte = data[rowIndex][2];
        
        // Find and delete all associated harvest entries
        for (let i = harvestData.length - 1; i > 0; i--) {
            if (harvestData[i][0] === kulturName && harvestData[i][1] === kulturSorte) {
                harvestSheet.deleteRow(i + 1);
            }
        }
        
        return true;
    } catch (error) {
        Logger.log('Fehler beim Löschen: ' + error.toString());
        throw error;
    }
}
