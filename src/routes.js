const CoursesController = require('./controllers/CoursesControllers');
const AuthenticationController = require('./controllers/AuthenticationController');
const AuthorizationController = require('./controllers/AuthorizationController');

module.exports = (app) => {
    /******** COURSES *******/
    app.post('/api/register',
    AuthenticationController.register)

    app.post('/api/login',
    AuthenticationController.login)

    app.get('/api/logout',
    AuthenticationController.logout)

    /******** COURSES *******/
    app.get('/api/courses',
    AuthorizationController.validateLogin,
    CoursesController.index)

    app.post('/api/courses',
    AuthorizationController.validateLogin,
    CoursesController.post)

    app.put('/api/courses',
    AuthorizationController.validateLogin,
    CoursesController.put)

    app.delete('/api/courses',
    AuthorizationController.validateLogin,
    CoursesController.delete)
}