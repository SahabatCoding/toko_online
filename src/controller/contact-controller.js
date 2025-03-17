import contactService from '../service/contact-service.js'

const create = async (req, res, next)=>{
    try {
        const username = req.user.username
        const contact = req.body
        const result = await contactService.create(username, contact)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

export default{
    create
}