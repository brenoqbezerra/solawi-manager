# Solawi Manager - Usage Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Managing Crops](#managing-crops)
4. [Recording Harvests](#recording-harvests)
5. [Status System](#status-system)
6. [Week Calendar](#week-calendar)
7. [Tips and Best Practices](#tips-and-best-practices)
8. [Troubleshooting](#troubleshooting)

## Getting Started

### First Access
1. Open your spreadsheet
2. Click on "🌱 Solawi Manager" in the top menu
3. Select "System öffnen"
4. The system will open in a new tab

### Understanding the Dashboard
- Current calendar week display
- Three main metrics:
  - Active Crops (Aktive Kulturen)
  - Planned Harvests (Geplante Ernten)
  - In Progress (In Bearbeitung)

## Managing Crops

### Adding a New Crop
1. Click "Neue Kultur" (New Crop)
2. Fill in required fields:
   - Kultur (Crop): Name of the crop
   - Sorte (Variety): Specific variety
   - Pflanzwoche (Planting Week): Calendar week number
   - Erntewoche (Harvest Week): Calendar week number
   - Standort (Location): Growing location
   - Erwartete Erntemenge (Expected Yield): Amount
   - Einheit (Unit): kg, pieces, bundles

### Optional Fields
- Anbautyp (Cultivation Type):
  - Freiland (Open field)
  - Gewächshaus (Greenhouse)
  - Tunnel (Tunnel)

### Deleting a Crop
- Click the delete icon (trash can) in the crop's row
- Confirm deletion
- Note: This will also delete associated harvest records

## Recording Harvests

### Adding a Harvest Record
1. Click "Ernte erfassen" (Record Harvest)
2. Select the crop from the dropdown
3. Enter:
   - Harvest date
   - Harvested amount
   - Optional notes

### Harvest Status Updates
The system automatically updates crop status based on harvest records:
- No harvest recorded → "Aktiv"
- Partial harvest → "In Bearbeitung"
- Complete harvest → "Abgeschlossen"

## Status System

### Understanding Status Colors
- 🟢 Green: Active crops
- 🟡 Yellow: Crops in progress/partial harvest
- ⚪ Grey: Completed crops

### Alert System
- 🔔 Yellow Bell: Harvest due this week
- 🔴 Red Bell: Harvest overdue

## Week Calendar

### German Calendar Week System (KW)
- System uses German calendar weeks (1-53)
- Current week is displayed at the top
- Planning is based on week numbers

### Important Week Considerations
- Planting week must be before harvest week
- System alerts for current week harvests
- Weekly planning helps organize activities

## Tips and Best Practices

### Data Management
- Make regular backups of your spreadsheet
- Don't modify column structures
- Keep crop names consistent
- Use standardized units

### Efficient Planning
- Plan crops in sequence
- Use location field systematically
- Monitor harvest alerts weekly
- Update harvest records promptly

### Mobile Usage
- System is mobile-friendly
- Simplified interface on small screens
- All functions available on mobile

## Troubleshooting

### Common Issues
1. Menu not appearing
   - Refresh the spreadsheet
   - Check trigger settings

2. Can't save changes
   - Verify internet connection
   - Check Google account permissions

3. Data not updating
   - Refresh the application page
   - Clear browser cache

### Getting Help
- For technical issues: Open an issue on GitHub
- For usage questions: Contact bqbreno@gmail.com
- Check repository documentation
