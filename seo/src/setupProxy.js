const proxy = require('http-proxy-middleware')
const url = `https://smarteventorganizer.herokuapp.com:${process.env.PORT}` || 'http://localhost:4000'

module.exports = function(app) {
    // add other server routes to path array
    app.use(proxy(['/api/**'], { target: 'http://localhost:4000' }));
    /*app.use(proxy(['/createeventapi', '/createeventapi/add', '/createeventapi/:id', '/createeventapi/update/:id'], { target: url}));
    app.use(proxy(['/updatenewsapi', '/updatenewsapi/add', '/updatenewsapi/:id', '/updatenewsapi/update/:id'], { target: url}));
    app.use(proxy(['/addmembersapi'], { target: url}));
    app.use(proxy(['/addagendasapi', '/addagendasapi/add', '/addagendasapi/:id', '/addagendasapi/update/:id'], { target: url}));
    app.use(proxy(['/rentalstatusapi', '/rentalstatusapi/add', '/rentalstatusapi/:id', '/rentalstatusapi/update/:id'], { target: url}));
    app.use(proxy(['/attendeesapi', '/attendeesapi/add', '/attendeesapi/:id', '/attendeesapi/update/:id'], { target: url}));
    app.use(proxy(['/savedpresetapi', '/savedpresetapi/add', '/savedpresetapi/:id', '/savedpresetapi/update/:id'], { target: url}));
    app.use(proxy(['/userslogin', '/userslogin/:id', '/userslogin/login', '/userslogin/logincheck', '/userslogin/register'], { target: url}));
    app.use(proxy(['/allfiles/upload', '/allfiles/files', '/allfiles/files/:filename', '/allfiles/image/:filename', '/allfiles/files/:id' ], { target: url}));
    app.use(proxy(['/mediaitems/upload2', '/mediaitems/files2', '/mediaitems/files2/:filename', '/mediaitems/image2/:filename', '/mediaitems/files2/:id' ], { target: url}));
    app.use(proxy(['/send-email', '/send-campaigns'], { target: url}));*/
}
