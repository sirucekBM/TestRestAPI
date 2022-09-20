const CoursesController = require('./controllers/CoursesControllers');

module.exports = (app) => {

    app.get('/api/courses',
    CoursesController.index)

    app.post('/api/courses',
    CoursesController.post)

    app.put('/api/courses',
    CoursesController.put)

    app.delete('/api/courses',
    CoursesController.delete)
}