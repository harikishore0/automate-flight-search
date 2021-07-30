/// <reference types="Cypress" />
import OrbitzHomePage from "../support/pageObjects/OrbitzHomePage";

describe('test the flight search in orbitz.com', function() {

	it('tests the flight search', function() {
		// cy.visit(Cypress.env('url'))
		// cy.visit('www.amazon.com')
		const homePage = new OrbitzHomePage;

		cy.visit('https://www.orbitz.com/', {
			headers: {
				'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
			}});

		homePage.getOrbitzTabAccordians().contains('Flights').click();
		homePage.getOrbitzTabAccordians().contains('Roundtrip').click();
		homePage.getFlightLeavingFromInput().click();
		homePage.getFlightOrigin().type('San Francisco');
		homePage.getFlightOriginResults().each(($el, index, $list) => {
			if($el.text().includes('San Francisco')) {
				homePage.getFlightOriginResultItems().contains('San Francisco').click();
			}
		})

		homePage.getFlightDestinationInput().click();
		homePage.getFlightDestination().type('New York');
		homePage.getFlightDestinationResults().each(($el, index, $list) => {
			if($el.text().includes('New York')) {
				homePage.getFlightDestinationResultItems().contains('New York').click();
			}
		})

		cy.get('#d1-btn').then(($departingDate) => {
			cy.log($departingDate.text());
		})

	})
	xit("test", () => {
		console.log(getDate())
	})
})
