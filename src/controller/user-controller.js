import userService from "../service/user-service.js"

const register = async (req, res, next) =>{
    try {
        const user = req.body
        const result = await userService.register(user)
        res.status({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

export default{
    register
}
