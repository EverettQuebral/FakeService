class BaseModule {
    constructor(){

    }

    get(req, res, next, responseObject){
        // debug(name)
        // res.status(200).send('BASE MODULE test message ')
        next()
    }

    post(req, res, next){
        // res.status(200).send('BASE MODULE test message')
        next()
    }

    put(req, res, next){
        // res.status(200).send('BASE MODULE test message')
        next()
    }

    delete(req, res, next){
        // res.status(200).send('BASE MODULE test message')
        next()
    }
}


module.exports = BaseModule