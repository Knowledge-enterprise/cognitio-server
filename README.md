# Cognitio Server
Server side for the Cognitio blocker application - a knowledge hub for documenting blockers and their solutions.

## Documentation
Checkout [Slate]() for Cognitio API documentation.
Below are the steps required to successfully install and start the cognitio-server on a local system:

## Technologies Used
- [node & npm](https://nodejs.org/en/download/)
- [Express](https://expressjs.com/) 4.16.1 
- [MongoDB](https://docs.mongodb.com/v3.6/?_ga=2.163424252.1502849300.1509982645-2035839376.1509982645)


## Getting Started
_*Manual Installation*_(for mac)
* Clone the application:

      $ git clone https://github.com/Knowledge-enterprise/cognitio-server.git

- Install a current version of [Node](https://nodejs.org/en/download/)

  Run the following commands to Install/Upgrade Node and NPM Mac.
    - ```brew update```
    - ```brew install node```

- Run npm install to install dependencies
- Copy the .env.example file and rename it to .env
- Complete the .env file with the required settings values
- Run `npm run start` to start the server

###### User Authentication
Users are authenticated and validated using JWT web token. Generating tokens on signup and login ensures API endpoints are protected.


## Testing
- [Mocha](https://mochajs.org/)
  - Test files are located at `~/tests`
  - Run ```npm test``` to run tests

## CodeStyle
- To contribute, you MUST adhere to the style guide as provided by:
  - [Airbnb style guide](https://github.com/airbnb/javascript)
  - [ECMA Script 6](http://es6-features.org/#Constants)

## Contribute
### Prerequisites includes
-   [MongoDB](https://docs.mongodb.com/v3.6/?_ga=2.163424252.1502849300.1509982645-2035839376.1509982645) and
-   [Node.js](http://nodejs.org/) >= v6.8.0.

### Procedure
1.  Clone this repository from a terminal `git clone https://github.com/andela-fmustapha/document-management.git`.
2.  Move into the project directory `cd cognitio-server`
3.  Install project dependencies `npm install`
4.  Start mongo db `mongod` in another terminal
5.  Start the express server `npm run start:dev`.
6.  Run test `npm test`.
7.  Branch out of develop `git checkout -b [new-branch-name]`
8.  Make changes and commit your changes
9.  Git push and make a pull request to cognitio-server
