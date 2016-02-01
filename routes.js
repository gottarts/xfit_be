//var Pages = require('./controllers/pages');
var Authentication = require('./controllers/authentication');

/**
 * Contains the list of all routes, i.e. methods, paths and the config functions
 * that take care of the actions
 */
exports.endpoints = [
    {
        method: 'GET',
        path: '/handle_twitter_callback',
        config: Authentication.callbackTwitter
    }
];

// server.route({method: 'GET', path: '/handle_facebook_callback', handler: function (req, res) {
//   console.log(req.query)
//   res(JSON.stringify(req.query, null, 2))
// }})