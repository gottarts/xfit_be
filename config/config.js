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
    }
};
