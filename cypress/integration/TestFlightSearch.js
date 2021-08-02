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
		// cy.visit(Cypress.env('url'))
		// cy.visit('www.amazon.com')
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
		now2.setDate(now2.getDate() + 28);
		var returnDate = now2.toDateString().substring(4,10);
		console.log(departDate+' : '+returnDate);

		// cy.get('#d1-btn').then(($departingDate) => {
		// 	departDate = $departingDate.text();
		// })
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

		//select non-stop flights
		flightResultPage.getNonStopFlights().click()


	})
	it("test", () => {
		// console.log(getDate())
		const homePage = new OrbitzHomePage;
		const flightResultPage = new OrbitzFlightSearchResultPage;
		cy.visit('https://www.orbitz.com/Flights-Search?leg1=from%3ASan%20Francisco%2C%20CA%20%28SFO-San%20Francisco%20Intl.%29%2Cto%3ANew%20York%2C%20NY%20%28JFK-John%20F.%20Kennedy%20Intl.%29%2Cdeparture%3A8%2F15%2F2021TANYT&leg2=from%3ANew%20York%2C%20NY%20%28JFK-John%20F.%20Kennedy%20Intl.%29%2Cto%3ASan%20Francisco%2C%20CA%20%28SFO-San%20Francisco%20Intl.%29%2Cdeparture%3A8%2F29%2F2021TANYT&mode=search&options=carrier%3A%2A%2Ccabinclass%3A%2Cmaxhops%3A1%2Cnopenalty%3AN&passengers=adults%3A1%2Cchildren%3A0%2Cinfantinlap%3AN&sortOrder=INCREASING&sortType=PRICE&trip=roundtrip', {
			headers: {
				'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
			}});
		flightResultPage.getFlyingFrom().then(($ele) => {
			cy.assertValue($ele,"San Francisco, CA (SFO-San Francisco Intl.)")
		})
		flightResultPage.getNonStopFlights().click()
		flightResultPage.getSortByDropdown().select('Price (Highest)')
		flightResultPage.getHighestPricedFlight().click()
		var flightPrice
		flightResultPage.getFlightPrice().then(($ele) => {
			flightPrice = $ele.text()
			cy.log(flightPrice)
			console.log(flightPrice)
		})
		cy.log(flightPrice)
		console.log(flightPrice)
		// flightResultPage.getSelectFlight().click()
	})
})
