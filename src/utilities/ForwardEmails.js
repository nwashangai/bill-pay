import sendGrid from '@sendgrid/mail';
import handlebars from 'handlebars';
import * as path from 'path';
import fs from 'fs';

require('dotenv').config();

const readHTMLFile = (dirPath, callback) => {
  fs.readFile(dirPath, { encoding: 'utf-8' }, (err, html) => {
    if (err) {
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

const send = (template, reciever) => {
  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: reciever,
    from: process.env.SENDER_FROM,
    subject: 'Registration Confirmation',
    html: template,
  };
  sendGrid.send(msg);
};

export const sendEmailConfirmation = (token, name, recieverEmail) => {
  readHTMLFile(path.join(__dirname, '/../../templates/emailConfirmation.html'), (err, html) => {
    if (err) {
      throw err;
    }
    try {
      const template = handlebars.compile(html);
      const replacements = {
        username: name,
        baseUrl: process.env.BASE_URL,
        verifyLink: `${process.env.BASE_URL}/verification/${recieverEmail}/?verify=${token}`,
        unsubscribe: '#',
      };

      send(template(replacements), recieverEmail);
    } catch (error) {
      throw error;
    }
  });
};

export default sendEmailConfirmation;
