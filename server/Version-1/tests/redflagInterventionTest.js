import fs from 'fs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
chai.should();
describe('Tests on redflags(corruptions) and intervention', () => {
  const data = [
    {
      reportId: 1,
      id: 1,
      createdOn: 'Thursday, November 28, 2019 5:20 PM',
      createdBy: 'AllyBomayee',
      title: 'Ni danje',
      type: 'report',
      latCoordonate: '12345 lat',
      longCoordonate: '12345 long',
      status: 'Draft',
      images: 'server\\uploadedFile\\_smokey_joker___Bx3-taXAOFl___.jpguploadedWell',
      videos: 'server\\uploadedFile\\ayatul-kursi-y-lkrsy-sheikh-mishary-al-afasy-english-translations-and-arabic-text.mp4uploadedWell',
      comment: 'fgdfgdfgdf',
    },
    {
      reportId: 1,
      id: 1,
      createdOn: 'Thursday, November 28, 2019 5:20 PM',
      createdBy: 'AllyBomayee',
      title: 'Ni danje',
      type: 'report',
      latCoordonate: '12345 lat',
      longCoordonate: '12345 long',
      status: 'Draft',
      images: 'server\\uploadedFile\\_smokey_joker___Bx3-taXAOFl___.jpguploadedWell',
      videos: 'server\\uploadedFile\\ayatul-kursi-y-lkrsy-sheikh-mishary-al-afasy-english-translations-and-arabic-text.mp4uploadedWell',
      comment: 'fgdfgdfgdf',
    },
  ];

  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsLmFsbHk3NDFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1NzUxNzY4ODB9.F7KtM0eV2k7XXnSdaPEMCvhqDLepfrAkq7FpwJSjNKk';

  const fakeUserToken = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVsLmFsbHk3NDFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1NzUxNzY4ODB9.F7KtM0eV2k7XXnSdaPEMCvhqDLepfrAkq7FpwJSjNKk';


  it('Should not be able to get all created report which are in the system', (done) => {
    chai.request(app)
      .get('/api/v1/redflags')
      .set('authorization', userToken)
      .then((res) => {
        res.body.status.should.be.equal(404);
        done();
      })
      .catch(err => done(err));
  });
  it('Should be able to create a report with a good password token', (done) => {
    chai.request(app)
      .post('/api/v1/redflags')
      .set('authorization', userToken)
      .field('createdBy', 'AllyBomayee')
      .field('title', 'Ni danje')
      .field('type', 'report')
      .field('latCoordonate', '12345 lat')
      .field('longCoordonate', '12345 long')
      .field('comment', 'fgdfgdfgdf')
      .attach('theImage', fs.readFileSync(__dirname + '/toUpload/_smokey_joker___Bx3-taXAOFl___.jpg'), '_smokey_joker___Bx3-taXAOFl___.jpg')
      .attach('theVideo', fs.readFileSync(__dirname + '/toUpload/ayatul-kursi-y-lkrsy-sheikh-mishary-al-afasy-english-translations-and-arabic-text.mp4'), 'ayatul-kursi-y-lkrsy-sheikh-mishary-al-afasy-english-translations-and-arabic-text.mp4')
      .then((res) => {
        res.body.status.should.be.equal(201);
        done();
      })
      .catch(err => done(err));
  });


  it('Should not be able to create a report with a wrong token', (done) => {
    chai.request(app)
      .post('/api/v1/redflags')
      .set('authorization', fakeUserToken)
      .then((res) => {
        res.body.status.should.be.equal(401);
        done();
      })
      .catch(err => done(err));
  });
  it('Should not be able to create a report if there is a missing field', (done) => {
    const report = {
      createdBy: 'Allybomayee',
      type: 'redflag',
      latCoordonate: '12345',
      longCoordonate: '12345',
      images: '307eb619f4dca044aed5d627e9f16db4',
      videos: 'ayatul-kursi-y-lkrsy-sheikh-mishary-al-afasy-english-translations-and-arabic-text',
      comment: 'kckjhfdkjhfdkjhdfjhkdfjhdfkjdfkjfdjkdfkjffkjfd',
    };
    chai.request(app)
      .post('/api/v1/redflags')
      .set('authorization', userToken)
      .then((res) => {
        res.body.status.should.be.equal(400);
        done();
      })
      .catch(err => done(err));
  });
  it('Should not be able to get all created reports with a wrong token', (done) => {
    chai.request(app)
      .get('/api/v1/redflags')
      .set('authorization', fakeUserToken)
      .then((res) => {
        res.body.status.should.be.equal(401);
        done();
      })
      .catch(err => done(err));
  });

  it('Should not be able to get created report by id with a wrong token', (done) => {
    chai.request(app)
      .get('/api/v1/redflags/1')
      .set('authorization', fakeUserToken)
      .then((res) => {
        res.body.status.should.be.equal(401);
        done();
      })
      .catch(err => done(err));
  });
  it('Should not be able to get created report which is not in the system', (done) => {
    chai.request(app)
      .get('/api/v1/redflags/100')
      .set('authorization', userToken)
      .then((res) => {
        res.body.status.should.be.equal(404);
        done();
      })
      .catch(err => done(err));
  });


  it('Should be able to get all created report which are in the system', (done) => {
    chai.request(app)
      .get('/api/v1/redflags')
      .set('authorization', userToken)
      .then((res) => {
        res.body.status.should.be.equal(200);
        done();
      })
      .catch(err => done(err));
  });


  it('Should not be able to change the location if the token is wrong', (done) => {
    chai.request(app)
      .patch('/api/v1/redflags/1/location')
      .set('authorization', fakeUserToken)
      .then((res) => {
        res.body.status.should.be.equal(401);
        done();
      })
      .catch(err => done(err));
  });
  it('Should not be able to change the location if there is a missing field', (done) => {
    const location = {
      lat: 'lat 12345',
    };
    chai.request(app)
      .patch('/api/v1/redflags/1/location')
      .set('authorization', userToken)
      .then((res) => {
        res.body.status.should.be.equal(400);
        done();
      })
      .catch(err => done(err));
  });

  it('Should not be able to change the comment if the token is wrong', (done) => {
    chai.request(app)
      .patch('/api/v1/redflags/1/comment')
      .set('authorization', fakeUserToken)
      .then((res) => {
        res.body.status.should.be.equal(401);
        done();
      })
      .catch(err => done(err));
  });
  it('Should not be able to change the comment if writting the comment', (done) => {
    const comment = {
    };
    chai.request(app)
      .patch('/api/v1/redflags/1/comment')
      .set('authorization', userToken)
      .then((res) => {
        res.body.status.should.be.equal(400);
        done();
      })
      .catch(err => done(err));
  });
  it('Should not be able to delete the created report if the token is wrong', (done) => {
    chai.request(app)
      .delete('/api/v1/redflags/1')
      .set('authorization', fakeUserToken)
      .then((res) => {
        res.body.status.should.be.equal(401);
        done();
      })
      .catch(err => done(err));
  });
});
