module.exports = function (application) {
    application.get('/cash', function (req, res) {
        application.app.controllers.cashController.cash(application, req, res);
    });
    application.post('/cash/create', function (req, res) {
        application.app.controllers.cashController.create(application, req, res);
    });
}