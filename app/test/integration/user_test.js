/* eslint-disable */
process.env.NODE_ENV = 'test';

const User = require('../../models/user');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const bcrypt = require('bcrypt');

const should = chai.should();

chai.use(chaiHttp);

describe('User Service', () => {

  beforeEach((done) => {
    User.remove({}, (err) => {
      if (err) throw err
      done();
    });
  });

  describe('/POST setup an admin user', () => {
    it('It should setup admin user', (done) => {
      chai.request(server)
        .post('/api/users/setup')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('success');
          res.body.success.should.be.eql(true);
          done();
        });
    });
  });

  describe('/DELETE all the users', () => {
    it('It should delete all the users', (done) => {
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
              chai.request(server)
                .delete('/api/users/clear')
                .set('x-access-token', res.body.token)
                .end((err, res) => {
                  res.status.should.equal(200);
                  res.body.should.have.property('success');
                  res.body.success.should.be.eql(true);
                  User.find({}, (err, users) => {
                    if (err) throw err
                    users.should.be.a('array');
                    users.length.should.eql(0);
                    done();
                  });
                });
            });
        });
      });
    });
  });

  describe('/GET all the users', () => {
    it('It should delete all the users', (done) => {
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
              chai.request(server)
                .get('/api/users')
                .set('x-access-token', res.body.token)
                .end((err, res) => {
                  res.status.should.equal(200);
                  res.body[0].should.have.property('_id');
                  res.body[0].should.have.property('name');
                  res.body[0].should.have.property('password');
                  res.body[0].should.have.property('admin');
                  res.body[0].name.should.equal(user.name);
                  res.body[0].admin.should.equal(user.admin);
                  res.body[0].password.should.equal(user.password);
                  done();
                });
            });
        });
      });
    });
  });
});
