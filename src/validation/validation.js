import { ResponseErorr } from "../error/response-error.js"

export const validate = (schema, request) =>{
    const result = schema.validate(request,{
        abortEarly : false,
        allowUnknow :false
    })
    if(result.error){
        throw new ResponseErorr(400, result.error.message)
    }else{
        return result.value
    }
}
