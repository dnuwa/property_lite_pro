/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
const chai = require('chai');
const chaiHttp = require('chai-http');
require('../index');

const database = require('../models');
const base = require('./base');

// Base URL
const BASE_URL = 'http://localhost:5000/api/v1';
const LOGIN_URL = '/auth/signin';
const SIGNUP_URL = '/auth/signup';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe.only('SEARCH ', () => {
  before(() => {
    database.users.length = 0; // empty user collection
    database.adverts.length = 0;
    chai.request(BASE_URL)
      .post(SIGNUP_URL)
      .send(base.signup_user_1)
      .end();
  });
  describe('POST', () => {
    it('search for adverts', (done) => {
      chai.request(BASE_URL)
        .post(LOGIN_URL)
        .send(base.login_user_1)
        .end((err, res) => {
          chai.request(BASE_URL)
            .post('/property')
            .set('x-access-token', res.body.data.token)
            .send(base.advert_1)
            .end((er, resp) => {
              chai.request(BASE_URL)
                .get(`/property/type/${resp.body.data.propertyType}`)
                .end((error, response) => {
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
});
