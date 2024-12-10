// Constants for table names
const SHEETS = {
  CALENDAR: 'Anbau-Kalender',
  CROPS: 'Satze',
  HARVEST: 'Erntemengen'
};

// Cache keys
const CACHE_KEYS = {
  CALENDAR: 'calendarData',
  HARVEST: 'harvestData',
  DASHBOARD: 'dashboardStats'
};

// Cache duration in seconds
const CACHE_DURATION = 300; // 5 minutes

// Returns the active spreadsheet tab with caching
function getActiveSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

// Cache helper functions
function getCache() {
  return CacheService.getScriptCache();
}

function getCacheData(key) {
  const cache = getCache();
  const data = cache.get(key);
  return data ? JSON.parse(data) : null;
}

function setCacheData(key, data) {
  const cache = getCache();
  cache.put(key, JSON.stringify(data), CACHE_DURATION);
}

// Get harvest data with caching
function getHarvestDataMap() {
  const cachedData = getCacheData(CACHE_KEYS.HARVEST);
  if (cachedData) return cachedData;

  const harvestSheet = getActiveSpreadsheet().getSheetByName(SHEETS.HARVEST);
  const data = harvestSheet.getDataRange().getValues();
  
  const harvestMap = data.slice(1).reduce((map, row) => {
    const key = `${row[0]}_${row[1]}`; // kultur_sorte as key
    map[key] = (map[key] || 0) + (parseFloat(row[8]) || 0);
    return map;
  }, {});

  setCacheData(CACHE_KEYS.HARVEST, harvestMap);
  return harvestMap;
}

// Get the total harvest quantity for a specific culture
function getHarvestedAmount(kulturName, sorte) {
  try {
    const harvestMap = getHarvestDataMap();
    return harvestMap[`${kulturName}_${sorte}`] || 0;
  } catch (error) {
    Logger.log('Fehler beim Abrufen der Erntemenge: ' + error);
    return 0;
  }
}

// Update getCalendarData to include years
function getCalendarData() {
    try {
        const sheet = getActiveSpreadsheet().getSheetByName(SHEETS.CALENDAR);
        
        if (!sheet) {
            Logger.log('Sheet not found: ' + SHEETS.CALENDAR);
            return [];
        }

        const lastRow = sheet.getLastRow();
        Logger.log('Last row: ' + lastRow);
        
        if (lastRow <= 1) {
            return [];
        }

        // Update range to include new columns
        const data = sheet.getRange(2, 1, lastRow - 1, 12).getValues();
        Logger.log('Raw data: ' + JSON.stringify(data));
        
        const formattedData = data
            .filter(row => row[0])
            .map(row => ({
                id: row[0],
                name: row[1],
                sorte: row[2],
                pflanzWoche: typeof row[3] === 'object' ? row[3].getWeek() : row[3],
                ernteWoche: row[4],
                status: row[5] || 'Aktiv',
                standort: row[6],
                anbauTyp: row[7],
                erwarteteErnte: row[8],
                einheit: row[9],
                pflanzJahr: row[10] || getCurrentYear(),    // Default to current year if not set
                ernteJahr: row[11] || getCurrentYear(),     // Default to current year if not set
                geernteteErnte: getHarvestedAmount(row[1], row[2])
            }));

        Logger.log('Formatted data: ' + JSON.stringify(formattedData));
        return formattedData;
        
    } catch (error) {
        Logger.log('Error loading data: ' + error.toString());
        throw error;
    }
}

