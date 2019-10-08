import sendGrid from '@sendgrid/mail';
import sinon from 'sinon';

import { sendEmailConfirmation } from '../../src/utilities/ForwardEmails';

/* Test the email util function */
describe('Email helpers', () => {
  let sendGridStub;

  beforeEach(() => {
    sendGridStub = sinon.stub(sendGrid, 'send');
  });

  afterEach(() => {
    sendGridStub.restore();
  });

  it('Forward email to user', (done) => {
    sendEmailConfirmation('faketoken', 'John', 'johndoe@gmail.com');
    // sendGridStub.to.have.been.calledOnce();
    done();
  });
});
