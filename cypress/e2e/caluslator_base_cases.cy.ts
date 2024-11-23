describe('Google Calculator Tests', () => {
	beforeEach(() => {
		cy.visit('/')
		cy.get('[name="q"]').type('calculator{enter}')
	})

	it('should perform basic addition', () => {
		cy.clickCalcNumber('2')
		cy.clickCalcOperator('ADD')
		cy.clickCalcNumber('3')
		cy.clickCalcAction('EQUALS')
		cy.verifyCalcResult('5')
	})

	it('should perform basic subtraction', () => {
		cy.clickCalcNumber('5')
		cy.clickCalcOperator('SUBTRACT')
		cy.clickCalcNumber('3')
		cy.clickCalcAction('EQUALS')
		cy.verifyCalcResult('2')
	})

	it('should perform basic multiplication', () => {
		cy.clickCalcNumber('4')
		cy.clickCalcOperator('MULTIPLY')
		cy.clickCalcNumber('3')
		cy.clickCalcAction('EQUALS')
		cy.verifyCalcResult('12')
	})

	it('should clear the display', () => {
		cy.clickCalcNumber('1')
		cy.clickCalcNumber('2')
		cy.clickCalcNumber('3')
		cy.clickCalcAction('CLEAR')
		cy.verifyCalcResult('0')
	})

	it('should clear last entry', () => {
		cy.clickCalcNumber('1')
		cy.clickCalcNumber('2')
		cy.clickCalcAction('CLEAR_ENTRY')
		cy.verifyCalcResult('1')
	})

	it('should handle decimal numbers', () => {
		cy.clickCalcNumber('1')
		cy.clickCalcAction('DECIMAL')
		cy.clickCalcNumber('5')
		cy.clickCalcOperator('ADD')
		cy.clickCalcNumber('2')
		cy.clickCalcAction('DECIMAL')
		cy.clickCalcNumber('5')
		cy.clickCalcAction('EQUALS')
		cy.verifyCalcResult('4')
	})
})
