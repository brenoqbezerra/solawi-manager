// Main entry point for the web app
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Solawi Manager')
    .setFaviconUrl('https://www.gstatic.com/script/apps_script.png')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Include HTML files
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Creates a custom menu in the table
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('🌱 Solawi Manager')
    .addItem('System öffnen', 'openWebApp')
    .addSeparator()
    .addItem('Einstellungen', 'openSettings')
    .addItem('Über', 'openAbout')
    .addToUi();
}

// Opens the web app in a new tab
function openWebApp() {
  var url = ScriptApp.getService().getUrl();
  var html = '<script>window.open("' + url + '", "_blank");</script>';
  SpreadsheetApp.getUi()
    .showModalDialog(HtmlService.createHtmlOutput(html), 'Öffne Solawi Manager...');
}

// Opens the settings
function openSettings() {
  SpreadsheetApp.getUi().alert('Einstellungen in Entwicklung...');
}

// Opens the info page
function openAbout() {
  var message = 'Solawi Manager v1.0\n' +
                'Entwickelt für WirGarten\n\n' +
                'Open-Source-System für die Verwaltung landwirtschaftlicher Genossenschaften.\n\n' +
                'Entwickelt von Breno Queiroz\n' +
                'E-Mail: bqbreno@gmail.com\n' +
                'GitHub: https://github.com/queirozbreno';
  SpreadsheetApp.getUi().alert(message);
}