// Save new culture with year handling
function saveCrop(data) {
    try {
        const sheet = getActiveSpreadsheet().getSheetByName(SHEETS.CALENDAR);
        const lastRow = sheet.getLastRow();
        const newId = lastRow === 1 ? 1 : parseInt(sheet.getRange(lastRow, 1).getValue()) + 1;
        
        // Get current year for planting
        const plantingYear = getCurrentYear();
        // Calculate harvest year based on weeks
        const harvestYear = calculateHarvestYear(
            parseInt(data.pflanzWoche), 
            parseInt(data.ernteWoche), 
            plantingYear
        );
        
        const rowData = [
            newId,
            data.name,
            data.sorte,
            parseInt(data.pflanzWoche),
            parseInt(data.ernteWoche),
            data.status,
            data.standort,
            data.anbauTyp,
            data.erwarteteErnte,
            data.einheit,
            plantingYear,        // New field: planting year
            harvestYear         // New field: harvest year
        ];
        
        sheet.appendRow(rowData);
        invalidateCache();
        
        // Return complete data for UI update
        return {
            id: newId,
            name: data.name,
            sorte: data.sorte,
            pflanzWoche: parseInt(data.pflanzWoche),
            ernteWoche: parseInt(data.ernteWoche),
            status: data.status,
            standort: data.standort,
            anbauTyp: data.anbauTyp,
            erwarteteErnte: data.erwarteteErnte,
            einheit: data.einheit,
            pflanzJahr: plantingYear,    // Include in return data
            ernteJahr: harvestYear,      // Include in return data
            geernteteErnte: 0
        };
    } catch (error) {
        Logger.log('Error saving crop: ' + error.toString());
        throw error;
    }
}

// Make sure cache invalidation is working
function invalidateCache() {
    const cache = CacheService.getScriptCache();
    cache.removeAll([CACHE_KEYS.CALENDAR, CACHE_KEYS.HARVEST, CACHE_KEYS.DASHBOARD]);
}

// Update getDashboardStats to consider years in calculations
function getDashboardStats() {
    try {
        const sheet = getActiveSpreadsheet().getSheetByName(SHEETS.CALENDAR);
        if (!sheet) {
            Logger.log('Sheet not found');
            return { aktivePflanzen: 0, geplantErnten: 0, inBearbeitung: 0 };
        }

        const lastRow = sheet.getLastRow();
        if (lastRow <= 1) {
            Logger.log('No data in sheet');
            return { aktivePflanzen: 0, geplantErnten: 0, inBearbeitung: 0 };
        }

        // Update range to include new columns
        const data = sheet.getRange(2, 1, lastRow - 1, 12).getValues();
        const aktuelleWoche = getCurrentWeek();
        const aktuellesJahr = getCurrentYear();
        
        const validRows = data.filter(row => row[0]);
        
        Logger.log('Processing ' + validRows.length + ' rows');

        const stats = {
            aktivePflanzen: validRows.filter(row => row[5] !== 'Abgeschlossen').length,
            
            // Update planned harvests logic to consider year
            geplantErnten: validRows.filter(row => 
                row[4] === aktuelleWoche && 
                row[11] === aktuellesJahr && // Check harvest year
                row[5] !== 'Abgeschlossen'
            ).length,
            
            inBearbeitung: validRows.filter(row => row[5] === 'In Bearbeitung').length
        };

        Logger.log('Calculated stats: ' + JSON.stringify(stats));
        return stats;

    } catch (error) {
        Logger.log('Error in getDashboardStats: ' + error.toString());
        return { aktivePflanzen: 0, geplantErnten: 0, inBearbeitung: 0 };
    }
}

// Fetch active cultures for harvest dropdown with caching
function getActiveCrops() {
  const data = getCalendarData();
  return data
    .filter(row => row.status === 'Aktiv' || row.status === 'In Bearbeitung')
    .map(row => ({
      id: row.id,
      name: row.name,
      sorte: row.sorte,
      standort: row.standort,
      einheit: row.einheit
    }));
}

