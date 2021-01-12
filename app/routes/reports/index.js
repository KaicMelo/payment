module.exports = function(application){
    application.get('/reports',function(req,res){
        application.app.controllers.reportsController.index(application,req,res);  
    });
    application.get('/reports/day',function(req,res){
        application.app.controllers.reportsController.day(application,req,res);  
    });
    application.get('/reports/month',function(req,res){
        application.app.controllers.reportsController.month(application,req,res);  
    });
}