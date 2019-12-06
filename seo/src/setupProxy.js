const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    // add other server routes to path array
    app.use(proxy(['/createeventapi', '/updatenewsapi', '/addmembersapi', '/addagendasapi', '/rentalstatusapi', '/attendeesapi', '/savedpresetapi', '/userslogin'], { target: 'http://localhost:4000' }));
    app.use(proxy(['/upload', '/files', '/files/:filename', '/image/:filename', '/files/:id' ], { target: 'http://localhost:5005' }));
}
