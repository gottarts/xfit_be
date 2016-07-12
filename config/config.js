const Pack = require('../package');

module.exports = {
    server: {
        host: 'xfit-be.herokuapp.com',
        port: process.env.PORT || 3000
    },
    database: {
        username: 'gottarts',
        password: 'macbook',
        host: 'ds057204.mlab.com',
        db: 'xfit',
        port: 57204
    },
    key: {
        privateKey: 'otifermiotiformi',
        tokenExpiry: 1 * 30 * 1000 * 60 //1 hour
    },
    swaggerOptions: {
        info: {
            //basePath: '/v1',
            version: Pack.version,
            title: 'XFit',
            description: 'This web API was built to demonstrate some of the hapi features and functionality.'
        },
        basePath: '/v1/',
        tags: [{
            'name': 'Auth',
            'description': 'Metodi di autenticazione'

        }, {
                'name': 'User',
                'description': 'Metodi degli utenti'

            }]
    },
    goodOptions: {
        ops: {
            interval: 1000
        },
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*' }]
            }, {
                    module: 'good-console'
                }, 'stdout']
        }
    }
};
