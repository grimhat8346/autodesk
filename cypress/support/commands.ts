import '@testing-library/cypress/add-commands'

/// <reference types="cypress" />

import { CALCULATOR_SELECTORS } from './constants'

declare global {
	namespace Cypress {
		interface Chainable {
			clickCalcNumber(
				num: keyof typeof CALCULATOR_SELECTORS.NUMBERS
			): Chainable<Element>
			clickCalcOperator(
				operator: keyof typeof CALCULATOR_SELECTORS.OPERATORS
			): Chainable<Element>
			clickCalcAction(
				action: keyof typeof CALCULATOR_SELECTORS.ACTIONS
			): Chainable<Element>
			clickCalcActionLong(
				action: keyof typeof CALCULATOR_SELECTORS.ACTIONS
			): Chainable<Element>
			verifyCalcResult(expectedResult: string): Chainable<Element>
		}
	}
}

Cypress.Commands.add(
	'clickCalcNumber',
	(num: keyof typeof CALCULATOR_SELECTORS.NUMBERS) => {
		cy.get(CALCULATOR_SELECTORS.NUMBERS[num]).click()
	}
)

Cypress.Commands.add(
	'clickCalcOperator',
	(operator: keyof typeof CALCULATOR_SELECTORS.OPERATORS) => {
		cy.get(CALCULATOR_SELECTORS.OPERATORS[operator]).click()
	}
)

Cypress.Commands.add(
	'clickCalcAction',
	(action: keyof typeof CALCULATOR_SELECTORS.ACTIONS) => {
		cy.get(CALCULATOR_SELECTORS.ACTIONS[action]).click({ force: true })
	}
)

Cypress.Commands.add(
	'clickCalcActionLong',
	(action: keyof typeof CALCULATOR_SELECTORS.ACTIONS) => {
		cy.get(CALCULATOR_SELECTORS.ACTIONS[action])
			.trigger('mousedown')
			.wait(1000)
			.trigger('mouseup')
	}
)

Cypress.Commands.add('verifyCalcResult', (expectedResult: string) => {
	cy.get(CALCULATOR_SELECTORS.DISPLAY).should('have.text', expectedResult)
})

export {}
