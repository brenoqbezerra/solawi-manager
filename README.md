# 🌱 Solawi Manager

Management system for German Community Supported Agriculture (Solawi - Solidarische Landwirtschaft)

[English](README.md) | [Deutsch](README_de.md) | [Português](README_pt.md)

## About the Project

Solawi Manager is a web system specifically developed to assist German community supported agriculture (Solawi) in managing their crops and harvests. Built with Google Apps Script and Google Sheets, it offers a simple and effective solution for:

- Planning and monitoring crops
- Harvest management
- Current and planned crops visualization
- Cultivation area management
- Weekly production monitoring

This is an MVP (Minimum Viable Product) version that implements essential basic functionalities, with potential for expansion based on user feedback and specific cooperative needs.

## Current Features
- 📊 Intuitive dashboard with main metrics
- 🌿 Basic crop management (registration, monitoring, deletion)
- 📅 Planning based on German calendar weeks (KW) with:
  - Cross-year planning support
  - Automatic harvest year calculation
  - Intelligent delay detection considering year changes
- 🏡 Cultivation site management
- 📦 Harvest registration and monitoring
- 🌡️ 7-day weather forecast with:
  - Automatic location detection
  - Manual search for German cities
  - Temperature and weather conditions display
  - Responsive weather interface
- 📱 Responsive interface for mobile devices

## Planned Features

- Cooperative member management
- Distribution planning
- Advanced reporting
- Basic financial management

## Requirements

- Google Account
- Access to Google Sheets
- Updated web browser

## Accessing the Template

1. Spreadsheet Template:
   - [Access Solawi Manager Template](https://docs.google.com/spreadsheets/d/1mxsGO1WUXyXKesFQ2Gd9QZulfV-LA1GjYd0tFv0YLXE/edit?gid=980133036#gid=980133036)
   - Make a copy (File > Make a copy)
   - Follow instructions in "Anleitung" tab

⚠️ **IMPORTANT**: The "🌱 Solawi Manager" link in the spreadsheet's top menu will only work after completely setting up Apps Script in your copy. Follow the installation instructions in the "Anleitung" tab carefully.

## Spreadsheet Structure

The system uses a Google Sheets spreadsheet as a database, with the following structure:

### Active Sheets in MVP:

1. **Anbau-Kalender**: 
   - Main crop registry
   - Contains information about crops, planting and harvest dates
   - Do not alter column structure

2. **Erntemengen**: 
   - Harvest registry
   - Control of harvested quantities
   - Do not alter column structure

### Reserved Sheets (not implemented in MVP):

- **Satze**: Reserved for future implementations of technical crop details

⚠️ **IMPORTANT**: 
- Do not modify the column structure in the sheets
- Do not rename or delete existing sheets
- Keep column names unchanged
- Make regular backups of your data

## Installation

After receiving the template spreadsheet:

1. Make a copy of the spreadsheet (File > Make a copy)
2. In your copy:
   - Access Extensions > Apps Script
   - Create the following files in the editor:
     * Main.gs
     * Database.gs
     * Utils.gs
     * Index.html
     * JavaScript.html
     * Stylesheet.html
   - Copy and paste the corresponding code from each repository file
   - Click "Deploy" > "New deployment"
   - Select "Web App"
   - Configure:
     * Description: "Solawi Manager v1"
     * Execute as: "Me"
     * Who has access: "Anyone"
   - Click "Deploy"
   - Authorize the required permissions

3. Configure the trigger:
   - In the Apps Script editor, click the clock icon (Triggers)
   - Click "+ Add Trigger"
   - Configure:
     * Function: onOpen
     * Event: On open
     * Event source: From spreadsheet
   - Save the trigger

## How to Use

1. After installation, open your spreadsheet
2. In the top menu, click "🌱 Solawi Manager"
3. Select "System öffnen"
4. Start registering your crops and recording harvests

For detailed usage instructions, see our [Usage Guide](USAGE.md).

## Code Structure

**Important note**: Although files are organized in folders on GitHub for better visualization, in Google Apps Script all files are created directly in the editor, without folder structure.

```
solawi-manager/
├── src/
│   ├── apps-script/
│   │   ├── Main.gs
│   │   ├── Database.gs
│   │   └── Utils.gs
│   └── html/
│       ├── Index.html
│       ├── JavaScript.html
│       └── Stylesheet.html
```

## Technologies Used

- Frontend:
  - HTML5
  - CSS (Bootstrap 5.3.2)
  - JavaScript
  - Material Icons
  - Google Fonts (Inter)

- Backend:
  - Google Apps Script
  - Google Sheets as database

- External APIs:
  - OpenMeteo API (weather forecast)
  - OpenStreetMap Nominatim (geolocation)

## Contributing

Contributions are welcome! Please read our [Contribution Guide](CONTRIBUTING.md) before submitting changes.

## Support

If you encounter any problems or have suggestions:
- Open an [issue](https://github.com/seu-usuario/solawi-manager/issues)
- Contact: bqbreno@gmail.com

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Authorship

Developed by Breno Queiroz
- Email: bqbreno@gmail.com
- GitHub: [@queirozbreno](https://github.com/queirozbreno)
- LinkedIn: [Breno Queiroz](https://www.linkedin.com/in/brenoqueiroz/)

## Based on

This project was inspired by the agricultural planning methodology of the WirGarten movement, a German initiative that promotes and supports solidarity-based agricultural cooperatives. The system adapts and digitalizes concepts from the "Muster-Anbauplanung für Solawi" spreadsheet to facilitate cooperative management.

## Implementation Notes

- User interface is in German to serve the target audience
- Code comments are in English to facilitate international collaboration
