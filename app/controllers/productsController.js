module.exports.product = function (application, req, res) {
    if (req.session.authorized == true) {
        res.render('product/index');
        return;
    }
    res.render('login/index');
    return;
}
module.exports.consult = function (application, req, res) {

    if (req.session.authorized == true) {
        res.render('product/consult');
        return;
    }
    res.render('login/index');
    return;
}
module.exports.products = function (application, req, res) {
    var connection = application.config.dbConnection();
    var productsModel = new application.app.models.ProductsDAO(connection);

    productsModel.getProducts(function (error, result) {
        if (result.length > 0) {
            res.status(200).json({ data: result });
            return;
        }
        res.status(404).send('Error');
        return;
    });
}
module.exports.createProduct = function (application, req, res) {
    var dadosForm = req.body;

    var data = [];

    for (var i = 0; i <= dadosForm.data.length/2; i += 2) {
        data.push({
            "name": dadosForm.data[i].value,
            "price": dadosForm.data[i + 1].value
        });
    }

    var connection = application.config.dbConnection();
    var productsModel = new application.app.models.ProductsDAO(connection);

    productsModel.create(data, function (error, resultUser) {
        if (resultUser.length == 0) {
            res.status(404).json({ message: 'Erro ao cadastrar produto' });
        } else {
            res.status(200).json({ message: 'produto cadastrado com sucesso' });
        }
    });
}
module.exports.delete = function (application, req, res) {
    var dadosForm = req.body;

    var connection = application.config.dbConnection();
    var productsModel = new application.app.models.ProductsDAO(connection);

    productsModel.delete(dadosForm.id, function (error, resultUser) {
        if (resultUser.length == 0) {
            res.status(404).json({ message: 'Erro ao deletar' });
        } else {
            res.status(200).json({ message: 'Produto deletado com sucesso' });
        }
    }); 
}