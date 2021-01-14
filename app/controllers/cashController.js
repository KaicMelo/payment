module.exports.cash = function(application,req,res)
{
    res.render('cash/index');
    return;
    if(req.session.authorized == true)
    {
        res.render('cash/index');
        return;
    }
    res.render('login/index');
    return;
}
module.exports.create = function(application,req,res)
{
    var dadosForm = req.body;

    var data = [];

    for(var i=0;i<=dadosForm.quantity;i+=2)
    {
        data.push({
            "pt_user_id":1,
            // "pt_user_id":req.session.aut_id,
            "product":dadosForm.data[i].value,
            "price":dadosForm.data[i+1].value,
        });
    } 

    var connection = application.config.dbConnection();
    var cashModel = new application.app.models.CashDAO(connection);
    
    cashModel.create(data,function(error,resultUser){
        if(resultUser.length  == 0)
        { 
            res.status(404).json({message: 'Erro ao realizar login'});  
        }else{
            res.status(200).json({message: 'Login realizado com sucesso'});
        }
    });
}