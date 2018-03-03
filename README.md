# Node Api - JWT Authentication

<!-- IG Visitors Wifi - pcg78gk4 -->

## Installation

```bash
npm install
npm start

```
## Blog API Documentation

### Basic Usage

This Node.js API is uses JWT's Authenticate access to protected API routes. You must have a user account with username and password to be able to be authenticated.

### Register for an account

Not yet setup to be able to create new accounts. There is basic account setup with the following credentials that you can use:-

```javascript
var user = new User({
  name: 'username',
  password: 'password',
  admin: true
});

user.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully');
  res.json({ success: true })
});

```

### Getting Token

An API access token can created with `POST` request from `http://localhost:8888/api/authenticate` with HEADERS `Content-Type: application/x-www-form-urlencoded` supplying `Name` and `Password` or with Query String parameters:-

```
http://localhost:8888/api/authenticate?name=name&password=password
```
