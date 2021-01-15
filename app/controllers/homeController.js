module.exports.home = function(application,req,res)
{
    if(req.session.authorized == true)
    {
        res.render('home/index');
        return;
    }
    res.render('login/index');
    return;
}
 