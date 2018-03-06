/* eslint-disable */
process.env.NODE_ENV = 'test';

const User = require('../../models/user');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const bcrypt = require('bcrypt');

// const router = express.Router();
const should = chai.should();

chai.use(chaiHttp);

describe('Authentication Service', () => {

  beforeEach((done) => {
    User.remove({}, (err) => {
      if (err) throw err
      done();
    });
  });

  describe('/POST authenticate', () => {
    it('It should return a token', (done) => {
      bcrypt.hash(process.env.PASSWORD, 10, (bcryptErr, hash) => {
        if (bcryptErr) throw bcryptErr;
        const user = new User({
          name: process.env.USERNAME,
          password: hash,
          admin: true,
        })
        user.save((err, user) => {
          chai.request(server)
            .post(`/api/authenticate?name=${process.env.USERNAME}&password=${process.env.PASSWORD}`)
            .end((err, res) => {
              res.statusCode.should.equal(200);
              res.body.should.have.property('success');
              res.body.success.should.be.eql(true);
              res.body.message.should.be.eql('Enjoy your token!')
              done();
            });
        });
      });
    });
  });
});
