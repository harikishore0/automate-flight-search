/// <reference types="Cypress" />
import OrbitzHomePage from "../support/pageObjects/OrbitzHomePage";
import OrbitzFlightSearchResultPage from "../support/pageObjects/OrbitzFlightSearchResultPage"

describe('test the flight search in orbitz.com', function() {

	before(function () {
		// runs once before all tests in the block
		cy.fixture('inputs').then(function (data) {
			this.data = data
		})

	})

	it('tests the flight search', function() {
		const homePage = new OrbitzHomePage;
		const flightResultPage = new OrbitzFlightSearchResultPage;

		cy.visit('https://www.orbitz.com/', {
			headers: {
				'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
			}});
		cy.viewport('macbook-15');
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
		homePage.getFlightDestination().type('New York, NY (JFK-John F. Kennedy Intl.)');
		homePage.getFlightDestinationResults().each(($el, index, $list) => {
			if($el.text().includes('New York')) {
				homePage.getFlightDestinationResultItems().contains('New York').click();
			}
		})
		var now = new Date();
		now.setDate(now.getDate() + 14);
		var departDate = now.toDateString().substring(4,10);
		var now2 = new Date();
		now2.setDate(now2.getDate() + 21);
		var returnDate = now2.toDateString().substring(4,10);
		console.log(departDate+' : '+returnDate);

		cy.get('#d1-btn').click();
		cy.get(`.uitk-date-picker-day-number button[aria-label^="${departDate}"]`).click();
		cy.get(`.uitk-date-picker-day-number button[aria-label^="${returnDate}"]`).click();
		cy.get('button[data-stid="apply-date-picker"]').click();
		cy.get('button[data-testid="submit-button"]').click();

		// asserting input search results in flight results page
		flightResultPage.getFlyingFrom().then(($ele) => {
			cy.assertValue($ele,this.data.origin)
		})

		flightResultPage.getFlyingTo().then(($ele)=> {
			cy.assertValue($ele,this.data.destination)
		})

		flightResultPage.getFlightDepartDate().then(($ele) => {
			cy.assertValue($ele,departDate)
		})

		flightResultPage.getFlightReturnDate().then(($ele) => {
			cy.assertValue($ele,returnDate)
		})

		//select non-stop departure flights
		flightResultPage.getNonStopFlights().click()

		//Making Highest Price selection using sortby dropdown for departure flight
		flightResultPage.getSortByDropdown().select('Price (Highest)')

		//selecting the highest priced flight
		flightResultPage.getHighestPricedFlight().click()

		var flightPrice
		flightResultPage.getFlightPrice().then(($ele) => {
			flightPrice = $ele.text()
			cy.log(flightPrice)
		})

		//confirming the departure flight
		flightResultPage.getSelectFlightButton().click()
		flightResultPage.getReturnFlightPageLocator().should('be.visible')

		//select non-stop return flights
		flightResultPage.getNonStopFlights().click()

		//Making Highest Price selection using sortby dropdown for return flights
		flightResultPage.getSortByDropdown().select('Price (Highest)', { force: true })

		//selecting the highest priced flight
		flightResultPage.getHighestPricedFlight().click()

		//confirming the return flight
		flightResultPage.getSelectFlightButton().click()

		var finalPrice
		flightResultPage.getFinalPrice().then(($price) => {
			finalPrice = $price.text()
		})

		//selecting 'No Thanks' in the pop generated after the above selection
		cy.get('a[data-test-id="forcedChoiceNoThanks"]').invoke('removeAttr', 'target').click()

		//asserting flight details in the flight summary page
		cy.get('[data-test-id="flight-review-0"] .uitk-heading-4').then(($ele) => {
			cy.assertValue($ele,"San Francisco to New York")
		})

		cy.get('[data-test-id="flight-review-1"] .uitk-heading-4').then(($ele) => {
			cy.assertValue($ele,this.data.returnFlight)
		})

		cy.get('table[data-test-id="trip-total"] .uitk-text').then(($price) => {
			var confirmationPagePrice = $price.text()
			cy.log(confirmationPagePrice)
			expect(finalPrice).to.equal(confirmationPagePrice)
		})
	})
})
