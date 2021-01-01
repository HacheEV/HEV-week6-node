function pagination(req, res, next){
    if(req.query.page){
        req.query.page = req.query.page ? Number(req.query.page) : 0;
        req.query.size = req.query.size ? Number(req.query.size) : 10;
    }
    
    next();

}

module.exports = pagination;