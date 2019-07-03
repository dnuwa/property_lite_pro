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

// Configure chai
chai.use(chaiHttp);
chai.should();
describe.only('Update', () => {
  before(() => {
    database.users.length = 0; // empty user collection
    chai.request(BASE_URL)
      .post(SIGNUP_URL)
      .send(base.signup_user_1)
      .end();
  });
  describe('PATCH', () => {
    it('should raise 200  when advert is updated', (done) => {
      chai.request(BASE_URL)
        .post(LOGIN_URL)
        .send(base.login_user_1)
        .end((err, res) => {
          chai.request(BASE_URL)
            .post('/property') // create property
            .set('x-access-token', res.body.data.token)
            .send(base.advert_1)
            .end((err, resp) => {
              chai.request(BASE_URL)
                .patch(`/property/${resp.body.data.id}`)
                .set('x-access-token', res.body.data.token)
                .send(base.updateAd)
                .end((err, response) => {
                  response.should.have.status(200);
                  response.body.should.be.a('object');
                  response.body.should.have.property('status');
                  response.body.should.have.property('data');
                  done();
                });
            });
        });
    });
  });

  it('should raise 400 when advert does not exist', (done) => {
    chai.request(BASE_URL)
      .post(LOGIN_URL)
      .send(base.login_user_1)
      .end((err, res) => {
        chai.request(BASE_URL)
          .post('/property') // create account
          .set('x-access-token', res.body.data.token)
          .send(base.advert_1)
          .end((err, resp) => {
            chai.request(BASE_URL)
              .patch('/property/1000')
              .set('x-access-token', res.body.data.token)
              .send(base.updateAd)
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

  describe('PATCH UPDATE TO SOLD', () => {
    it('should raise 200  when advert is updated SOLD', (done) => {
      chai.request(BASE_URL)
        .post(LOGIN_URL)
        .send(base.login_user_1)
        .end((err, res) => {
          chai.request(BASE_URL)
            .post('/property') // create property
            .set('x-access-token', res.body.data.token)
            .send(base.advert_1)
            .end((err, resp) => {
              chai.request(BASE_URL)
                .patch(`/property/${resp.body.data.id}/sold`)
                .set('x-access-token', res.body.data.token)
                .send({ newStatus: 'SOLD' })
                .end((err, response) => {
                  response.should.have.status(200);
                  response.body.should.be.a('object');
                  response.body.should.have.property('status');
                  response.body.should.have.property('data');
                  done();
                });
            });
        });
    });

    it('should raise 400 when advert does not exist', (done) => {
      chai.request(BASE_URL)
        .post(LOGIN_URL)
        .send(base.login_user_1)
        .end((err, res) => {
          chai.request(BASE_URL)
            .post('/property') // create account
            .set('x-access-token', res.body.data.token)
            .send(base.advert_1)
            .end((err, resp) => {
              chai.request(BASE_URL)
                .patch('/property/1000/sold')
                .set('x-access-token', res.body.data.token)
                .send(base.updateAd)
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
  });
});
