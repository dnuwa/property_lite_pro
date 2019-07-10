/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
const chai = require('chai');
const chaiHttp = require('chai-http');
require('../index');
// import out user collection(database)
const database = require('../models');
const base = require('./base');

// Base URL
const BASE_URL = 'http://localhost:5000/api/v1';
const LOGIN_URL = '/auth/signin';
const SIGNUP_URL = '/auth/signup';
const image = './helpers/test_image.png';

// Configure chai
chai.use(chaiHttp);
chai.should();
describe.only('Delete', () => {
  before(() => {
    database.users.length = 0; // empty user collection
    chai.request(BASE_URL)
      .post(SIGNUP_URL)
      .send(base.signup_user_1)
      .end();
  });
  describe('POST', () => {
    it('should raise 202  when advert is deleted', (done) => {
      chai.request(BASE_URL)
        .post(LOGIN_URL)
        .field(base.login_user_1)
        .attach('photo', image)
        .end((err, res) => {
          if (err) done();
          chai.request(BASE_URL)
            .post('/property') // create property
            .set('x-access-token', res.body.data.token)
            .send(base.advert_1)
            .end((error, resp) => {
              if (error) done();
              chai.request(BASE_URL)
                .delete(`/property/${resp.body.data.id}`)
                .set('x-access-token', res.body.data.token)
                .end((err, response) => {
                  response.should.have.status(202);
                  response.body.should.be.a('object');
                  response.body.should.have.property('status');
                  response.body.should.have.property('data');
                  done();
                });
            });
        });
    });
  });

  // *****
  it('should raise 400 when advert does not exist', (done) => {
    chai.request(BASE_URL)
      .post(LOGIN_URL)
      .send(base.login_user_1)
      .end((err, res) => {
        chai.request(BASE_URL)
          .post('/property') // create account
          .set('x-access-token', res.body.data.token)
          .send(base.advert_1)
          .end((error, resp) => {
            if (error) done();
            chai.request(BASE_URL)
              .delete('/property/1000')
              .set('x-access-token', res.body.data.token)
              .end((err, response) => {
                response.should.have.status(400);
                response.body.should.be.a('object');
                response.body.should.have.property('status');
                response.body.should.have.property('error');
                done();
              });
          });
      });
  });

  it('should raise 401  when unauthorised', (done) => {
    chai.request(BASE_URL)
      .post(LOGIN_URL)
      .send(base.login_user_1)
      .end((err, res) => {
        chai.request(BASE_URL)
          .post('/property') // create property
          .set('x-access-token', res.body.data.token)
          .send(base.advert_1)
          .end((error, resp) => {
            if (error) done();
            chai.request(BASE_URL)
              .post(SIGNUP_URL)
              .send(base.signup_user_7)
              .end((err, respo) => {
                chai.request(BASE_URL)
                  .delete(`/property/${res.body.data.id}`)
                  .set('x-access-token', respo.body.data.token)
                  .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status');
                    response.body.should.have.property('error');
                    done();
                  });
              });
          });
      });
  });
});
