class OrbitzHomePage {

	getOrbitzTabAccordians() {
		return cy.get('a span.uitk-tab-text');
	}

	getFlightLeavingFromInput() {
		return cy.get('button[data-stid="location-field-leg1-origin-menu-trigger"]');
	}

	getFlightOrigin() {
		return cy.get('input[data-stid="location-field-leg1-origin-menu-input"]');
	}

	getFlightOriginResults() {
		return cy.get('ul[data-stid="location-field-leg1-origin-results"]');
	}

	getFlightOriginResultItems() {
		return cy.get('button[data-stid="location-field-leg1-origin-result-item-button"]');
	}

	getFlightDestinationInput() {
		return cy.get('button[data-stid="location-field-leg1-destination-menu-trigger"]');
	}

	getFlightDestination() {
		return cy.get('#location-field-leg1-destination');
	}



	getFlightDestinationResults() {
		return cy.get('ul[data-stid="location-field-leg1-destination-results"]');
	}

	getFlightDestinationResultItems() {
		return cy.get('button[data-stid="location-field-leg1-destination-result-item-button"]');
	}

}

export default OrbitzHomePage;
