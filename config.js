module.exports = {
	mongo: {
		username: '<dbusername>',
		password: '<dbpassword>',
		url: '<dbstring>.mongolab.com:<port>',
		database: 'authdb'
	},
	server: {
		hostname: 'localhost',
		port: 3000
	},
    twitter: {
        password: 'secret_cookie_encryption_password', //Use something more secure in production
        clientId: 'WrGzGm0XSKHj5J3k6YHhInoyn',
        clientSecret: 'Wl7S31Xu2nJ4D9VH3ANEnLWglk5Ljmg9BrX4VyIQIkTMgmClou',
        isSecure: false //Should be set to true (which is the default) in production
    }
};