// Save harvest with batch updates
function saveHarvest(data) {
    try {
        const harvestSheet = getActiveSpreadsheet().getSheetByName(SHEETS.HARVEST);
        const calendarSheet = getActiveSpreadsheet().getSheetByName(SHEETS.CALENDAR);
        
        const harvestDate = new Date(data.harvestDate);
        const kw = Utilities.formatDate(harvestDate, Session.getScriptTimeZone(), 'w');
        
        const calendarData = calendarSheet.getDataRange().getValues();
        const cropData = calendarData.find(row => row[0].toString() === data.cropId.toString());
        
        if (!cropData) {
            throw new Error('Kultur nicht gefunden');
        }
        
        const harvestMap = getHarvestDataMap();
        const previousHarvests = harvestMap[`${cropData[1]}_${cropData[2]}`] || 0;
        const totalHarvested = previousHarvests + parseFloat(data.amount);
        
        const rowData = [
            cropData[1],
            cropData[2],
            kw,
            '',
            data.unit,
            '',
            '',
            '',
            data.amount,
            cropData[6],
            'Ja',
            data.unit
        ];
        
        harvestSheet.appendRow(rowData);
        
        const rowIndex = calendarData.findIndex(row => row[0].toString() === data.cropId.toString()) + 1;
        const newStatus = totalHarvested >= cropData[8] ? 'Abgeschlossen' : 
                         totalHarvested > 0 ? 'In Bearbeitung' : 'Aktiv';
        
        calendarSheet.getRange(rowIndex, 6).setValue(newStatus);
        
        // Clear cache to ensure fresh data
        invalidateCache();
        
        // Return all necessary information
        return {
            cropId: data.cropId,
            newStatus: newStatus,
            harvestedAmount: totalHarvested,
            totalAmount: cropData[8],
            unit: data.unit
        };
    } catch (error) {
        Logger.log('Error saving harvest: ' + error.toString());
        throw error;
    }
}

// Get current calendar week
function getCurrentWeek() {
  return parseInt(Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'w'));
}

// Update crop status with cache invalidation
function updateCropStatus(cropId, harvestedAmount, expectedAmount) {
  const sheet = getActiveSpreadsheet().getSheetByName(SHEETS.CALENDAR);
  const data = sheet.getDataRange().getValues();
  
  const rowIndex = data.findIndex(row => row[0].toString() === cropId.toString());
  if (rowIndex === -1) return;
  
  const newStatus = harvestedAmount >= expectedAmount ? 'Abgeschlossen' :
                   harvestedAmount > 0 ? 'In Bearbeitung' : 'Aktiv';
  
  sheet.getRange(rowIndex + 1, 6).setValue(newStatus);
  invalidateCache();
}

// Delete crop with batch operations
function deleteCrop(id) {
    try {
        const calendarSheet = getActiveSpreadsheet().getSheetByName(SHEETS.CALENDAR);
        const data = calendarSheet.getDataRange().getValues();
        
        // Find row with ID
        const rowIndex = data.findIndex(row => row[0].toString() === id.toString());
        if (rowIndex === -1) throw new Error('Kultur nicht gefunden');
        
        // Get crop data before deletion
        const kulturName = data[rowIndex][1];
        const kulturSorte = data[rowIndex][2];
        
        // Batch delete - collect all rows to delete at once
        const harvestSheet = getActiveSpreadsheet().getSheetByName(SHEETS.HARVEST);
        const harvestData = harvestSheet.getDataRange().getValues();
        const rowsToDelete = [];
        
        // Collect indices in descending order
        for (let i = harvestData.length - 1; i > 0; i--) {
            if (harvestData[i][0] === kulturName && harvestData[i][1] === kulturSorte) {
                rowsToDelete.push(i + 1);
            }
        }
        
        // Batch delete operations
        calendarSheet.deleteRow(rowIndex + 1);
        if (rowsToDelete.length > 0) {
            // Delete in chunks of 10 to avoid overload
            const chunks = chunkArray(rowsToDelete, 10);
            chunks.forEach(chunk => {
                harvestSheet.deleteRows(chunk[0], chunk.length);
            });
        }

        // Invalidate cache if using
        invalidateCache();
        return { success: true, deletedId: id };
    } catch (error) {
        Logger.log('Delete error: ' + error.toString());
        throw error;
    }
}

// Helper function to split array into chunks
function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

// Function to calculate harvest year based on planting week and harvest week
function calculateHarvestYear(plantingWeek, harvestWeek, plantingYear) {
    return harvestWeek >= plantingWeek ? plantingYear : plantingYear + 1;
}

// Get current year
function getCurrentYear() {
    return new Date().getFullYear();
}
