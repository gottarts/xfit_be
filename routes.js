var User = require('./controllers/user');
var Skill = require('./controllers/skill');
var Pr = require('./controllers/pr');
var NewsCategory = require('./controllers/newsCategory');
var Common = require('./controllers/common');


exports.endpoints = [
    { method: 'GET', path: '/', config: Common.welcomeMessage, },
    { method: 'GET', path: '/resources/icons/{param*}', config: Common.getIcon },
    //Auth methods
    { method: 'POST', path: '/v1/register', config: User.register },
    { method: 'POST', path: '/v1/login', config: User.login },
    //User methods
    { method: 'GET', path: '/v1/user/profile', config: User.profile },
    { method: 'POST', path: '/v1/user/update', config: User.update },

    //Skill methods
    { method: 'POST', path: '/v1/skill', config: Skill.create },
    { method: 'POST', path: '/v1/skill/update', config: Skill.updateSkill },
    { method: 'GET', path: '/v1/skill', config: Skill.getSkills }, //GET tutte le skill
    { method: 'GET', path: '/v1/skill/{skillId}', config: Skill.getSkill }, //GET singola skill

    //Pr methods
    { method: 'POST', path: '/v1/pr', config: Pr.create },
    { method: 'GET', path: '/v1/pr', config: Pr.getAllSkillsForUser },
    { method: 'GET', path: '/v1/pr/details', config: Pr.getSkillForUser },

    //NewsCategory methods
    { method: 'POST', path: '/v1/newsCategory', config: NewsCategory.create },
    { method: 'GET', path: '/v1/newsCategory', config: NewsCategory.getAllNewsCategory },
    { method: 'GET', path: '/v1/newsCategory/{locale}', config: NewsCategory.getAllNewsCategoryForLocale }
];