const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    // add other server routes to path array
    app.use(proxy(['/createeventapi' ], { target: 'http://localhost:4000' }));
    app.use(proxy(['/updatenewsapi' ], { target: 'http://localhost:4000' }));
    app.use(proxy(['/addmembersapi' ], { target: 'http://localhost:4000' }));
    app.use(proxy(['/addagendasapi' ], { target: 'http://localhost:4000' }));
    app.use(proxy(['/rentalstatusapi' ], { target: 'http://localhost:4000' }));
    app.use(proxy(['/attendeesapi' ], { target: 'http://localhost:4000' }));
    app.use(proxy(['/savedpresetapi' ], { target: 'http://localhost:4000' }));
    app.use(proxy(['/userslogin' ], { target: 'http://localhost:4000' }));
    app.use(proxy(['/upload', '/files', '/files/:filename', '/image/:filename', '/files/:id' ], { target: 'http://localhost:5005' }));
}
