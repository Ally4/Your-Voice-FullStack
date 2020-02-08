// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../../../app';

// chai.use(chaiHttp);

// const ally = () => chai.request(app);

// const tokenUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsLmFsbHk3NDFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1NzczNjUwNTZ9.pmeMwyyphmw5iC1CdHZVfFSTUwGAQhhat-f4NWhaz8E';
// const fakeTokenUser = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsLmFsbHk3NDFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1NzczNjUwNTZ9.pmeMwyyphmw5iC1CdHZVfFSTUwGAQhhat-f4NWhaz8E';
// const tokenAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTc3OTcxMTQ5fQ.LoUCnSwtPnIfvssVXOWRhES8X9RWsQakkbRj8JvPIfE';
// const fakeTokenAdmin = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU3NzM2NjA1NH0.krqe7eUhuFNO7UC-8RWdFXPKQfXoGrc7vRN8rOt0B8o';
// const change = 'Under investigation';
// describe('Tests for redflags(corruptions) and interventions', () => {
//   it('Admin should be able to change the status', (done) => {
//     ally()
//       .patch('/api/v2/redflags/:reportId')
//       .set('Authorization', tokenAdmin)
//       .send({status: change})
//       .end((error, res) => {
//         expect(res).to.have.status([200]);
//         expect(res.body).to.have.property('status');
//         expect(res.body.status).to.be.equal(200);
//         expect(res.body).to.have.property('message');
//         expect(res.body.message).to.be.a('string');
//         done(error);
//       });
//   });
// });
