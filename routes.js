var User = require('./controllers/User');

/**
 * Contains the list of all routes, i.e. methods, paths and the config functions
 * that take care of the actions
 */
exports.endpoints = [
    // { method: 'GET', path: '/handle_twitter_callback', config: Authentication.callbackTwitter },
    { method: 'POST', path: '/user', config: User.create },
    { method: 'POST', path: '/login', config: User.login },
    { method: 'POST', path: '/forgotPassword', config: User.forgotPassword },
    { method: 'POST', path: '/verifyEmail', config: User.verifyEmail },
    // { method: 'POST', path: '/resendVerificationEmail', config: User.resendVerificationEmail },
    { method: 'GET', path: '/user/profile', config: User.profile }

];