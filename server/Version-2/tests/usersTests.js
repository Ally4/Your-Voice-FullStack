import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import user from '../dummyData/data';

chai.use(chaiHttp);
const ally = () => chai.request(app);

describe('Tests for users', () => {
  it('User should not be able to signup with a missing field', (done) => {
    ally()
      .post('/api/v2/signup')
      .send(user[1])
      .end((error, res) => {
        expect(res).to.have.status([400]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('User should be able to sign up', (done) => {
    ally()
      .post('/api/v2/signup')
      .send(user[2])
      .end((error, res) => {
        expect(res).to.have.status([201]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(201);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('User should not be able to signup if email is already in the system', (done) => {
    ally()
      .post('/api/v2/signup')
      .send(user[2])
      .end((error, res) => {
        expect(res).to.have.status([409]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(409);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('User should not be able to signin with a missing password', (done) => {
    ally()
      .post('/api/v2/signin')
      .send(user[4])
      .end((error, res) => {
        expect(res).to.have.status([400]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('User should not be able to signin with a missing email and password', (done) => {
    ally()
      .post('/api/v2/signin')
      .send(user[5])
      .end((error, res) => {
        expect(res).to.have.status([400]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('User should not be able to signin with a uncomplete email', (done) => {
    ally()
      .post('/api/v2/signin')
      .send(user[6])
      .end((error, res) => {
        expect(res).to.have.status([400]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('User should not be able to signin with a uncomplete password', (done) => {
    ally()
      .post('/api/v2/signin')
      .send(user[7])
      .end((error, res) => {
        expect(res).to.have.status([400]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('User should not be able to signin with a wrong password', (done) => {
    ally()
      .post('/api/v2/signin')
      .send(user[8])
      .end((error, res) => {
        expect(res).to.have.status([401]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
  it('User should not be able to signin with a wrong email', (done) => {
    ally()
      .post('/api/v2/signin')
      .send(user[9])
      .end((error, res) => {
        expect(res).to.have.status([404]);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.be.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        done(error);
      });
  });
});
