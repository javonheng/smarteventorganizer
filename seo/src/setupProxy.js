const proxy = require('http-proxy-middleware')
const url = `https://smarteventorganizer.herokuapp.com:${process.env.PORT}` || 'http://localhost:4000'

module.exports = function(app) {
    // add other server routes to path array
    app.use(proxy("/*", { target: "http://localhost:4000/" }));
};
