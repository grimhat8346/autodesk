import { CALCULATOR_SELECTORS } from '../support/constants'

describe('Calculator Edge Cases', () => {
	beforeEach(() => {
		cy.visit('/')
		cy.get(CALCULATOR_SELECTORS.SEARCH_FIELD).type(
			CALCULATOR_SELECTORS.NAME_CALCULATOR
		)
	})

	describe('Multiple Operations', () => {
		it('should handle multiple operations in sequence', () => {
			cy.clickCalcNumber('2')
			cy.clickCalcOperator('ADD')
			cy.clickCalcNumber('3')
			cy.clickCalcOperator('MULTIPLY')
			cy.clickCalcNumber('4')
			cy.clickCalcAction('EQUALS')
			cy.verifyCalcResult('14')
		})

		it('should handle operations with parentheses', () => {
			cy.clickCalcNumber('5')
			cy.clickCalcOperator('ADD')
			cy.clickCalcNumber('3')
			cy.clickCalcOperator('MULTIPLY')
			cy.clickCalcNumber('2')
			cy.clickCalcAction('EQUALS')
			cy.verifyCalcResult('11')
		})

		it('should handle long sequence of operations', () => {
			cy.clickCalcNumber('1')
			cy.clickCalcOperator('ADD')
			cy.clickCalcNumber('2')
			cy.clickCalcOperator('MULTIPLY')
			cy.clickCalcNumber('3')
			cy.clickCalcOperator('SUBTRACT')
			cy.clickCalcNumber('4')
			cy.clickCalcAction('EQUALS')
			cy.verifyCalcResult('3')
		})
	})

	describe('Decimal Numbers', () => {
		it('should handle basic decimal operations', () => {
			cy.clickCalcNumber('1')
			cy.clickCalcAction('DECIMAL')
			cy.clickCalcNumber('5')
			cy.clickCalcOperator('ADD')
			cy.clickCalcNumber('2')
			cy.clickCalcAction('DECIMAL')
			cy.clickCalcNumber('7')
			cy.clickCalcAction('EQUALS')
			cy.verifyCalcResult('4.2') // 1.5 + 2.7 = 4.2
		})

		it('should handle multiple decimal places', () => {
			cy.clickCalcNumber('0')
			cy.clickCalcAction('DECIMAL')
			cy.clickCalcNumber('1')
			cy.clickCalcNumber('2')
			cy.clickCalcNumber('5')
			cy.clickCalcOperator('MULTIPLY')
			cy.clickCalcNumber('1')
			cy.clickCalcNumber('0')
			cy.clickCalcAction('EQUALS')
			cy.verifyCalcResult('1.25') // 0.125 × 10 = 1.25
		})

		it('should prevent multiple decimal points', () => {
			cy.clickCalcNumber('1')
			cy.clickCalcAction('DECIMAL')
			cy.clickCalcNumber('5')
			cy.clickCalcAction('DECIMAL') // Second decimal should be ignored
			cy.clickCalcNumber('5')
			cy.verifyCalcResult('1.55')
		})
	})

	describe('Negative Numbers', () => {
		it('should handle negative number inputs', () => {
			cy.clickCalcOperator('SUBTRACT') // Using subtract as negative sign
			cy.clickCalcNumber('5')
			cy.clickCalcOperator('ADD')
			cy.clickCalcNumber('3')
			cy.clickCalcAction('EQUALS')
			cy.verifyCalcResult('-2') // -5 + 3 = -2
		})

		it('should handle operations resulting in negative numbers', () => {
			cy.clickCalcNumber('5')
			cy.clickCalcOperator('SUBTRACT')
			cy.clickCalcNumber('8')
			cy.clickCalcAction('EQUALS')
			cy.verifyCalcResult('-3') // 5 - 8 = -3
		})

		it('should handle multiplication of negative numbers', () => {
			cy.clickCalcOperator('SUBTRACT')
			cy.clickCalcNumber('2')
			cy.clickCalcOperator('MULTIPLY')
			cy.clickCalcOperator('SUBTRACT')
			cy.clickCalcNumber('3')
			cy.clickCalcAction('EQUALS')
			cy.verifyCalcResult('6') // -2 × -3 = 6
		})
	})

	describe('Division Edge Cases', () => {
		it('should handle division by zero', () => {
			cy.clickCalcNumber('5')
			cy.clickCalcOperator('DIVIDE')
			cy.clickCalcNumber('0')
			cy.clickCalcAction('EQUALS')
			cy.verifyCalcResult('Infinity') // 5 ÷ 0 = Error
		})

		it('should handle zero divided by a number', () => {
			cy.clickCalcNumber('0')
			cy.clickCalcOperator('DIVIDE')
			cy.clickCalcNumber('5')
			cy.clickCalcAction('EQUALS')
			cy.verifyCalcResult('0') // 0 ÷ 5 = 0
		})

		it('should handle division resulting in repeating decimals', () => {
			cy.clickCalcNumber('1')
			cy.clickCalcOperator('DIVIDE')
			cy.clickCalcNumber('3')
			cy.clickCalcAction('EQUALS')
			// Google calculator typically shows limited decimal places
			cy.get(CALCULATOR_SELECTORS.DISPLAY)
				.invoke('text')
				.should('match', /0\.3+/)
		})
	})

	describe('Error Recovery', () => {
		it('should recover from error state', () => {
			// First cause an error
			cy.clickCalcNumber('5')
			cy.clickCalcOperator('DIVIDE')
			cy.clickCalcNumber('0')
			cy.clickCalcAction('EQUALS')
			cy.verifyCalcResult('Infinity')

			// Then recover
			cy.clickCalcAction('CLEAR')
			cy.clickCalcNumber('5')
			cy.clickCalcOperator('ADD')
			cy.clickCalcNumber('3')
			cy.clickCalcAction('EQUALS')
			cy.verifyCalcResult('8')
		})

		it('should handle operations after decimal point errors', () => {
			cy.clickCalcNumber('1')
			cy.clickCalcAction('DECIMAL')
			cy.clickCalcAction('DECIMAL') // Try to add multiple decimal points
			cy.clickCalcNumber('5')
			cy.clickCalcOperator('ADD')
			cy.clickCalcNumber('2')
			cy.clickCalcAction('EQUALS')
			cy.verifyCalcResult('3.5')
		})
	})
})
