class OrbitzFlightSearchResultPage {

	getFlyingFrom() {
		return cy.get('button[data-stid="typeahead-originInput-0-menu-trigger"]');
	}

	getFlyingTo() {
		return cy.get('button[data-stid="typeahead-destinationInput-0-menu-trigger"]');
	}

	getFlightDepartDate() {
		return cy.get('button[data-stid="open-date-picker"][data-name="startDate"]')
	}

	getFlightReturnDate() {
		return cy.get('button[data-stid="open-date-picker"][data-name="endDate"]')
	}

	getNonStopFlights() {
		return cy.get('[data-test-id="stops-0-label"]')
	}

	getSortByDropdown() {
		return cy.get('[data-test-id="sortDropdown"]')
	}

	getHighestPricedFlight() {
		return cy.get('li:nth-child(1) button')
	}

	getFlightPrice() {
		return cy.get('.uitk-sheet-footer div.uitk-price-lockup span.uitk-lockup-price[aria-hidden="true"]')
	}

	getSelectFlight() {
		return cy.get('[data-test-id="select-button"]')
	}
}

export default OrbitzFlightSearchResultPage;
