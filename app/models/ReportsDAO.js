
function ReportsDAO(connection) 
{
    this._connection = connection;
}
ReportsDAO.prototype.day = function(start,end,callback){
    this._connection.query(
        "SELECT pc.id,pu.name as pt_user_id,product,pc.price,pp.name as product  FROM pt_cash as pc LEFT JOIN pt_users as pu ON pu.id = pc.pt_user_id LEFT JOIN pt_products as pp ON pp.id = pc.product WHERE pc.created_at BETWEEN '"+start+" 00:00:00' and '"+end+" 23:59:59';", callback
    );
}
module.exports = function(){     
    return ReportsDAO; 
}