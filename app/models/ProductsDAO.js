function ProductsDAO(connection) {
    this._connection = connection;
}
ProductsDAO.prototype.getProducts = function (result) {

    this._connection.query(
        "SELECT * FROM pt_products WHERE status = 1 order by name", result);
}
ProductsDAO.prototype.create = function(data,callback){
    
    this._connection.query(
        'INSERT INTO pt_products (name, price) VALUES ?',
        [data.map(item => [item.name, item.price])],
        callback
    );
}
ProductsDAO.prototype.delete = function(data,callback){
    
    this._connection.query(
        'UPDATE pt_products SET status = 0 WHERE id ='+data,callback
    );
}

module.exports = function () {
    return ProductsDAO;
}