import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
chai.should();
describe('Tests on users', () => {
  it('Should signup if all the informations are collected', (done) => {
    const user = {
      firstName: 'Allfggfy',
      lastName: 'babayaga',
      email: 'el.ally741@gmail.com',
      password: '1234567',
      phoneNumber: '939393939393',
      userName: 'troptop!.',
    };
    chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .then(((res) => {
        res.body.status.should.be.equal(201);
        res.body.should.be.an('object');
        done();
      }))
      .catch((err) => done(err));
  });
  it('Should not signup when any field is missing', (done) => {
    const user = {
      lastName: 'babayaga',
      email: 'el.ally741@gmail.com',
      password: '1234567',
      phoneNumber: '939393939393',
      userName: 'troptop!.',
    };
    chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .then(((res) => {
        res.body.status.should.be.equal(400);
        done();
      }))
      .catch((err) => done(err));
  });
  it('Should not be able to signup when the email is already in the system', (done) => {
    const user = {
      firstName: 'Allfggfy',
      lastName: 'babayaga',
      email: 'el.ally741@gmail.com',
      password: '1234567',
      phoneNumber: '939393939393',
      userName: 'troptop!.',
    };
    chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .then(((res) => {
        res.body.status.should.be.equal(409);
        done();
      }))
      .catch((err) => done(err));
  });
  it('Should be able to signin with good email and password', (done) => {
    const user = {
      email: 'el.ally741@gmail.com',
      password: '1234567',
    };
    chai.request(app)
      .post('/api/v1/signin')
      .send(user)
      .then(((res) => {
        res.body.status.should.be.equal(200);
        done();
      }))
      .catch((err) => done(err));
  });
  it('Should not be able to signin with no email or password', (done) => {
    const user = {
      password: '1234567',
    };
    chai.request(app)
      .post('/api/v1/signin')
      .send(user)
      .then(((res) => {
        res.body.status.should.be.equal(400);
        done();
      }))
      .catch((err) => done(err));
  });
  it('Should not be able to signin wrong e-mail', (done) => {
    const user = {
      email: 'elally741@gmail.com',
      password: '1234567',
    };
    chai.request(app)
      .post('/api/v1/signin')
      .send(user)
      .then(((res) => {
        res.body.status.should.be.equal(404);
        done();
      }))
      .catch((err) => done(err));
  });
  it('Should not be able to signin with an incomplete password', (done) => {
    const user = {
      email: 'el.ally741@gmail.com',
      password: '123',
    };
    chai.request(app)
      .post('/api/v1/signin')
      .send(user)
      .then(((res) => {
        res.body.status.should.be.equal(400);
        done();
      }))
      .catch((err) => done(err));
  });
  it('Should not be able to signin with wrong password', (done) => {
    const user = {
      email: 'el.ally741@gmail.com',
      password: '123456789',
    };
    chai.request(app)
      .post('/api/v1/signin')
      .send(user)
      .then(((res) => {
        res.body.status.should.be.equal(400);
        done();
      }))
      .catch((err) => done(err));
  });
});
