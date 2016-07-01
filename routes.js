var User = require('./controllers/user');
var Skill = require('./controllers/skill');
var Pr = require('./controllers/pr');
var Common = require ('./controllers/common')
/**
 * Contains the list of all routes, i.e. methods, paths and the config functions
 * that take care of the actions
 */
exports.endpoints = [
    { method: 'GET', path: '/', config: Common.welcomeMessage },
    //Auth methods
    { method: 'POST', path: '/register', config: User.register },
    { method: 'POST', path: '/login', config: User.login },
    //User methods
    { method: 'GET', path: '/user/profile', config: User.profile },
    { method: 'POST', path: '/user/update', config: User.update },
    
    //Skill methods
    { method: 'POST', path: '/skill', config: Skill.create },
    { method: 'GET', path: '/skill', config: Skill.getSkills }, //GET tutte le skill
    { method: 'GET', path: '/skill/{skillId}', config: Skill.getSkill }, //GET singola skill
        
    //UserSkill methods
    { method: 'POST', path: '/pr', config: Pr.create },
    { method: 'GET', path: '/pr/{user}', config: Pr.getAllSkillsForUser }
];