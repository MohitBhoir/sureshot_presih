const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode? res.statuscode : 500

    if (statusCode >= 100 && statusCode < 600)
            res.status(statusCode);
    else
        res.status(500);

    res.json({
        msg:err.message
    })
}

module.exports=errorHandler