import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);

const ally = () => chai.request(app);

const tokenUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsLmFsbHk3NDFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1NzczNjUwNTZ9.pmeMwyyphmw5iC1CdHZVfFSTUwGAQhhat-f4NWhaz8E';
const fakeTokenUser = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsLmFsbHk3NDFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1NzczNjUwNTZ9.pmeMwyyphmw5iC1CdHZVfFSTUwGAQhhat-f4NWhaz8E';
const otherToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsLmFsbHk3NDFhYmNkZUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTU3Nzk3MDM1MX0.6fyXE_wfkB8mkfDwynwOMEfkzHyC4mRFsIYd9qEu2LU';

describe('Tests for redflags(corruptions) and interventions', () => {
  it('User should not be able to delete if he/she is not the owner', (done) => {
    ally()
      .delete('/api/v2/redflags/1')
      .set('Authorization', otherToken)
      .end((error, res) => {
        console.log(`The status ${res.body.status} and the message ${res} `);
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('User should be able to delete', (done) => {
    ally()
      .delete('/api/v2/redflags/2')
      .set('Authorization', tokenUser)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('User should not be able to get the report if not in the system', (done) => {
    ally()
      .get('/api/v2/redflags/100')
      .set('Authorization', tokenUser)
      .end((error, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('User should not be able to get the reports if not in the system', (done) => {
    ally()
      .get('/api/v2/redflags')
      .set('Authorization', tokenUser)
      .end((error, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('User should not be able to get any report if the token has a report', (done) => {
    ally()
      .get('/api/v2/redflags')
      .set('Authorization', fakeTokenUser)
      .end((error, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
});
