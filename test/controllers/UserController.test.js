import 'babel-polyfill';

import chai from 'chai';
import chaiHttp from 'chai-http';
import sendGrid from '@sendgrid/mail';
import sinon from 'sinon';

import Models from '../../src/models';
import app from '../../src/app';
import { confirmEmailToken } from '../../src/utilities/confirmEmailToken';

const { bill_user: Users } = Models;

chai.should();
chai.use(chaiHttp);

/* Test the /signup route */
describe('User signup Test', () => {
  let sendGridStub;

  beforeEach(() => {
    sendGridStub = sinon.stub(sendGrid, 'send');
  });

  afterEach(() => {
    sendGridStub.restore();
  });

  it('it signup user', (done) => {
    const user = {
      email: 'johndoe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '1234567',
      phone: '08012335467',
    };
    chai
      .request(app)
      .post('/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('it verifies user', (done) => {
    Users.findAll({
      attributes: ['id', 'email'],
    }).then((user) => {
      const token = confirmEmailToken({ userID: user[0].dataValues.id });
      chai
        .request(app)
        .get(`/verification/johndoe@gmail.com/?verify=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
