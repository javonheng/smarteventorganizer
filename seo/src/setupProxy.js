const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    // add other server routes to path array
    app.use(proxy(['/createeventapi', '/updatenewsapi', '/addmembersapi', '/addagendasapi', '/rentalstatusapi', '/attendeesapi', '/savedpresetapi', '/userslogin'], { target: 'http://127.0.0.1:4000', secure: false, changeOrigin: true }));
    app.use(proxy(['/upload', '/files', '/files/:filename', '/image/:filename', '/files/:id' ], { target: 'http://127.0.0.1:5005', secure: false, changeOrigin: true }));
}
