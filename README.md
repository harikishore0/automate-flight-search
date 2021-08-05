# automate-flight-search

#### Steps to run the flight search autumation using Cypress

* Make sure Node is installed in the system. To check if node is available in the system type `node --version` in the terminal (Mac)
* Next Step would be to clone the repo. Type the below command in your terminal to do so
	* `git clone git@github.com:harikishoregurram/automate-flight-search.git`
* Now change the directory to automate-flight-search folder that is downloaded in your local
	* `cd automate-flight-search`
* Now install the files in package.json file in your local environment. To do so, run the below command
	* `npm install`
* Once you installed Cypress after running the above command, open the Cypress runner. Run the below Command for that
	* `npx cypress open`
* Now the cypress test runner opens up which has the test named `TestFlightSearch.js`. Click on the test to start the test
* Once you click on the test, the test should trigger the browser of choice and run it on the browser and you can watch the test running. (I ran my test in Chrome Browser FYI)
* Now enjoy the magic of cypress as it clicks through the application performing various tasks
