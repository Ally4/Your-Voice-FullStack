const queries = [
  {
    report: 'INSERT INTO reports (email, createdby, title, type, latcoordonate, longcoordonate, images, videos, comment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    signupSigninSelect: 'SELECT * FROM users WHERE email = $1',
    insertSignup: 'INSERT INTO users (firstname, lastname, email, password, phonenumber, username) VALUES ($1, $2, $3, $4, $5, $6)',
    insertReport: 'INSERT INTO reports (email, createdby, title, type, latcoordonate, longcoordonate, images, videos, comment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    reportSelect: 'SELECT * FROM reports WHERE reportid = $1',
    getAllReports: 'SELECT * FROM reports',
    // updateComment: `UPDATE reports SET comment = '${updating}' WHERE reportid=${req.params.id} `,
    // upDateLat: `UPDATE reports SET latcoordonate = '${updateLat}' WHERE reportid=${req.params.id} `,
    // upDateLong: `UPDATE reports SET longcoordonate = '${updateLong}' WHERE reportid=${req.params.id} `,
    delete: 'DELETE FROM reports WHERE reportid = $1',
    // change: `UPDATE reports SET status = '${change}' WHERE reportid = ${req.params.reportId} `,
  },
];

export default queries;
