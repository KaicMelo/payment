
function CashDAO(connection) 
{
    this._connection = connection;
}
CashDAO.prototype.create = function(data,callback){
    this._connection.query(
        'INSERT INTO pt_cash (pt_user_id, product, price) VALUES ?',
        [data.map(item => [item.pt_user_id, item.product, item.price])],
        callback
    );
}
module.exports = function(){     
    return CashDAO; 
}