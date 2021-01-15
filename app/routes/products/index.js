module.exports = function(application){
    application.get('/product',function(req,res){
        application.app.controllers.productsController.product(application,req,res);   
    }); 
    application.get('/products',function(req,res){
        application.app.controllers.productsController.products(application,req,res);   
    }); 
    application.post('/products/create',function(req,res){
        application.app.controllers.productsController.create(application,req,res);   
    }); 
    application.get('/products/consult',function(req,res){
        application.app.controllers.productsController.consult(application,req,res);
    }); 
    application.delete('/products/delete',function(req,res){
        application.app.controllers.productsController.delete(application,req,res);
    }); 
}