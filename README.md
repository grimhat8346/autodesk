# Autodesk SDET Home task

# Google Calculator Test Suite

## Overview

This test suite provides end-to-end testing for Google's calculator functionality that appears when searching for "calculator" on Google. The suite is built using Cypress and TypeScript, focusing on comprehensive testing of basic operations and edge cases.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Cypress
- TypeScript

## Installation

1. Clone the repository:

```bash
git clone https://github.com/grimhat8346/autodesk
cd autodesk
```

2. Install dependencies:

```bash
npm install
```

## Project Structure

```
├── cypress/
│   ├── e2e/
│   │   ├── calculator_base_cases.cy.ts # Basic operations tests
│   │   └── calculator_edge_cases.cy.ts # Edge cases tests
│   ├── support/
│   │   ├── commands.ts                 # Custom Cypress commands
│   │   ├── constants.ts                # Selector constants
│   │   └── e2e.ts                      # Support file configuration
│   └── tsconfig.json                   # TypeScript configuration
├── package.json
└── README.md
```

## Features Tested

### Basic Operations

- Addition
- Subtraction
- Multiplication
- Division
- Clear (AC)
- Clear Entry (CE)

### Edge Cases

- Multiple operations in sequence
- Decimal number operations
- Negative number handling
- Division by zero
- Error states and recovery

## Running Tests

### Run all tests

```bash
npm run cy:run
```

### Open Cypress Test Runner

```bash
npm run cy:open
```

### Run specific test file

```bash
npm run cy:run --spec "cypress/e2e/calculator.spec.ts"
```

## Test Commands

The test suite includes several custom commands for interacting with the calculator:

```typescript
cy.clickCalcNumber('5') // Click number button
cy.clickCalcOperator('ADD') // Click operator button (+, -, ×, ÷)
cy.clickCalcAction('EQUALS') // Click action button (=, AC, CE)
cy.verifyCalcResult('5') // Verify calculator display
```

## Available Selectors

All selectors are maintained in `constants.ts`:

```typescript
CALCULATOR_SELECTORS = {
	OPERATORS: {
		ADD: '[jsname="XSr6wc"]',
		SUBTRACT: '[jsname="pPHzQc"]',
		MULTIPLY: '[jsname="YovRWb"]',
		DIVIDE: '[jsname="WxTTNd"]',
	},
	NUMBERS: {
		'0': '[jsname="bkEvMb"]',
		// ... other numbers
	},
	ACTIONS: {
		EQUALS: '[jsname="Pt8tGc"]',
		CLEAR: '[jsname="SLn8gc"]',
		CLEAR_ENTRY: '[jsname="H7sWPd"]',
		DECIMAL: '[jsname="YrdHyf"]',
	},
	DISPLAY: '[jsname="VssY5c"]',
}
```

## Best Practices Used

1. **Type Safety**

   - Full TypeScript implementation
   - Type-safe selectors and commands

2. **Maintainability**

   - Centralized selectors in constants
   - Reusable custom commands
   - Clear test organization

3. **Reliability**

   - Using stable jsname selectors
   - Proper wait and assertion strategies
   - Error state handling

4. **Code Organization**
   - Separate files for different test categories
   - Clear naming conventions
   - Modular command structure

## Authors

- Maksym Neskoromnyi
- <maks.neskoromnyi@gmail.com>
