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

const get = async(req, res, next)=>{
    try {
        const username = req.user.username
        const contactId = req.params.contactId
        const result = await contactService.get(username, contactId)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
        
    }
}

const update = async (req, res ,next)=>{
    try {
        const username = req.user.username
        const contactId = req.params.contactId
        const request = req.body
        request.id = contactId
        const result = await contactService.update(username, request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async(req, res, next)=>{
    try {
        const username = req.user.username
        const contactId = req.params.contactId
        await contactService.remove(username, contactId)
        res.status(200).json({
            data : 'OK'
        })
    } catch (error) {
        next(error)
    }
}

const search = async(req, res, next)=>{
    try {
        const username = req.user
        const request = {
            page : req.query.page,
            size : req.query.size,
            name : req.query.name,
            email : req.query.email,
            phone : req.query.phone
        }
        const result = await contactService.search(username, request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

export default{
    create,
    get,
    update,
    remove,
    search
}