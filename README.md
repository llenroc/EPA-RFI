# Response to REQUEST FOR INFORMATION (RFI) - EPA Environmental Digital Services (EPA-EDS)
##Solicitation Number: SOL-DC-16-00010

[![Build Status](https://travis-ci.org/AppliedIS/EPA-RFI.svg)](https://travis-ci.org/AppliedIS/EPA-RFI)


1.	Applied Information Sciences (AIS)
2.	GS-35F-0279P
3.	Other than small business    
4.	Jason McNutt
5.	Jason.McNutt@appliedis.com
6.	For this scenario, AIS would propose labor categories similar to what we proposed on GSA’s Agile Delivery Services BPA, which AIS was an awardee:
1.  Product Manager
2.  Scrum Master
3.  Technical Architect
4.  Front-End Developer
5.  Back-End Developer
6.  DevOps Engineer
7.  Visual Designer
8.  User Researcher/Usability Tester

###Product

For the EPA-EDS RFI, AIS created the Daily Ozone (DO) prototype.  DO helps citizens plan their daily activities in an environmentally friendly way by highlighting safe outdoor activities in response to the Air Quality Index (AQI). Our project goals included: 1) Determining user’s location and providing the current day’s AQI, 2) Providing a list of activities citizens can safely do based on their location, and 3) allowing users to store various locations without having to login or create an account.

###Approach

The DO prototype demonstrates AIS’s skills in Human Centric Design, DevOps, and Agile development. DO development work was done in the open (ex. project management in the Trello board, open github repos).  We performed marketplace analysis, personas, and heuristic evaluations, all of which drove application functionality. Following Agile principles, we completed one sprint, gathered feedback from users, and recorded findings as user stories for subsequent sprints.

###Design

The design included a clean and distinctive brand for the product, incorporating the pre-established color-coded system for AQI.  The application uses a simple layout, grouping information and presenting it to users in an easy-to-follow structure.  Typography was used to help establish a visual hierarchy throughout the layout.  The tooling, the techniques employed, and the benefits of the design include:

•	Front End (ES6 with WebPack, Angular/BootStrap/SASS/PostCSS)
o	Latest JavaScript language version and backwards compatibility
o	HTML5 APIs for responsiveness
o	SASS with Bootstrap provided prebuilt components
o	Local Storage API to cache results
•	Back End(NodeJS/Hapi Packaging NPM, gulp)
o	NodeJS with hapi.js for the web server and Joi providing the web service and validation framework
o	PostgreSQL wrapped in a Docker image 
o	A tailored service interface to the AirNow API allowed for consumption by the front end
•	Testing (Mocha, Jasmine, Karma, Should, Nock, Instanbul)
o	Service code and Joi validation was tested using mocha
o	Mocking performed through Nock guaranteeing repeatable testing
•	DevOps (Docker containers in Docker Hub, Tutum, Azure IaaS, Travis CI)
o	Travis CI hook triggered building the application into Docker containers
o	Automated testing was executed
o	Post push to Docker Hub, a web hook from Tutum is triggered providing a central deployment hub to the Microsoft Azure IaaS host

###Past Performances

AIS performs similar work with other federal agencies including:
•	FBI – Agile Custom Development (Laura Mabe, Laura.Mabe@ic.fbi.gov)
•	US Treasury – SharePoint Agile Development (James Graham, James.Graham@treasury.gov)
•	DoD Office of the Undersecretary of Defense for Policy – Enterprise IT Support (Christine Murphy, christine.r.murphy.civ@mail.mil)




