import { ResponseErorr } from "../error/response-error.js"

const errorMiddleware = async(err, req, res, next)=>{
    if(!err){
        next()
        return
    }

    if(err instanceof ResponseErorr){
        res.status(err.status).json({
            errors : err.message
        })
    }else{
        res.status(500).json({
            errors : err.message
        })
    }
}

export{
    errorMiddleware
}