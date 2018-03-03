# Node Api - JWT Authentication

<!-- IG Visitors Wifi - pcg78gk4 -->

## Installation

```bash
npm install
npm start

# Request to http://localhost:8888/api/ should return test Welcome to API
```
## Blog API Documentation

### Basic Usage

This Node.js API is uses JWT's Authenticate access to protected API routes. You must have a user account with username and password to be able to be authenticated.

### Register for an account

Not yet setup to be able to create new accounts

### Getting Token

An API access token can created with `POST` request from `http://localhost:8888/api/authenticate` with HEADERS `Content-Type: application/x-www-form-urlencoded` supplying `Name` and `Password` or with Query String parameters:-

```
http://localhost:8888/api/authenticate?name=name&password=password
```
