import userService from "../service/user-service.js"

const register = async (req, res, next) =>{
    try {
        const user = req.body
        const result = await userService.register(user)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const login = async(req, res, next)=>{
    try {
        const user = req.body
        const result = await userService.login(user)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const get = async(req, res, next) =>{
    try {
        const username = req.user.username
        const result = await userService.get(username)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

export default{
    register,
    login,
    get
}
