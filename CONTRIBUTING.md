# Contributing to Solawi Manager

Thank you for your interest in contributing to Solawi Manager! This document provides guidelines and information about contributing to this project.

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How to Contribute](#how-to-contribute)
4. [Development Guidelines](#development-guidelines)
5. [Testing](#testing)
6. [Documentation](#documentation)
7. [Language Guidelines](#language-guidelines)

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Welcome newcomers
- Follow project conventions

## Getting Started

1. Fork the repository
2. Create a development environment:
   - Google account
   - Access to Google Apps Script
   - Basic knowledge of JavaScript and Google Sheets

3. Familiarize yourself with:
   - Google Apps Script environment
   - Project structure
   - Existing code base

## How to Contribute

### Reporting Issues
- Use the issue tracker on GitHub
- Provide detailed descriptions
- Include steps to reproduce
- Add screenshots if relevant

### Submitting Changes
1. Create a branch for your changes
2. Make focused, specific changes
3. Follow coding standards
4. Submit a pull request

### Pull Request Process
1. Update documentation
2. Follow commit message guidelines
3. Reference related issues
4. Wait for review and feedback

## Development Guidelines

### Code Style
- Use English for code and comments
- Follow Google Apps Script best practices
- Maintain consistent formatting
- Add meaningful comments

### File Structure
```
src/
├── apps-script/
│   ├── Main.gs
│   ├── Database.gs
│   └── Utils.gs
└── html/
    ├── Index.html
    ├── JavaScript.html
    └── Stylesheet.html
```

### Coding Standards
- Clear variable and function names
- Proper error handling
- Efficient Google Sheets operations
- Responsive UI design
- Handle API rate limits appropriately
- Implement proper data caching
- Follow year calculation conventions
- Use standard date/time handling

### Feature-Specific Standards
#### Weather System
- Use OpenMeteo API for weather data
- Use OpenStreetMap API for location services
- Follow Material Icons standards for weather icons
- Implement 24-hour location caching
- Limit location search to German-speaking regions
- Handle geolocation permissions appropriately

#### Calendar System
- Use KW (Kalenderwoche) format consistently
- Implement year transition logic
- Calculate harvest years automatically
- Handle cross-year planning scenarios

## Testing

### Before Submitting
- Test all features
- Check mobile responsiveness
- Verify spreadsheet operations
- Test error scenarios
- Test weather data updates
- Verify location services
- Test year transition scenarios
- Verify harvest calculations across years

### Test Environment
- Create test spreadsheet
- Use sample data
- Test different user scenarios

## Documentation

### Requirements
- Update README files
- Document new features
- Update usage guide
- Add inline code documentation

### Languages
- Primary: English
- Supporting: German, Portuguese
- Keep all versions synchronized

## Language Guidelines

### Interface Language
- Keep user interface in German
- Follow German agricultural terminology
- Maintain consistent translations

### Code and Comments
- Write code and comments in English
- Use clear, professional language
- Explain complex logic

### Documentation
- Maintain multilingual documentation
- Keep terminology consistent
- Update all language versions

## Review Process

1. Initial review by maintainers
2. Code quality check
3. Documentation review
4. Final approval

## Getting Help

If you need assistance:
- Open an issue
- Contact: bqbreno@gmail.com
- Check existing documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
