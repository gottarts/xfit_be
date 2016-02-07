var User = require('./controllers/User');
var Skill = require('./controllers/skill');
var UserSkill = require('./controllers/userSkill');
/**
 * Contains the list of all routes, i.e. methods, paths and the config functions
 * that take care of the actions
 */
exports.endpoints = [
    //Auth methods
    { method: 'POST', path: '/user', config: User.create },
    { method: 'POST', path: '/login', config: User.login },
    //User methods
    { method: 'GET', path: '/user/profile', config: User.profile },
    
    //Skill methods
    { method: 'POST', path: '/skill', config: Skill.create },
    { method: 'GET', path: '/skill', config: Skill.getSkills },
    //TO-DO get singola skill
    //TO-DO delete singola skill
    //TO-DO update singola skill
    
    //UserSkill methods
    {method: 'POST', path: '/userSkill', config: UserSkill.create }
];