# Node Api - JWT Authentication

<!-- IG Visitors Wifi - pcg78gk4 -->

## Installation

```bash
# Set .env with the following variables or export variables:-
export SECRET=anystringtobeusedassecret
export DB=mongodb://localhost:27017/nodeapi
export TESTDB=mongodb://localhost:27017/nodeapitest
export USERNAME=username
export PASSWORD=password

npm install
npm start
```
## Tests
To run the tests run `npm run test` to run the integration tests.

## Blog API Documentation

### Basic Usage

This Node.js API is uses JWT's Authenticate access to protected API routes. You must have a user account with username and password to be able to be authenticated.

### Setup Admin User

```bash
GET - http://localhost:8888/api/setup
```
The environmental variables will be used to set the admin user.

### Protected Routes - Access Token

An API access token can created with `POST` request to:-
 ```bash
 http://localhost:8888/api/authenticate
 ```
|Headers|/api/authenticate|
| ------------- |:-------------:
| Content-Type | application/x-www-form-urlencoded |
| name | process.env.USERNAME      
| pasword | process.env.PASSWORD            

#### Query String
```bash
http://localhost:8888/api/authenticate?name=name&password=password
```
