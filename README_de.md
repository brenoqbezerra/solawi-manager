# 🌱 Solawi Manager

Verwaltungssystem für Solidarische Landwirtschaft (Solawi)

[English](README.md) | [Deutsch](README_de.md) | [Português](README_pt.md)

## Über das Projekt

Der Solawi Manager ist ein Websystem, das speziell für die Verwaltung von Solidarischer Landwirtschaft entwickelt wurde. Auf Basis von Google Apps Script und Google Sheets bietet es eine einfache und effektive Lösung für:

- Planung und Überwachung von Kulturen
- Ernteverwaltung
- Visualisierung aktueller und geplanter Kulturen
- Verwaltung von Anbauflächen
- Wöchentliche Produktionsüberwachung

Dies ist eine MVP-Version (Minimum Viable Product), die grundlegende Funktionen implementiert und Potenzial für Erweiterungen basierend auf Nutzer-Feedback und spezifischen Bedürfnissen der Solawis bietet.

## Aktuelle Funktionen
- 📊 Intuitives Dashboard mit Hauptmetriken
- 🌿 Grundlegende Kulturverwaltung (Anlegen, Überwachen, Löschen)
- 📅 Planung basierend auf Kalenderwochen (KW) mit:
  - Jahresübergreifende Planungsunterstützung
  - Automatische Berechnung des Erntejahres
  - Intelligente Verzögerungserkennung unter Berücksichtigung des Jahreswechsels
- 🏡 Standortverwaltung
- 📦 Erfassung und Überwachung von Ernten
- 🌡️ 7-Tage-Wettervorhersage mit:
  - Automatische Standorterkennung
  - Manuelle Suche nach deutschen Städten
  - Anzeige von Temperatur und Wetterbedingungen
  - Responsive Wetteranzeige
- 📱 Responsive Oberfläche für mobile Geräte

## Geplante Funktionen

- Mitgliederverwaltung
- Verteilungsplanung
- Erweiterte Berichterstattung
- Grundlegende Finanzverwaltung

## Voraussetzungen

- Google-Konto
- Zugriff auf Google Sheets
- Aktueller Webbrowser

## Zugriff auf die Vorlage

1. Tabellenvorlage:
   - [Solawi Manager Vorlage aufrufen](https://docs.google.com/spreadsheets/d/1mxsGO1WUXyXKesFQ2Gd9QZulfV-LA1GjYd0tFv0YLXE/edit?gid=980133036#gid=980133036)
   - Erstellen Sie eine Kopie (Datei > Kopie erstellen)
   - Folgen Sie den Anweisungen im "Anleitung"-Tab

⚠️ **WICHTIG**: Der Link "🌱 Solawi Manager" im oberen Menü der Tabelle funktioniert erst nach der vollständigen Einrichtung von Apps Script in Ihrer Kopie. Befolgen Sie sorgfältig die Installationsanweisungen im "Anleitung"-Tab.
## Tabellenstruktur

Das System verwendet eine Google Sheets-Tabelle als Datenbank mit folgender Struktur:

### Aktive Tabellenblätter im MVP:

1. **Anbau-Kalender**: 
   - Hauptregister für Kulturen
   - Enthält Informationen zu Kulturen, Pflanz- und Ernteterminen
   - Spaltenstruktur nicht ändern

2. **Erntemengen**: 
   - Ernteerfassung
   - Kontrolle der geernteten Mengen
   - Spaltenstruktur nicht ändern

### Reservierte Tabellenblätter (nicht im MVP implementiert):

- **Satze**: Reserviert für zukünftige Implementierungen technischer Kulturdetails

⚠️ **WICHTIG**: 
- Spaltenstruktur in den Tabellenblättern nicht ändern
- Vorhandene Tabellenblätter nicht umbenennen oder löschen
- Spaltennamen unverändert lassen
- Regelmäßige Datensicherungen durchführen

## Installation

Nach Erhalt der Vorlagentabelle:

1. Erstellen Sie eine Kopie der Tabelle (Datei > Kopie erstellen)
2. In Ihrer Kopie:
   - Öffnen Sie Erweiterungen > Apps Script
   - Erstellen Sie folgende Dateien im Editor:
     * Main.gs
     * Database.gs
     * Utils.gs
     * Index.html
     * JavaScript.html
     * Stylesheet.html
   - Kopieren Sie den entsprechenden Code aus dem Repository
   - Klicken Sie auf "Bereitstellen" > "Neue Bereitstellung"
   - Wählen Sie "Web-App"
   - Konfigurieren Sie:
     * Beschreibung: "Solawi Manager v1"
     * Ausführen als: "Ich"
     * Zugriff: "Jeder"
   - Klicken Sie auf "Bereitstellen"
   - Autorisieren Sie die erforderlichen Berechtigungen

3. Trigger konfigurieren:
   - Im Apps Script Editor auf das Uhr-Symbol klicken (Trigger)
   - "+ Trigger hinzufügen" klicken
   - Konfigurieren:
     * Funktion: onOpen
     * Ereignis: Beim Öffnen
     * Ereignisquelle: Aus Tabelle
   - Trigger speichern

## Verwendung

1. Nach der Installation öffnen Sie Ihre Tabelle
2. Klicken Sie im oberen Menü auf "🌱 Solawi Manager"
3. Wählen Sie "System öffnen"
4. Beginnen Sie mit der Erfassung Ihrer Kulturen und Ernten

Detaillierte Nutzungsanweisungen finden Sie in unserem [Benutzerhandbuch](USAGE.md).

## Code-Struktur

**Wichtiger Hinweis**: Obwohl die Dateien auf GitHub in Ordnern organisiert sind, werden im Google Apps Script alle Dateien direkt im Editor ohne Ordnerstruktur erstellt.

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

## Verwendete Technologien

- Frontend:
  - HTML5
  - CSS (Bootstrap 5.3.2)
  - JavaScript
  - Material Icons
  - Google Fonts (Inter)

- Backend:
  - Google Apps Script
  - Google Sheets als Datenbank

- Externe APIs:
  - OpenMeteo API (Wettervorhersage)
  - OpenStreetMap Nominatim (Geolokalisierung)

## Mitwirken

Beiträge sind willkommen! Bitte lesen Sie unseren [Beitragsleitfaden](CONTRIBUTING.md) vor dem Einreichen von Änderungen.

## Support

Bei Problemen oder Vorschlägen:
- Öffnen Sie ein [Issue](https://github.com/seu-usuario/solawi-manager/issues)
- Kontakt: bqbreno@gmail.com

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe [LICENSE.md](LICENSE.md) für Details.

## Autor

Entwickelt von Breno Queiroz
- E-Mail: bqbreno@gmail.com
- GitHub: [@queirozbreno](https://github.com/queirozbreno)
- LinkedIn: [Breno Queiroz](https://www.linkedin.com/in/brenoqueiroz/)

## Basierend auf

Dieses Projekt wurde durch die landwirtschaftliche Planungsmethodik der WirGarten-Bewegung inspiriert, einer deutschen Initiative, die solidarische Landwirtschaft fördert und unterstützt. Das System adaptiert und digitalisiert Konzepte aus der "Muster-Anbauplanung für Solawi"-Tabelle zur Vereinfachung der Genossenschaftsverwaltung.

## Implementierungshinweise

- Benutzeroberfläche ist auf Deutsch für die Zielgruppe
- Code-Kommentare sind auf Englisch für internationale Zusammenarbeit
