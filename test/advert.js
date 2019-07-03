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

describe.only('Create an advert ', () => {
  before(() => {
    database.users.length = 0; // empty user collection
    chai.request(BASE_URL)
      .post(SIGNUP_URL)
      .send(base.signup_user_1)
      .end();
  });
  describe('POST', () => {
    it('should create a new advert', (done) => {
      chai.request(BASE_URL)
        .post(LOGIN_URL)
        .send(base.login_user_1)
        .end((err, res) => {
          chai.request(BASE_URL)
            .post('/property')
            .set('x-access-token', res.body.data.token)
            .send(base.advert_1)
            .end((err, resp) => {
              resp.should.have.status(201);
              resp.body.should.be.a('object');
              resp.body.should.have.property('status');
              resp.body.should.have.property('data');
              done();
            });
        });
    });

    it('should return 401 for non admin/agent user', (done) => {
      chai.request(BASE_URL)
        .post(SIGNUP_URL)
        .send(base.signup_user_7)
        .end((err, res) => {
          chai.request(BASE_URL)
            .post('/property')
            .set('x-access-token', res.body.data.token)
            .send(base.advert_1)
            .end((err, resp) => {
              resp.should.have.status(401);
              resp.body.should.be.a('object');
              resp.body.should.have.property('status');
              resp.body.should.have.property('error');
              done();
            });
        });
    });

    it('should return 400 when agent posts empty fields', (done) => {
      chai.request(BASE_URL)
        .post(LOGIN_URL)
        .send(base.login_user_1)
        .end((err, res) => {
          chai.request(BASE_URL)
            .post('/property')
            .set('x-access-token', res.body.data.token)
            .end((err, resp) => {
              resp.should.have.status(400);
              resp.body.should.be.a('object');
              resp.body.should.have.property('status');
              resp.body.should.have.property('error');
              done();
            });
        });
    });

    it('should return all adverts in an array', (done) => {
      chai.request(BASE_URL)
        .get('/property')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          done();
        });
    });

    it('should return a single advert', (done) => {
      chai.request(BASE_URL)
        .get('/property/1')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('status');
          response.body.should.have.property('data');
          done();
        });
    });

    it('should raise an error if advert not found', (done) => {
      chai.request(BASE_URL)
        .get('/property/1000')
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('status');
          response.body.should.have.property('data');
          done();
        });
    });

    it('should raise a 401 when a token is not provided', (done) => {
      chai.request(BASE_URL)
        .post(LOGIN_URL)
        .send(base.login_user_1)
        .end((err, res) => {
          chai.request(BASE_URL)
            .post('/property')
            .send(base.advert_1)
            .end((err, resp) => {
              resp.should.have.status(401);
              resp.body.should.be.a('object');
              resp.body.should.have.property('status');
              resp.body.should.have.property('message');
              done();
            });
        });
    });

    it('should raise a 401 when a token is invalid', (done) => {
      chai.request(BASE_URL)
        .post(LOGIN_URL)
        .send(base.login_user_1)
        .end((err, res) => {
          chai.request(BASE_URL)
            .post('/property')
            .set('x-access-token', 'jdsvjlsdjnjnvldnvnsjfvnjnnjfnnsvln')
            .send(base.advert_1)
            .end((err, resp) => {
              resp.should.have.status(401);
              resp.body.should.be.a('object');
              resp.body.should.have.property('status');
              resp.body.should.have.property('message');
              done();
            });
        });
    });
  });
});
